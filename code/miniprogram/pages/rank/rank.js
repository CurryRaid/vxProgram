// pages/rank/rank.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loc: '',
    champion: '暂无数据',
    loser: '暂无数据'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var that = this;
    this.setData({
      loc: app.globalData.userLoc
    })
    wx.cloud.init({
      traceUser: true
    }
    );
    wx.cloud.callFunction({
      name: 'get_database',
      data: {
        location: app.globalData.userLoc
      },
      success: res => {
        console.log(res,"云函数")
        var max = -1;
          var min = 6;
          var maxname='';
          var minname='';
          var average;
          res.result.data.forEach(element => {
            if (element.num) {
              average = element.total_star / element.num;
              if (average > max) {
                max = average;
                maxname = element.name;
              }
              if (average < min) {
                min = average;
                minname = element.name
              }
            }
          });
          that.setData({
            champion: maxname,
            loser: minname
          })
      },
      fail: res => {
        console.error(res)
      }
    })
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})