import Sprite from '../base/sprite'
import DataBus from '../databus'
import { PLAYER_GROUD_BOTTOM, INIT_SPANSOR_DADDY_SPEED, INIT_SPANSOR_DADDY_SEED, SPANSOR_DADDY_WIDTH, SPANSOR_DADDY_HEIGHT } from '../config'

const SPANSOR_DADDY_IMG_SRC = 'images/spansor1.png'

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
  return Math.floor(INIT_SPANSOR_DADDY_SEED * Math.random())
}

// 因为需要用于产生速度，所以不能为0
function rnd(start, end) {
  const num = Math.floor(Math.random() * (end - start) + start)
  if (num !== 0) {
    return num
  }
  return rnd(start, end);
}

// flag为true，返回正数，flag为false返回负数，没有参数或其他随便返回
function speedCalculater(flag) {
  const speed = rnd(-1 * INIT_SPANSOR_DADDY_SPEED, INIT_SPANSOR_DADDY_SPEED)

  if (flag === true) {
    return Math.abs(speed)
  }

  if (flag === false) {
    return -1 * Math.abs(speed)
  }

  return speed
}

let databus = new DataBus()

export default class SpansorDaddy extends Sprite {
  constructor() {
    super(SPANSOR_DADDY_IMG_SRC, SPANSOR_DADDY_WIDTH, SPANSOR_DADDY_HEIGHT)
  }

  init() {
    const fromWhere = randInitPosition()
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

  getSpansorValue() {
    return 3000
  }

  // 每一帧更新子弹位置
  update() {
    this.x += this[__.speedX]
    this.y += this[__.speedY]

    // 超出屏幕回弹
    // 左右超出
    if (this.x < 0 || this.x > screenWidth - this.width) {
      databus.removeSpansorDaddy(this)
    }
    // 上下超出
    if (this.y < 0 || this.y > PLAYER_GROUD_BOTTOM - this.height) {
      databus.removeSpansorDaddy(this)
    }
    // // 超出屏幕回弹
    // // 左右超出
    // if (this.x < 0 || this.x > screenWidth - this.width) {
    //   this[__.speedX] = -1 * this[__.speedX]
    // }
    // // 上下超出
    // if (this.y < 0 || this.y > PLAYER_GROUD_BOTTOM - this.height) {
    //   this[__.speedY] = -1 * this[__.speedY]
    // }
  }

  // update() {
  //   this.y += this[__.speed]

  //   // 对象回收
  //   if (this.y > window.innerHeight + this.height)
  //     databus.removeEnemey(this)
  // }
}
