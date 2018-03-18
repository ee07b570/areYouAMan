import Sprite from '../base/sprite'
import { PLAYER_GROUD_BOTTOM } from './../config.js'

const screenWidth  = window.innerWidth
const screenHeight = window.innerHeight

const BG_IMG_SRC   = 'images/bg.png'
const BG_WIDTH = 750
const BG_HEIGHT = 1334

const bgRatio = BG_HEIGHT / BG_WIDTH
const playGroudRatio = screenHeight / screenWidth

let crapBgWith = BG_WIDTH
let crapBgHeight = BG_HEIGHT
if (playGroudRatio > bgRatio) {
  crapBgHeight = screenHeight
  crapBgWith = crapBgHeight / screenHeight * screenWidth
}

if (playGroudRatio < bgRatio) {
  crapBgWith = screenWidth
  crapBgHeight = crapBgWith / screenWidth * screenHeight
}


/**
 * 游戏背景类
 * 提供update和render函数实现无限滚动的背景功能
 */
export default class BackGround extends Sprite {
  constructor(ctx) {
    super(BG_IMG_SRC, BG_WIDTH, BG_HEIGHT)

    this.render(ctx)
  }

  /**
   * 背景图重绘函数
   * 绘制两张图片，两张图片大小和屏幕一致
   * 第一张漏出高度为top部分，其余的隐藏在屏幕上面
   * 第二张补全除了top高度之外的部分，其余的隐藏在屏幕下面
   */
  render(ctx) {
    ctx.drawImage(
      this.img,
      0,
      0,
      crapBgWith,
      crapBgHeight,
      0,
      0,
      screenWidth,
      screenHeight
    )
  }
}
