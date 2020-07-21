// miniprogram/pages/index/index.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    touchS : [0,0],
    touchE : [0,0],
    width: 0,
    height: 0,
    text:'收集音乐碎片\n创作属于你的独一无二的音乐\n整个SKP商场播放你的作品\n为喜欢的人告白\n为父母庆生\n给闺蜜惊喜\n由你精彩'
  },

  touchStart: function(e){
    // console.log(e.touches[0].pageX)
    let sx = e.touches[0].pageX
    let sy = e.touches[0].pageY
    this.data.touchS = [sx,sy]
  },
  touchMove: function(e){
    let sx = e.touches[0].pageX;
    let sy = e.touches[0].pageY;
    this.data.touchE = [sx, sy]
  },
  touchEnd: function(e){
    let start = this.data.touchS
    let end = this.data.touchE
    console.log(start)
    console.log(end)
    if(start[1] < end[1] - 50){
      console.log('下滑')
      wx.navigateTo({
        url: '../main/main',
      })
    }
  },
    jumpToMainPage() {
     console.log("点击了按钮");
     wx.checkSession({
       success: (res) => {
        //存在登陆态
         console.log("在登录状态");
       },
       fail:function(){
      //不存在登陆态
      console.log("不在登录状态");
      onLogin();
       }
     })
    wx.navigateTo({
      url: '../main/main',
    })
 },

 onLogin : function (options) {
  wx.login({
    timeout: 2,
  })
},
   initCanvas(){

 },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //  var aa = wx.getFileSystemManager().readFileSync("images/homePage.png","base64");
    //  console.log(aa);
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