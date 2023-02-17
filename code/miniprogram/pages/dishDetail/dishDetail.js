// pages/dishDetail/dishDetail.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item: {
      type: Object,
      value: {}
    },
    comment: [],
    name: null,
    star: 0,
    if_star: false,
    average_star: 0,
    prev_star: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    var that = this;
    console.log(e)
    this.setData({
      name: e.dishName,
    })
  },
  addComment: function (e) {
    // console.log(this.data.item)
    if (app.globalData.userInfo){
      wx.navigateTo({
        url: '../addComment/addComment?dishid=' + e.currentTarget.dataset.id,
      })
    }else {
      wx.showToast({
        title: '请在用户页面登录',
        icon: 'none'
      })
    }
    
  },
  star1: function () {
    if (this.data.star != 1){
      this.setData({
        prev_star: this.data.star
      })
      this.setData({
        star: 1
      })
      this.handlestars();
    }
  },
  star2: function () {
    if (this.data.star != 2){
      this.setData({
        prev_star: this.data.star
      })
      this.setData({
        star: 2
      })
      this.handlestars();
    }
  },
  star3: function () {
    if (this.data.star != 3){
      this.setData({
        prev_star: this.data.star
      })
      this.setData({
        star: 3
      })
      this.handlestars();
    }
  },
  star4: function () {
    if (this.data.star != 4) {
      this.setData({
        prev_star: this.data.star
      })
      this.setData({
        star: 4
      })
      this.handlestars();
    }
  },
  star5: function () {
    if (this.data.star != 5) {
      this.setData({
        prev_star: this.data.star
      })
      this.setData({
        star: 5
      })
      this.handlestars();
    }
  },
  handlestars: function () {
    var that = this;
    if (app.globalData.userInfo&&app.globalData.userLoc) {
      if (!that.data.if_star){
        wx.cloud.init();
        wx.cloud.database().collection('dish_star').where({
          dish_id: that.data.item._id,
          location: app.globalData.userLoc
        }).get({
          success: res => {
            wx.cloud.database().collection('dish_star').where({
              dish_id: that.data.item._id,
              location: app.globalData.userLoc
            }).update({
              data:{
                num: res.data[0].num + 1,
                total_star: res.data[0].total_star + that.data.star
              }
            }).then({
              success: res => {
                console.log("地区更新成功")
              },
              fail: res => {
                console.error(res)
              }
            })
          },
          fail: res => {
            console.error(res)
          }
        })
        wx.cloud.database().collection('menu').where({
          _id: that.data.item._id
        }).get({
          success: res => {
            console.log(res)
            wx.cloud.database().collection('menu').where({
              _id: that.data.item._id
            }).update({
              data: {
                num: res.data[0].num + 1,
                total_star: res.data[0].total_star + that.data.star
              }
            }).then( res => {
              console.log("更新成功")
            })
          },
          fail: res => {
            console.error(res)
          }
        })
        wx.cloud.database().collection('user_star').add({
          data: {
            star: that.data.star,
            dish_id: that.data.item._id,
            loc: app.globalData.userLoc
          },
          success: res => {
            that.setData({
              if_star: true
            });
            app.getStars();
          },
          fail: res => {
            console.error(res)
          }
        })
      } else{
        wx.cloud.init();
        wx.cloud.database().collection('dish_star').where({
          dish_id: that.data.item._id,
          location: app.globalData.userLoc
        }).get({
          success: res => {
            wx.cloud.database().collection('dish_star').where({
              dish_id: that.data.item._id,
              location: app.globalData.userLoc,
            }).update({
              data: {
                total_star: res.data[0].total_star + that.data.star-that.data.prev_star
              }
            }).then( res =>{
              console.log('地区更新成功')
            })
          },
          fail: res => {
            console.error(res)
          }
        })
        wx.cloud.database().collection('menu').where({
          _id: that.data.item._id
        }).get({
          success: res => {
            console.log(res)
            wx.cloud.database().collection('menu').where({
              _id: that.data.item._id
            }).update({
              data: {
                total_star: res.data[0].total_star + that.data.star - that.data.prev_star
              }
            }).then( res => {
              console.log("更新成功")
            })
          },
          fail: res => {
            console.error(res)
          }
        })
        wx.cloud.database().collection('user_star').where({
          dish_id: that.data.item._id,
          _openid: app.globalData.userInfo.openid
        }).remove().then(res => {
          wx.cloud.database().collection('user_star').add({
            data: {
              star: that.data.star,
              dish_id: that.data.item._id
            },
            success: res => {
              that.setData({
                if_star: true
              });
              
              app.getStars();
            },
            fail: res => {
              console.error(res);
            }
          })
        })
      }
    }else{
      wx.showToast({
        title: '请在用户界面登录',
        icon: 'none'
      })
    }
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
    var that = this;
    wx.cloud.init()
    wx.cloud.database().collection('menu').where({
      name: that.data.name
    }).get({
      success: res => {
        
        that.setData({
          item: res.data[0]
        });
        console.log(res.data[0])
        if (that.data.item.num) {
          var average = that.data.item.total_star/that.data.item.num;
          var ave = average.toFixed(1);
          that.setData({
            average_star: ave
          })
        }
        if (app.globalData.userInfo) {
          app.globalData.star.forEach(element => {
            if (element.dish_id == that.data.item._id){
              that.setData({
                if_star: true,
                star: element.star
              });
            }
          });
        }
        wx.cloud.database().collection('comment').where({
          dish_id: this.data.item._id
        }).get({
          success: res => {
             console.log(res);
            // let reverse = new Array(res.data.length);
            // var i = 1;
            // res.data.forEach(element => {
            //   reverse[res.data.length-i]=element;
            //   i = i + 1;
            // });
            var maxnum = 15;
    
            if(res.data.length>=maxnum){
              let reverse = new Array(maxnum);
              var i = res.data.length - 1;
              for(i;i>=res.data.length-maxnum;i--){
                reverse[-1*i+res.data.length-1]=res.data[i]
              }
              that.setData({
                comment: reverse
              })
            }else{
              let reverse = new Array (res.data.length);
              var i = 1;
              res.data.forEach(element => {
                reverse[res.data.length-i] = element;
                i = i + 1;
              })
              console.log(reverse);
              that.setData({
                comment: reverse
              })
            }
          },
          fail: res => {
            console.error(res)
          }
        })
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    });
    
    
  },
  addComment: function (e) {
    // console.log(this.data.item)
    if (app.globalData.userInfo){
      wx.navigateTo({
        url: '../addComment/addComment?dishid=' + e.currentTarget.dataset.id,
      })
    }else {
      wx.showToast({
        title: '请在用户页面登录',
        icon: 'none'
      })
    }
    
    
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