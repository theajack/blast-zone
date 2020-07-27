export class Player {
  constructor () {
    this.path = 'http://test.thinkinpets.com/tips-wx/template/agentsys/public/music/'
    this.range = [1, 21]
    this.touchMusic = {}
    this.preTouch = null
    for (let i = 1; i <= this.range[1]; i++) {
      this.touchMusic[i] = wx.createInnerAudioContext()
      this.touchMusic[i].id = `music_${i}`
      this.touchMusic[i].src = `${this.path}${i}.m4a`
    }
  }

  createBgMusic () {
    const innerBgCtx = wx.createInnerAudioContext()
    innerBgCtx.loop = true
    innerBgCtx.autoplay = true
    innerBgCtx.src = `${this.path}bg.m4a`
    innerBgCtx.play()
  }

  pausePreMusic (index) {
    index = index || this.preTouch
    this.touchMusic[this.preTouch] && this.touchMusic[this.preTouch].stop()
    this.preTouch = null
  }

  playTouchMusic (index) {
    index = (index && index >= this.range[0] && index <= this.range[1]) ? index : 1
    
    if (!this.preTouch || this.preTouch && this.preTouch !== index ) {
      this.preTouch = index
      this.touchMusic[index] && this.touchMusic[index].play()
    } else {
      this.preTouch = null
      this.touchMusic[index] && this.touchMusic[index].stop()
      this.touchMusic[index] && this.touchMusic[index].play()
    }
  }
}