export default class EventEmitter {
  private _listeners: Record<string, Function[]>

  constructor() {
    this._listeners = {}
  }

  on(event: string, listener: Function): this {
    if (!this._listeners[event]) {
      this._listeners[event] = []
    }
    this._listeners[event].push(listener)
    return this
  }

  removeEventListener(event: string, listener: Function): void {
    const listeners = this._listeners[event]
    if (listeners) {
      this._listeners[event] = listeners.filter((cb) => cb !== listener)
    }
  }

  removeAllEventListeners(event: string): void {
    delete this._listeners[event]
  }

  emit(event: string, ...args: any[]): void {
    const listeners = this._listeners[event]
    if (listeners) {
      listeners.forEach((cb) => cb(...args))
    }
  }
}
