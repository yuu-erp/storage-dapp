import { receiveData } from '../core/receiveData'
declare global {
  interface Window {
    lang: any
    webkit: any
    appId: any
  }
  interface CustomWindow extends Window {
    webkit?: {
      messageHandlers?: {
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
