import EventEmitter from './EventEmitter'
import { receiveData } from './receiveData'

interface DataResponse {
  success?: boolean
  granted?: boolean | number
  data?: any
  message?: any
  code?: string | number
}

function sendLargeData(command: string, data: string) {
  const chunkSize = 64000 // 64KB
  const totalChunks = Math.ceil(data.length / chunkSize)

  for (let i = 0; i < totalChunks; i++) {
    const chunk = data.slice(i * chunkSize, (i + 1) * chunkSize)
    const message = {
      type: 'large',
      chunk,
      index: i,
      totalChunks,
      command
    }
    window.parent.postMessage(message, '*') // Replace '*' with appropriate target origin
  }
}

function sendNormalData(data: any) {
  const message = {
    type: 'normal',
    data
  }
  window.parent.postMessage(message, '*') // Replace '*' with appropriate target origin
}

async function sendMessageToNative(
  message: { command: string },
  isFrame: boolean
): Promise<{ data: any }> {
  try {
    if (pendingCommands.has(message.command.toString())) {
      console.warn(`Command "${message.command}" is already pending.`)
      return {
        data: `Command "${message.command}" is already pending.`
      }
    }
    pendingCommands.add(message.command.toString())

    return new Promise((resolve) => {
      if (isFrame) {
        const msg = JSON.stringify(message)
        if (msg.length > 64000) {
          sendLargeData(message.command, msg)
        } else {
          sendNormalData(msg)
        }
      } else if (
        window.webkit &&
        window.webkit.messageHandlers &&
        window.webkit.messageHandlers.callbackHandler &&
        typeof window.webkit.messageHandlers.callbackHandler.postMessage ===
          'function'
      ) {
        window.webkit.messageHandlers.callbackHandler.postMessage(
          JSON.stringify(message)
        )
      } else {
        throw new Error('window.webkit not found')
      }

      // Store the resolve function for later use
      receiveData[message.command] = { resolve }
    })
  } catch (error) {
    throw error // Propagate the error
  } finally {
    // Remove the command from pendingCommands after processing
    pendingCommands.delete(message.command.toString())
  }
}

const pendingCommands = new Set<string>()

class SystemCore extends EventEmitter {
  _isReady: boolean
  _hasNotch: boolean
  _isFrame: boolean

  constructor() {
    super()
    this._isFrame = window !== window.parent
    this._isReady =
      window.webkit &&
      window.webkit.messageHandlers &&
      window.webkit.messageHandlers.callbackHandler
        ? true
        : !!window.opener

    if (this._isFrame) {
      this._isReady = true // You may want to update this based on other logic
    }

    this._hasNotch = false
    this._subscribe()
  }

  get isReady() {
    return this._isReady
  }

  get statusNotch() {
    return this._hasNotch
  }

  setStatusNotch(status = false) {
    this._hasNotch = status
  }

  async send(payload: {
    command: string
    value?: any
    appId?: any
  }): Promise<DataResponse> {
    if (process.env.platform === 'web')
      return {
        data: {}, // Ensure `data` is always defined
        success: false, // Determine success
        message: 'Platform not support'
      }

    if (!this.isReady) {
      throw new Error('System is not ready')
    }

    if ((window.webkit && window.webkit.messageHandlers) || this._isFrame) {
      receiveData[payload.command] = -1
      if (window?.appId) {
        payload.appId = window.appId
      }

      const res: DataResponse = (await sendMessageToNative(
        payload,
        this._isFrame
      )) || { data: { success: true }, success: true } // Fallback
      return {
        data: res.data || null, // Ensure `data` is always defined
        success: res.success === true, // Determine success
        message: res.message || '', // Ensure `message` is always defined
        code: res.code || '' // Ensure `code` is always defined
      }
    }

    return (
      (await this._postMessageToWindow(payload)) || { data: {}, success: false }
    )
  }

  async exit() {
    // Implement your exit logic here
  }

  _postMessageToWindow(
    message: keyof typeof receiveData | {}
  ): Promise<{ data: any; success: boolean }> {
    return new Promise((resolve, reject) => {
      try {
        const handleReceivedResponse = (res: any) => {
          resolve(res)
          this.removeEventListener(handleReceivedResponse)
        }

        this.on(handleReceivedResponse.bind(this))
        window.opener?.postMessage(message, '*')
      } catch (error) {
        reject(error)
      }
    })
  }

  _subscribe() {
    window.addEventListener('flutterInAppWebViewPlatformReady', () => {
      this._isReady = true
      this.emit('ready')
    })

    window
      .require?.('electron')
      ?.ipcRenderer.on('message', (_event: any, ...args: any[]) => {
        if (args[0]) {
          window.postMessage(args[0], '*')
        } else {
          window.postMessage(args, '*')
        }
      })

    window.addEventListener('message', (ev) => {
      try {
        const { data } = ev
        console.log('receiveData --> ', typeof data, data)
        if (typeof data === 'string') {
          if (data.startsWith('backWorker|')) {
            return
          }
          return this._handleJsonStringMessage(data, true)
        }
        if (data.cmd) {
          this.emit('listen-cmd', data)
          return
        }
        if (!data.isSocket) {
          if (data.command) {
            const messageSending = receiveData[data.command]
            if (
              messageSending &&
              typeof messageSending.resolve === 'function'
            ) {
              messageSending.resolve(data.data)
              pendingCommands.delete(data.command)
            }
            return
          }
        }
        this.emit(data.command, data.data)
      } catch (error) {
        throw error
      }
    })
  }

  _handleJsonStringMessage(stringData: any, isListen?: any) {
    if (!stringData) {
      return
    }
    try {
      let res = stringData
      if (
        typeof res === 'string' &&
        (res.indexOf('{') > -1 || res.indexOf('[') > -1)
      ) {
        res = JSON.parse(stringData)
      }

      const command = res.command
      const response = res.data
      if (!command && !response) return

      if (response.success !== true) {
        if (isListen) {
          this.emit(command, res)
        }
        throw new Error(response.message)
      }
      if (isListen) {
        this.emit(command, res)
      }
      receiveData[command].resolve(res)
      pendingCommands.delete(command)
      return res.data
    } catch (err) {
      console.error('Error handling JSON string message: ', err)
      throw err
    }
  }
}

const core = new SystemCore()
export { core as SystemCore }
