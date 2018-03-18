import Sprite from '../base/sprite'
import DataBus from '../databus'
import { PLAYER_GROUD_BOTTOM, INIT_MISSILE_SPEED, INIT_MISSILE_POSITION_SEED, MISSILE_WIDTH, MISSILE_HEIGHT, MISSILE_ENLARGE_MAX_FACTOR } from '../config'

const MISSILE_IMG_SRC = 'images/bullet.png'

const __ = {
  speedX: Symbol('speedX'),
  speedY: Symbol('speedY'),
}

const DIRECTION = {
  TOP: 0,
  RIGHT: 1,
  BOTTOM: 2,
  LEFT: 3
}

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight


function randInitPosition() {
  return Math.floor(INIT_MISSILE_POSITION_SEED * Math.random())
}

// 因为需要用于产生速度，所以不能为0
function rnd(start, end) {
  const num = Math.floor(Math.random() * (end - start) + start)
  if (num) {
    return num
  }
  rnd(start, end);
}

// flag为true，返回正数，flag为false返回负数，没有参数或其他随便返回
function speedCalculater(flag) {
  const speed = rnd(-1 * INIT_MISSILE_SPEED, INIT_MISSILE_SPEED)

  if (flag === true) {
    return Math.abs(speed)
  }

  if (flag === false) {
    return -1 * Math.abs(speed)
  }
  
  return speed
}

let databus = new DataBus()

export default class Missile extends Sprite {
  constructor() {
    super(MISSILE_IMG_SRC, MISSILE_WIDTH, MISSILE_HEIGHT)
  }

  init() {
    const fromWhere = randInitPosition()
    // 大小随机
    const enlargeTime = rnd(1, MISSILE_ENLARGE_MAX_FACTOR)
    this.width = enlargeTime * MISSILE_WIDTH
    this.height = enlargeTime * MISSILE_HEIGHT
    switch (fromWhere) {
      case DIRECTION.TOP:
        this.x = rnd(0, screenWidth - this.width)
        this.y = 0;
        this[__.speedX] = speedCalculater()
        this[__.speedY] = speedCalculater(true)
        break;
      case DIRECTION.BOTTOM:
        this.x = rnd(0, screenWidth - this.width)
        this.y = PLAYER_GROUD_BOTTOM - this.height
        this[__.speedX] = speedCalculater()
        this[__.speedY] = speedCalculater(false)
        break;
      case DIRECTION.LEFT:
        this.x = 0
        this.y = rnd(0, PLAYER_GROUD_BOTTOM - this.height)
        this[__.speedX] = speedCalculater(true)
        this[__.speedY] = speedCalculater()
        break;
      case DIRECTION.RIGHT:
        this.x = screenWidth - this.width
        this.y = rnd(0, PLAYER_GROUD_BOTTOM - this.height)
        this[__.speedX] = speedCalculater(false)
        this[__.speedY] = speedCalculater()
        break;
      default:
        this.y = rnd(0, PLAYER_GROUD_BOTTOM - this.height)
        this.x = rnd(0, screenWidth - this.width)
        this[__.speedX] = speedCalculater()
        this[__.speedY] = speedCalculater()
    }

    this.visible = true
  }

  // 每一帧更新子弹位置
  update() {
    this.x += this[__.speedX]
    this.y += this[__.speedY]

    // 超出屏幕回弹
    // 左右超出
    if (this.x < 0 || this.x > screenWidth - this.width){
      this[__.speedX] = -1 * this[__.speedX]
    }
    // 上下超出
    if (this.y < 0 || this.y > PLAYER_GROUD_BOTTOM - this.height) {
      this[__.speedY] = -1 * this[__.speedY]
    }
  }
}
