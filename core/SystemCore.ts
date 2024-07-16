import EventEmitter from './EventEmitter'
import { SystemNotReadyError } from './errors'
import { receiveData } from './receiveData'

const exceptionNoTimeout: Array<keyof typeof receiveData> = [
  'scanQR',
  'exitApp'
]

class SystemCore extends EventEmitter {
  private _isReady: boolean = false
  private _hasNotch: boolean = false

  constructor() {
    super()
    this._isReady = this.checkSystemReady()
    this._subscribe()
  }

  get isReady(): boolean {
    return this._isReady
  }

  get hasNotch(): boolean {
    return this._hasNotch
  }

  set hasNotch(status: boolean) {
    this._hasNotch = status
  }

  async send(payload: {
    command: keyof typeof receiveData | string
    value?: any
    appId?: any
  }): Promise<any> {
    try {
      if (process.env.PLATFORM === 'web') {
        throw new Error('Web platform is not supported')
      }

      if (!this.isReady) {
        throw new SystemNotReadyError()
      }

      if (window.webkit && window.webkit.messageHandlers) {
        receiveData[payload.command] = -1

        if (window.appId) {
          payload.appId = window.appId
        }

        const res = await this.sendMessageToNative(payload)

        if (res == null) {
          return { success: false, data: null }
        }

        if (typeof res === 'string') {
          return this.handleJsonStringMessage(res)
        }

        const command = res.command
        const response = res.data

        if (typeof response === 'undefined') {
          throw new Error(
            `Command did not return expected data - ${JSON.stringify(res)}`
          )
        }

        if (response.success !== true && command !== 'getDeviceInfo') {
          throw response
        }

        return res.data
      }

      return await this.postMessageToWindow(payload)
    } catch (error) {
      console.error('Error in send method:', error)
      throw error
    }
  }

  async exit(): Promise<void> {
    // Implement exit functionality if needed
  }

  private checkSystemReady(): boolean {
    return (
      (window.webkit &&
        window.webkit.messageHandlers &&
        typeof window.webkit.messageHandlers.callbackHandler?.postMessage ===
          'function') ||
      !!window.opener
    )
  }

  private async sendMessageToNative(message: any): Promise<any> {
    try {
      if (typeof receiveData[message.command] !== 'undefined') {
        receiveData[message.command] = 0
      }

      this.postMessageToCallbackHandler(JSON.stringify(message))
      await this.waitUntil(message.command)

      return receiveData[message.command]
    } catch (error) {
      console.error('Error sending message to native:', error)
      throw error
    }
  }

  private postMessageToCallbackHandler(message: string): void {
    if (
      window.webkit &&
      window.webkit.messageHandlers &&
      window.webkit.messageHandlers.callbackHandler &&
      typeof window.webkit.messageHandlers.callbackHandler.postMessage ===
        'function'
    ) {
      window.webkit.messageHandlers.callbackHandler.postMessage(message)
    } else {
      console.warn(
        'window.webkit.messageHandlers.callbackHandler.postMessage is not available'
      )
    }
  }

  private async waitUntil(command: keyof typeof receiveData): Promise<void> {
    let timeout = 0

    if (exceptionNoTimeout.includes(command)) {
      return await new Promise<void>((resolve) => {
        const interval = setInterval(() => {
          if (typeof receiveData[command] !== 'number') {
            resolve()
            clearInterval(interval)
          }
        }, 200)
      })
    }

    return await new Promise<void>((resolve, reject) => {
      const interval = setInterval(() => {
        if (typeof receiveData[command] !== 'number') {
          timeout = 0
          resolve()
          clearInterval(interval)
        }

        if (timeout === 15000 && command !== 'connect-wallet') {
          clearInterval(interval)
          timeout = 0
          reject(new Error('Timeout: no response received'))
        }

        timeout += 200
      }, 200)
    })
  }

  private async postMessageToWindow(
    message: keyof typeof receiveData | {}
  ): Promise<{ data: any; success: boolean }> {
    return await new Promise<{ data: any; success: boolean }>(
      (resolve, reject) => {
        try {
          const handleReceivedResponse = (res: any) => {
            resolve(res)
            this.removeEventListener('receivedResponse', handleReceivedResponse)
          }

          this.on('receivedResponse', handleReceivedResponse)
          window.opener?.postMessage(message, '*')
        } catch (error) {
          console.error('Error posting message to window:', error)
          reject(error)
        }
      }
    )
  }

  private handleJsonStringMessage(stringData: string, isListen?: any): any {
    try {
      let res = JSON.parse(stringData)

      if (typeof res === 'string' && (res.includes('{') || res.includes('['))) {
        res = JSON.parse(stringData)
      }

      const command = res.command
      const response = res.data

      if (!command && !response) {
        return
      }

      if (response.success !== true) {
        if (isListen) {
          this.emit(command, res)
        }
        throw new Error(response.message || 'Unknown error')
      }

      if (isListen) {
        this.emit(command, res)
      }

      return response.data
    } catch (error) {
      console.error('Error handling JSON string message:', error)
      throw error
    }
  }

  private _subscribe(): void {
    window.addEventListener('flutterInAppWebViewPlatformReady', () => {
      this._isReady = true
      this.emit('ready')
    })

    window
      .require?.('electron')
      ?.ipcRenderer.on('message', (_event, ...args) => {
        if (args[0]) {
          window.postMessage(args[0], '*')
        } else {
          window.postMessage(args, '*')
        }
      })

    window.addEventListener('message', (ev) => {
      const { data } = ev

      if (typeof data === 'string') {
        if (data.startsWith('backWorker|')) {
          return
        }
        return this.handleJsonStringMessage(data, true)
      }

      if (data.cmd) {
        this.emit('listen-cmd', data)
        return
      }

      if (data.isSocket !== true) {
        receiveData[data.command] = data
        return data
      }

      this.emit(data.command, data.data)
      return data
    })
  }
}

const core = new SystemCore()
export { core as SystemCore }
