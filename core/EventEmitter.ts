import { receiveData } from './receiveData'

export default class EventEmitter {
  _listeners: any

  constructor() {
    this._listeners = {}
    this.on = this.on.bind(this)
    this.removeEventListener = this.removeEventListener.bind(this)
    this.emit = this.emit.bind(this)
  }

  on(event: keyof typeof receiveData | any, listener?: any) {
    if (!this._listeners[event]) {
      this._listeners[event] = []
    }
    this._listeners[event].push(listener)
    return this
  }

  removeEventListener(event?: any, listener?: any) {
    if (this._listeners[event]) {
      this._listeners[event] = this._listeners[event].filter(
        (l: any) => l !== listener
      )
    }
  }
  removeAllEventListeners(event: any) {
    if (this._listeners[event]) {
      delete this._listeners[event]
    }
  }

  emit(event: any, ...args: any) {
    const cbs = this._listeners[event]
    if (cbs) {
      cbs.forEach((cb: any) => cb(...args))
    }
  }
}
