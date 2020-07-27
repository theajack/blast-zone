import {getIcon, SINGLE_LENGTH, MAX_LENGTH} from "../../util/icon";
import { Player } from '../../util/audio';
import { W_SIZE, H_SIZE, ontouch, initSize } from '../../util/touch';
import { initMusicPos, drawPos } from '../../util/music';

let player = new Player()

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
  ontouchcanvas(e){
    let index = ontouch(e);
    if(index!==-1){
      this.reinitIcons(index);
    }
  },
  ontouchmovecanvas(e){
    let index = ontouch(e);
    if(index!==-1){
      this.reinitIcons(index);
    }
  },
  ontouchendcanvas(e){
    ontouch(e);
  },
  reinitIcons(index){
    wx.showShareMenu({})
    // if(!checkPos(index)){
    //   return;
    // }
    player.playTouchMusic(index);
    for(let i = 0; i< SINGLE_LENGTH;i++){
      this.icons.push(getIcon({
        icons: this.icons,
        ctx: this.ctx,
        index,
        swidth: this.data.width,
        sheight: this.data.height,
        // src: '../../images/icon_01.png',
      }))
      if(this.icons.length > MAX_LENGTH){
        let icon = this.icons.shift()
        if(icon){
          try{
            icon.disble();
          }catch(e){
          }
        }
      }
    }
  },

  initCanvas(){
    this.icons = [];
    this.ctx = wx.createCanvasContext('canvas');
    this.nx = W_SIZE;
    this.ny = H_SIZE;
    this.pwidth = this.data.width / this.nx;
    this.pheight = this.data.height / this.ny;
    // this.reinitIcons();
    
    // this.ctx.translate(50, 50);
    // this.ctx.rotate(30 *  Math.PI / 180); 
    // this.ctx.drawImage('../../images/icon.png', -50, -50, 100, 100);
    // this.ctx.rotate(-30 *  Math.PI / 180); 
    // this.ctx.translate(-50, -50);
    
    // this.ctx.translate(150, 150);
    // this.ctx.rotate(60 *  Math.PI / 180); 
    // this.ctx.drawImage('../../images/icon.png', -50, -50, 100, 100);
    // this.ctx.translate(-150, -150);
    // this.ctx.rotate(-60 *  Math.PI / 180); 

    // this.ctx.draw();

    this.loopAnimation();
  },

  loopAnimation(){
    this.interval = setInterval(()=>{
      this.move();
      this.drawFrame();
    }, 10)
    // this.interval = setInterval(()=>{
    //   this.move();
    //   this.drawFrame();
    // }, 1000)
  },

  move(){
    this.icons.forEach(icon=>{
      icon.move();
    })
    // this.nx = this.nx === 4?3:4;
    // this.pwidth = this.data.width / this.nx;
    // this.pheight = this.data.height / this.ny;
  },

  clearRect(){

  },

  drawFrame(){
    // let c1 = 'rgba(255,255,255,0.2)', c2 = 'rgba(0,0,0,0.2)'
    // this.ctx.clearRect(0, 0, this.data.width, this.data.height)
    // for(let x = 0;x<this.nx;x++){
    //   for(let y=0;y<this.ny;y++){
    //     this.ctx.fillStyle = ((x+y)%2 === 0)?c1:c2;
    //     this.ctx.fillRect(x*this.pwidth, y*this.pheight, this.pwidth, this.pheight);
    //   }
    // }
    drawPos(this.ctx, );
    this.icons.forEach(icon=>{
      icon.draw();
    })
    this.ctx.draw();
  },

  tapMusic () {
    let idx = Math.ceil(Math.random() * 20)
    player.playTouchMusic(idx)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.getSystemInfo({
      success: res => {
        let width = res.windowWidth;
        let height = res.windowHeight;

        initSize(width, height)
        initMusicPos(width, height)
        this.setData({
          width,
          height
        }, ()=>{
          this.initCanvas();
        });
      }
    });
    player.createBgMusic()
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
    return {
      title: '来火星音乐碎片解锁你的独家音乐吧！',
      path: '/index/index',
    }
  }
  
})