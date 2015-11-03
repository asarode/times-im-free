import Rx from 'rx'

class AppUtils {

  constructor(App) {

    this.App = App

    this._shiftKeyUp = Rx.Observable
      .fromEvent(window, 'keydown')
      .map(e => e.shiftKey)

    this._shiftKeyDown = Rx.Observable
      .fromEvent(window, 'keyup')
      .map(e => e.shiftKey)
  }

  get shiftKeyupSource() {
    return this._shiftKeyUp
  }

  get shiftKeyDownSource() {
    return this._shiftKeyDown
  }
}

export default function AppContext(App) {
  return {
    AppUtils: new AppUtils(App)
  }
}
