// pages/info/info.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loc: '华东',
  },
  handleLocation: function (e) {
    console.log(e.detail.value)
    this.setData({
      loc: e.detail.value
    })
  },
  handInInfo: function (e) {
    wx.showModal({
      title: '是否确定选择',
      content: '一旦选择完成无法修改',
      complete: (res) => {
        if (res.cancel) {
          ;
        }
    
        if (res.confirm) {
          let x = this.data.loc
    console.log(app.globalData.userInfo)
    wx.cloud.init();
    wx.cloud.database().collection('users_loc').add({
      data:{
        loc: x
      },
      success: res => {
        console.log(res)
        wx.showToast({
          title: '设置成功',
        });
        app.globalData.userLoc = x;
        wx.navigateBack();
      },
      fail: res => {
        console.error(res)
      }
    })
        }
      }
    })
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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