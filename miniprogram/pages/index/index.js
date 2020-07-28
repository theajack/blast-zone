// miniprogram/pages/index/index.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    auth: false,
    width: 0,
    height: 0,
    text:'收集音乐碎片\n创作属于你的独一无二的音乐\n整个SKP商场播放你的作品\n为喜欢的人告白\n为父母庆生\n给闺蜜惊喜\n由你精彩'
  },
  onGetUserInfo(){
    this.jumpToMainPage();
  },
  jumpToMainPage() {
    wx.navigateTo({
      url: '../main/main',
    })
    //  console.log("点击了按钮");

    // wx.getSetting({
    //   success(res) {
    //     if (res.authSetting['scope.userInfo']) {
    //       wx.authorize({
    //         scope: 'scope.userInfo',
    //         success () {
    //           //已经同意了不用访问了
    //           console.log("已经同意了不用访问了");
    //             wx.navigateTo({
    //                      url: '../main/main',
    //                 })
    //         },
    //       });
    //     } else {
    //       console.log("没有获取到userInfo的设置,弹框获取用户授权");
    //       wx.authorize({
    //         scope: 'scope.userInfo',
    //         // success () {
    //         //   //已经同意了不用访问了
    //         //   console.log("已经同意了不用访问了");
    //         //     wx.navigateTo({
    //         //              url: '../main/main',
    //         //         })
    //         // },
    //       });
    //     }
    //   },
    //   fail: function() {
    //     console.log("获取用户设置失败");
    //   }
    // })
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
    
    wx.getUserInfo({
      success: (res) => {
        if (res.errMsg === 'getUserInfo:ok') {
          this.setData({auth: true})
        }
      },
    })
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