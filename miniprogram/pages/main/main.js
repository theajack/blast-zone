const {default: Icon} = require("../../util/icon");

// miniprogram/pages/main/main.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    width: 0,
    height: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  initCanvas(){
    this.ctx = wx.createCanvasContext('canvas');
    this.nx = 3;
    this.ny = 7;
    this.pwidth = this.data.width / this.nx;
    this.pheight = this.data.height / this.ny;
    this.icons = [];
    for(let i = 0; i< 5;i++){
      this.icons.push(new Icon({
        ctx: this.ctx,
        swidth: this.data.width,
        sheight: this.data.height,
        src: '../../images/icon.png',
        width: 100,
        height: 100
      }))
    }
    this.loopAnimation();
  },

  loopAnimation(){
    this.interval = setInterval(()=>{
      this.move();
      this.drawFrame();
    }, 20)
  },

  move(){
    this.icons.forEach(icon=>{
      icon.move();
    })
    // this.nx = this.nx === 4?3:4;
    // this.pwidth = this.data.width / this.nx;
    // this.pheight = this.data.height / this.ny;
  },

  drawFrame(){
    let c1 = 'rgba(255,255,255,0.2)', c2 = 'rgba(0,0,0,0.2)'
    this.ctx.clearRect(0, 0, this.data.width, this.data.height)
    for(let x = 0;x<this.nx;x++){
      for(let y=0;y<this.ny;y++){
        this.ctx.fillStyle = ((x+y)%2 === 0)?c1:c2;
        this.ctx.fillRect(x*this.pwidth, y*this.pheight, this.pwidth, this.pheight);
      }
    }
    this.icons.forEach(icon=>{
      icon.draw();
    })
    this.ctx.draw();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.getSystemInfo({
      success: res => {
        this.setData({
          width: res.windowWidth,
          height: res.windowHeight,
        }, ()=>{
          this.initCanvas();
        });
      }
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
  
})