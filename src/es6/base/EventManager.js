export default class {
  constructor() {
    this.handlers = {}
  }

  _addEventListener(evtName, evtHandler) {
    (this.handlers[evtName] || (this.handlers[evtName] = [])).push(evtHandler);
  }

  /**
   * 触发一个事件
   * @param {string} eventName  事件名称
   * @param {object} eventArgs  事件的参数对象，会被传递到事件监听器中
   */
  fire(eventName, eventArgs) {
    if (this.handlers[eventName]) {
      let cbs = this.handlers[eventName];
      let len = cbs.length;

      for (let i = 0; i < len; i++) {
        let cb = cbs[i];
        cb && cb(eventArgs);
      }
    }
  }

  /**
   * 注册事件监听函数，可以有多种调用方式
   * 目前支持
   *  on('evt',handler);
   *  on(['evt1','evt2'],handler);
   *  on({evt1:handler1,evt2:handler2})
   */
  on(arg1, arg2) {
    let arg1Type = Object.prototype.toString.call(arg1);

    if (arg1Type == '[object String]') {
      this._addEventListener(arg1, arg2);
    } else if (arg1Type == '[object Array]') {
      for (let i = 0, len = arg1.length; i < len; i++) {
        this._addEventListener(arg1[i], arg2);
      }
    } else if (arg1Type == '[object Object]') {
      for (let evt in arg1) {
        if (arg1.hasOwnProperty(evt)) {
          this._addEventListener(evt, arg1[evt]);
        }
      }
    } else {
      throw new Error('arguments error');
    }
  }

  /**
   * 注销事件监听
   * @param  {String}  eventName    事件名称
   * @param  {Function} eventHandler 事件处理函数
   */
  un(eventName, eventHandler) {
    if (this.handlers[eventName]) {
      this.handlers[name].filer(handler => {
        return handler != eventHandler;
      });
    }
  }
};