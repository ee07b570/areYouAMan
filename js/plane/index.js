// import Sprite from '../base/sprite'
import Animation from '../base/animation'
import { PLAYER_GROUD_BOTTOM, PLANE_WIDTH, PLANE_HEIGHT } from '../config'
import DataBus from '../databus'

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

// 玩家相关常量设置
const PLANE_IMG_SRC = 'images/UFO.png'

const databus = new DataBus()

export default class Plane extends Animation {
  constructor() {
    super(PLANE_IMG_SRC, PLANE_WIDTH, PLANE_HEIGHT)

    // 飞机默认处于屏幕居中位置
    this.x = screenWidth / 2 - this.width / 2
    this.y = PLAYER_GROUD_BOTTOM / 2 - this.height / 2

    this.initExplosionAnimation()

    // 用于记录手势初始的位置
    this.lastTouchPos = {
      x: 0,
      y: 0
    }

    // 初始化事件监听
    this.initEvent()
  }

  // 预定义爆炸的帧动画
  initExplosionAnimation() {
    let frames = []
    const EXPLO_IMG_PREFIX = 'images/explosion'
    const EXPLO_FRAME_COUNT = 19

    for (let i = 0; i < EXPLO_FRAME_COUNT; i++) {
      frames.push(EXPLO_IMG_PREFIX + (i + 1) + '.png')
    }

    this.initFrames(frames)
  }

  setLastTouchPosition(e) {
    let x = e.touches[0].clientX
    let y = e.touches[0].clientY

    this.lastTouchPos = { x, y }
  }

  setPlanePos(e){
    const newX = e.touches[0].clientX
    const newY = e.touches[0].clientY

    const { x, y } = this.lastTouchPos

    const diffX = newX - x;
    const diffY = newY - y;

    this.x = this.x + diffX
    if (this.x < 0) {
      this.x = 0
    }
    if (this.x > screenWidth - this.width / 2) {
      this.x = screenWidth - this.width / 2
    }

    this.y = this.y + diffY
    if (this.y < 0) {
      this.y = 0
    }
    if (this.y > PLAYER_GROUD_BOTTOM - this.height / 2) {
      this.x = PLAYER_GROUD_BOTTOM - this.height / 2
    }
  }

  sendPosToDatabus() {
    databus.planePos = {
      x: this.x,
      y: this.y
    }
  }

  /**
   * 玩家响应手指的触摸事件
   * 改变战机的位置
   */
  initEvent() {
    canvas.addEventListener('touchstart', ((e) => {

      e.preventDefault()
      this.setLastTouchPosition(e)

    }).bind(this))

    canvas.addEventListener('touchmove', ((e) => {
      e.preventDefault()
      this.setPlanePos(e)
      this.setLastTouchPosition(e)
    }).bind(this))

    canvas.addEventListener('touchend', ((e) => {
      e.preventDefault()
    }).bind(this))
  }

  drawToCanvas(ctx) {
    this.sendPosToDatabus()
    super.drawToCanvas(ctx)
  }
}