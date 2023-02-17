// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tags0: ['玉湖','银泉','大食堂'],
    tags1:['澄月','临湖','麦斯威'],
    menulist: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.cloud.init()
    wx.cloud.database().collection('menu').orderBy('total_star','desc').get({
      success: res => {
         console.log(res);
         this.setData({
           menulist: res.data
         })
         console.log(this.data.menulist)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
          console.error('[数据库] [查询记录] 失败：', err)
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