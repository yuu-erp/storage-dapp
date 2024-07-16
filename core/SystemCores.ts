import EventEmitter from './EventEmitter'
import { receiveData } from './receiveData'

class SystemCore extends EventEmitter {
  isReady: boolean

  constructor() {
    super()
    this.isReady = this.checkReadyState()
    this.subscribeEvents()
  }
  private checkReadyState(): boolean {
    return window.webkit &&
      window.webkit.messageHandlers &&
      window.webkit.messageHandlers.callbackHandler
      ? true
      : !!window.opener
  }

  private subscribeEvents(): void {
    window.addEventListener('flutterInAppWebViewPlatformReady', () => {
      this.handlePlatformReady()
    })

    const electron = window.require?.('electron')
    if (electron) {
      electron.ipcRenderer.on('message', (_event, ...args) => {
        this.handleElectronMessage(args)
      })
    }

    window.addEventListener('message', (event: MessageEvent) => {
      this.handleWindowMessage(event)
    })
  }

  private handlePlatformReady(): void {
    this.isReady = true
    this.emit('ready')
  }

  private handleElectronMessage(args: any[]): void {
    const message = args[0] || args
    window.postMessage(message, '*')
  }

  private handleWindowMessage(event: MessageEvent): void {
    const { data } = event
    if (typeof data === 'string') {
      if (data.startsWith('backWorker|')) {
        return
      }
      this.handleJsonStringMessage(data, true)
    } else if (data.cmd) {
      this.emit('listen-cmd', data)
    } else if (data.isSocket !== true) {
      receiveData[data.command] = data
    } else {
      this.emit(data.command, data.data)
    }
  }

  private handleJsonStringMessage(
    stringData: string,
    isListen?: boolean
  ): void {
    try {
      const { command, data, success, message } = JSON.parse(stringData)
      if (!command && !data) {
        throw new Error('Command and data must be provided')
      }
      if (!success) {
        if (isListen) {
          this.emit(command!, { command, data, success, message })
        }
        throw new Error(message || 'Unknown error')
      }
      if (isListen) {
        this.emit(command!, { command, data, success, message })
      }
    } catch (error) {
      throw new Error(`Error in handleJsonStringMessage: ${error.message}`)
    }
  }
}

const core = new SystemCore()
export default core as SystemCore
