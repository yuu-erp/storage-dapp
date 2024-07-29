import { receiveData } from '../core/receiveData'
declare global {
  interface Window {
    webkit: {
      messageHandlers: {
        callbackHandler: any
      }
    }
    isHasNotch?: boolean
    appId?: string
  }
  interface PayloadSendNative {
    command: keyof typeof receiveData
    value?: any
    appId?: string
  }
  interface Wallet {
    address: string
    name: string
    bg: string
    // ....
  }
}

export {}
