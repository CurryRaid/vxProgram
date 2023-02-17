// pages/menu/menu.js
const app = getApp();
let shuru="";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: '',
    menulist: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options);
    shuru=options.type;
    this.setData({
      type: options.type
    })
    var that = this;
    wx.cloud.init();
    wx.cloud.database().collection('menu').where({
      location: that.data.type
    }).get({
      success: res => {
        console.log(res);
        that.setData({
          menulist: res.data
        })
        console.log(that.data.menulist)
      },
      fail: res => {
        console.error(res)
      }
    })
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */

  onReady: function (options) {
    　　wx.setNavigationBarTitle({
    　　　　title:shuru //页面切换，更换页面标题
    　　});
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