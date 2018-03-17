import { evaluate } from './../utils/evaluation'

const screenWidth  = window.innerWidth
const screenHeight = window.innerHeight

let atlas = new Image()
atlas.src = 'images/Common.png'


export default class GameInfo {
  renderGameScore(ctx, duration) {
    ctx.fillStyle = "#ffffff"
    ctx.font      = "20px Arial"

    ctx.fillText(
      `${duration / 1000}s`,
      10,
      30
    )
  }

  renderGameOver(ctx, duration) {
    ctx.drawImage(atlas, 0, 0, 119, 107, screenWidth / 2 - 150, screenHeight / 2 - 100, 300, 300)

    ctx.fillStyle = "#ffffff"
    ctx.font    = "20px Arial"

    ctx.fillText(
      '游戏结束',
      screenWidth / 2 - 40,
      screenHeight / 2 - 100 + 50
    )

    ctx.fillText(
      `坚持时长: ${duration / 1000}s`,
      screenWidth / 2 - 80,
      screenHeight / 2 - 100 + 125
    )

    ctx.font = "16px Arial"

    const { text, offset: textOffset } = evaluate(duration)
    ctx.fillText(
      text,
      screenWidth / 2 - textOffset,
      screenHeight / 2 - 100 + 155
    )

    ctx.font = "20px Arial"

    const offset = 15

    this.restartBtnArea = {
      startX: screenWidth / 2 - 60,
      startY: screenHeight / 2 - 100 + 180 - offset,
      endX: screenWidth / 2 - 60 + 120,
      endY: screenHeight / 2 - 100 + 180 + 40 - offset,
    }

    ctx.drawImage(
      atlas,
      120, 6, 39, 24,
      screenWidth / 2 - 60,
      screenHeight / 2 - 100 + 180 - offset,
      120, 40
    )

    ctx.fillText(
      '重新开始',
      screenWidth / 2 - 40,
      screenHeight / 2 - 100 + 205 - offset
    )

    this.shareBtnArea = {
      startX: screenWidth / 2 - 60,
      startY: screenHeight / 2 - 100 + 220 - offset,
      endX: screenWidth / 2 - 60 + 120,
      endY: screenHeight / 2 - 100 + 220 + 40 - offset,
    }

    ctx.drawImage(
      atlas,
      120, 6, 39, 24,
      screenWidth / 2 - 60,
      screenHeight / 2 - 100 + 220 - offset,
      120, 40
    )

    ctx.fillText(
      '分享战绩',
      screenWidth / 2 - 40,
      screenHeight / 2 - 100 + 245 - offset
    )
  }
}

