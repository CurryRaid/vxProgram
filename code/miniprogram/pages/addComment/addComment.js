// pages/addComment/addComment.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dishid: '',
    inputcontent: '',
    time: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      dishid: options.dishid
    })
    // console.log(this.data.dishid)
    var Time = Date();
    var month;
    // console.log(Time[4])
    this.setData({
      time: Time
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },
  newcomment: function (e) {
    var that = this;
    this.setData({
      inputcontent: e.detail.value.textarea
    });
    console.log(this.data.inputcontent.length)
    if (this.data.inputcontent.length > 25) {
      wx.showToast({
        title: '超过25个字符',
        icon: 'error'
      })
    }else{
      wx.cloud.init();
    wx.cloud.database().collection('comment').add({
      data: {
        dish_id: that.data.dishid,
        content: that.data.inputcontent,
        time: that.data.time,
        author: app.globalData.userInfo.nickName
      },
      success: res => {
        wx.navigateBack();
        wx.showToast({
          title: '评论成功'
        })
      },
      fail: res => {
        console.error(res)
      }
    })
    }
    
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