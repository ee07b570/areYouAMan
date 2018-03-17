// import Sprite from '../base/sprite'
import Animation from '../base/animation'
import { DIRECTION } from '../handler/handlerBtn'
import { PLAYER_GROUD_BOTTOM, PLANE_SPEED, PLANE_WIDTH, PLANE_HEIGHT } from '../config'
import DataBus from '../databus'

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

// 玩家相关常量设置
const PLANE_IMG_SRC = 'images/hero.png'
const SPEED = PLANE_SPEED

const databus = new DataBus()

export default class Plane extends Animation {
  constructor() {
    super(PLANE_IMG_SRC, PLANE_WIDTH, PLANE_HEIGHT)

    // 飞机默认处于屏幕居中位置
    this.x = screenWidth / 2 - this.width / 2
    this.y = PLAYER_GROUD_BOTTOM / 2 - this.height / 2

    this.initExplosionAnimation()
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

  /**
   * 设置飞机位置
   */
  setPlanePosition() {

    if (databus.gameOver) {
      return
    }

    if (databus[DIRECTION.UP]) {
      this.y -= SPEED
    }

    if (databus[DIRECTION.DOWN]) {
      this.y += SPEED
    }

    if (databus[DIRECTION.LEFT]) {
      this.x -= SPEED
    }

    if (databus[DIRECTION.RIGHT]) {
      this.x += SPEED
    }

    if (this.x < 0)
      this.x = 0

    else if (this.x > screenWidth - this.width)
      this.x = screenWidth - this.width

    if (this.y <= 0)
      this.y = 0

    else if (this.y > PLAYER_GROUD_BOTTOM - this.height)
      this.y = PLAYER_GROUD_BOTTOM - this.height
  }

  drawToCanvas(ctx) {
    this.setPlanePosition()
    super.drawToCanvas(ctx)
  }
}
