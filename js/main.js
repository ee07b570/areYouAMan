import BackGround from './runtime/background'
import GameInfo from './runtime/gameinfo'
import Music from './runtime/music'
import DataBus from './databus'

import Handler from './handler/index';
import Plane from './plane/index'
import Missile from './npc/missile'
import SponsorDaddy from './npc/sponsorDaddy'

import { evaluate } from './utils/evaluation'

import { INIT_MISSILES_NUM } from './config'

let ctx = canvas.getContext('2d')
let databus = new DataBus()

/**
 * 游戏主函数
 */
export default class Main {
  constructor() {
    // 维护当前requestAnimationFrame的id
    this.aniId = 0
    this.init()
    this.restart()
  }

  init() {
    wx.onHide(() => {
      this.gameOver()
    })
  }

  gameOver() {
    const now = + new Date()
    databus.duration = now - databus.startTime
    databus.gameOver = true
    this.plane.playAnimation()
    this.music.playExplosion()
  }

  restart() {
    databus.reset()

    canvas.removeEventListener(
      'touchstart',
      this.touchHandler
    )

    this.bg = new BackGround(ctx)
    this.gameinfo = new GameInfo()
    this.music = new Music()

    this.handler = new Handler()
    this.plane = new Plane()

    this.addMissiles(INIT_MISSILES_NUM)

    this.bindLoop = this.loop.bind(this)
    this.hasEventBind = false

    // 清除上一局的动画
    window.cancelAnimationFrame(this.aniId);

    this.aniId = window.requestAnimationFrame(
      this.bindLoop,
      canvas
    )
  }

  addMissiles(missilesNum) {
    while (missilesNum) {
      let missile = databus.pool.getItemByClass('missile', Missile)
      missile.init()
      databus.missiles.push(missile)
      missilesNum --
    }
  }

  missileGenerate() {
    if (databus.frame % 30 === 0) {
      this.addMissiles(1)
    }
  }

  /**
   * 随着帧数变化的敌机生成逻辑
   * 帧数取模定义成生成的频率
   */
  sponsorDaddyGenerate() {
    // TODO: 写成随机的
    if (databus.frame % 300 === 0) {
      let sponsorDaddy = databus.pool.getItemByClass('sponsorDaddy', SponsorDaddy)
      sponsorDaddy.init()
      databus.sponsorDaddies.push(sponsorDaddy)
    }
  }

  // 全局碰撞检测
  collisionDetection() {
    let that = this
    databus.missiles.forEach((missile) => {
      if (this.plane.isCollideWith(missile)) {
        this.gameOver()
      }
    })

    databus.sponsorDaddies.forEach((sponsorDaddy) => {
      if (this.plane.isCollideWith(sponsorDaddy)) {
        that.music.playSponse()
        databus.startTime -= sponsorDaddy.getSponsorValue()
        sponsorDaddy.visible = false
      }
    })
  }

  // 游戏结束后的触摸事件处理逻辑
  touchEventHandler(e) {
    e.preventDefault()

    const x = e.touches[0].clientX
    const y = e.touches[0].clientY

    const restartArea = this.gameinfo.restartBtnArea

    if (x >= restartArea.startX
      && x <= restartArea.endX
      && y >= restartArea.startY
      && y <= restartArea.endY) {
      this.restart()
      return
    }

    const shareArea = this.gameinfo.shareBtnArea

    if (x >= shareArea.startX
      && x <= shareArea.endX
      && y >= shareArea.startY
      && y <= shareArea.endY) {
      this.share()
      return
    }
      
  }

  share() {
    const { text } = evaluate(databus.duration)
    wx.shareAppMessage({
      title: '是男人就坚持20秒',
      desc: `我刚刚在男人的挑战中获得了"${text}"评价，快来挑战我吧！`,
      path: '/pages/index/index?from=sharebuttonabc&otherkey=othervalue', // ?后面的参数会在分享页面打开时传入onLoad方法
      // imageUrl: 'http://e.com/e.png', // 支持本地或远程图片，默认是小程序icon
      success () {
        console.log('分享发布器已吊起，并不意味着用户分享成功，微头条不提供这个时机的回调');
      },
      fail() {
        console.log('分享发布器吊起失败');
      }
    })
  }

  /**
   * canvas重绘函数
   * 每一帧重新绘制所有的需要展示的元素
   */
  render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    this.bg.render(ctx)

    this.handler.render(ctx)
    this.plane.drawToCanvas(ctx)

    databus.missiles
      .concat(databus.sponsorDaddies)
      .forEach((item) => {
        item.drawToCanvas(ctx)
      })

    // console.log(databus.sponsorDaddies)

    databus.animations.forEach((ani) => {
      if (ani.isPlaying) {
        ani.aniRender(ctx)
      }
    })

    if (!databus.gameOver) {
      const now = + new Date()
      databus.duration = now - databus.startTime
    }

    this.gameinfo.renderGameScore(ctx, databus.duration)

    // 游戏结束停止帧循环
    if (databus.gameOver) {
      this.gameinfo.renderGameOver(ctx, databus.duration)

      if (!this.hasEventBind) {
        this.hasEventBind = true
        this.touchHandler = this.touchEventHandler.bind(this)
        canvas.addEventListener('touchstart', this.touchHandler)
      }
    }
  }

  // 游戏逻辑更新主函数
  update() {
    if (databus.gameOver)
      return;

    databus.missiles
      .concat(databus.sponsorDaddies)
      .forEach((item) => {
        item.update()
      })

    this.missileGenerate()
    this.sponsorDaddyGenerate()

    this.collisionDetection()

  }

  // 实现游戏帧循环
  loop() {
    databus.frame++

    this.update()
    this.render()

    this.aniId = window.requestAnimationFrame(
      this.bindLoop,
      canvas
    )
  }
}
