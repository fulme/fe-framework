import EventManager from './EventManager';

export default class extends EventManager {
  constructor($container) {
    super();

    this.$container = $($container);
  }

  find(selector, $parent) {
    $parent = $parent || this.$container;
    return $($parent).find(selector);
  }

  show() {
    this.$container.fadeIn();
  }

  hide() {
    this.$container.fadeOut();
  }

  toggle() {
    if (this.$container.is(':visible')) {
      this.hide();
    } else {
      this.show();
    }
  }

  checkResult(res, success, failure) {
    // TODO 公用的接口数据处理
  }
};