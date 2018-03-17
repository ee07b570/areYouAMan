import DataBus from '../databus'
import { HANDLER_BTN_WIDTH as BTN_WIDTH } from './../config'


let databus = new DataBus()

// 手柄相关常量设置
export const DIRECTION = {
  UP: 'UP',
  DOWN: 'DOWN',
  LEFT: 'LEFT',
  RIGHT: 'RIGHT'
}

export default class HandlerBtn {
  // 传入的x,y是button的中心点位置
  constructor(imgSrc, direction, x, y) {
    this.img = new Image()
    this.img.src = imgSrc

    this.direction = direction

    this.x = x - BTN_WIDTH / 2
    this.y = y - BTN_WIDTH / 2

    // 初始化事件监听
    this.initEvent()
  }

  /**
   * 当手指触摸屏幕的时候
   * 判断手指是否在按钮上
   * @param {Number} x: 手指的X轴坐标
   * @param {Number} y: 手指的Y轴坐标
   * @return {Boolean}: 用于标识手指是否在按钮上的布尔值
   */
  checkIsFingerOnBtn(x, y) {
    const deviation = 5
    return !!(x >= this.x - deviation
      && y >= this.y - deviation
      && x <= this.x + BTN_WIDTH + deviation
      && y <= this.y + BTN_WIDTH + deviation)
  }

  /**
   * 玩家响应手指的触摸事件
   * 改变战机的位置
   */
  initEvent() {
    canvas.addEventListener('touchstart', ((e) => {
      e.preventDefault()

      let x = e.touches[0].clientX
      let y = e.touches[0].clientY
      //
      if (this.checkIsFingerOnBtn(x, y)) {
        this.onDirection()
      }

    }).bind(this))

    canvas.addEventListener('touchend', ((e) => {
      e.preventDefault()
      this.offDirection()
    }).bind(this))
  }

  onDirection() {
    databus.handleDirection(this.direction)
  }

  offDirection() {
    databus.handleOffDirection(this.direction)
  }

  /**
   * 将精灵图绘制在canvas上
   */
  drawToCanvas(ctx) {
    ctx.drawImage(
      this.img,
      this.x,
      this.y,
      BTN_WIDTH,
      BTN_WIDTH
    )
  }
}
