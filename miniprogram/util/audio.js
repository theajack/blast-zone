export class Player {
  constructor () {
    this.path = '../miniprogram/music/'
    this.range = [1, 21]
  }

  createBgMusic () {
    const innerBgCtx = wx.createInnerAudioContext()
    innerBgCtx.loop = true
    innerBgCtx.autoplay = true
    innerBgCtx.src = `${this.path}bg.m4a`
    innerBgCtx.play()
  }

  playTouchMusic (index) {
    index = (index && index >= this.range[0] && index <= this.range[1]) ? index : 1
    this.destoryTouch()
    this.touchMusic = wx.createInnerAudioContext()
    this.touchMusic.src = `${this.path}${index}.m4a`
    this.touchMusic.play()
  }

  destoryTouch () {
    this.touchMusic && this.touchMusic.destroy()
  }
}