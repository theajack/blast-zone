export class Player {
  constructor () {
    this.path = 'http://insurance.thinkinpets.com/tips-wx/template/agentsys/public/music/'
    this.range = [1, 21]
    this.touchMusic = {}
    this.preTouch = null
    this.tabTimer = null
    for (let i = 1; i <= this.range[1]; i++) {
      this.touchMusic[i] = wx.createInnerAudioContext()
      this.touchMusic[i].id = `music_${i}`
      this.touchMusic[i].src = `${this.path}${i}.m4a`
    }
  }

  createBgMusic () {
    this.innerBgCtx = wx.createInnerAudioContext()
    this.innerBgCtx.loop = true
    this.innerBgCtx.autoplay = true
    this.innerBgCtx.src = `${this.path}bg.m4a`
    this.innerBgCtx.play()
  }

  stopMusic(){
    this.innerBgCtx.stop();
  }

  playTouchMusic (index) {
    index = (index && index >= this.range[0] && index <= this.range[1]) ? index : 1
    let _this = this
    if (_this.tabTimer) {
      clearTimeout(_this.tabTimer)
      _this.tabTimer = null
    } else {
      _this.tabTimer = setTimeout(function () {
        clearTimeout(_this.tabTimer)
        _this.tabTimer = null
        _this.touchMusic[index].stop()
      }, 5000)
    }
    
    if (!this.preTouch ) {
      this.preTouch = index
    } else {
      if (this.preTouch === index) {
        this.touchMusic[index].stop()
      } else {
        this.touchMusic[this.preTouch] && this.touchMusic[this.preTouch].stop()
      }
      this.preTouch = null
    }
    this.touchMusic[index] && this.touchMusic[index].play()
  }

  stopTouchMusic (index) {
    if (!index) { return }
    this.touchMusic[index].onTimeUpdate(() => {
      let duration = this.touchMusic[index].duration
      let currentTime = this.touchMusic[index].currentTime
      let left = duration - currentTime
      if (left < 2) {
        this.touchMusic[index].volume = left
      }
    })
  }

  exit () {
    for (let key in this.touchMusic) {
      this.touchMusic[key].destory()
    }
    this.preTouch = null
  }
}