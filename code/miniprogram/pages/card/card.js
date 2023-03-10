const marginHori = 74
const marginVerti = 100

const app = getApp()

Page({

  data: {
    favorDish: [],
    animation1: {},
    animation2: {},

    top1: marginVerti,
    left1: marginHori,
    top2: marginVerti,
    left2: marginHori,
    topp1: null,
    topp2: null,
    startX: 0,
    startY: 0,

    count1: 0,
    count2: 1,

    name1: "",
    location1: "",
    name2: "",
    location2: "",

    windowWidth: 0,
    windowHeight: 0,

    isFirstCard: true,
    isFirstInit: true,

    data: [],

    count: 0,

  },


  onLoad: function (options) {

    var that = this;
    this.setData({
      favorDish: app.globalData.favorDish
    });
    console.log(this.data.favorDish)
    if (this.data.favorDish.length>0) {
      wx.getSystemInfo({
        success: function (res) {
          console.log(res)
          that.setData({
            windowWidth: res.windowWidth,
            windowHeight: res.windowHeight
          })
        }
      })
  
      that.requestMenu()
    }

  },


  onReady: function () { },


  onShow: function () { },

  viewTouchInside: function (event) {

    var that = this

    var pointX = event.touches[0].clientX
    var pointY = event.touches[0].clientY

    that.setData({
      startX: pointX,
      startY: pointY
    })

    var animation = wx.createAnimation({
      duration: 100,
      timingFunction: 'ease-out',
    })
    animation.scale(0.6).step()

    if (that.data.isFirstCard == true) {
      that.setData({
        animation1: animation.export()
      })
    } else {
      that.setData({
        animation2: animation.export()
      })
    }

  },


  viewDidMove: function (event) {
    
    var that = this

    var pointX = event.touches[0].clientX
    var pointY = event.touches[0].clientY

    var widthCenter = that.data.windowWidth / 2
    var heightCenter = that.data.windowHeight / 2

    var perX = (pointX - that.data.startX) / widthCenter
    var perY = (pointY - that.data.startY) / heightCenter
    var maxPer = (Math.abs(perX) > Math.abs(perY)) ? Math.abs(perX) : Math.abs(perY)


    var animationOpacity = wx.createAnimation({
      duration: 100,
      timingFunction: 'ease-out',
    })
    animationOpacity.opacity(maxPer).step()

    var animationRotate = wx.createAnimation({
      duration: 100,
      timingFunction: 'ease-out',
    })
    animationRotate.scale(0.9).rotate(perX * 20).step()

    var x = marginHori + pointX - that.data.startX
    var y = marginVerti + pointY - that.data.startY

    if (that.data.isFirstCard == true) {
      that.setData({
        left1: x,
        top1: y
      })
      that.setData({
        animation1: animationRotate.export(),
        animation2: animationOpacity.export()
      })
    } else {
      that.setData({
        left2: x,
        top2: y
      })
      that.setData({
        animation1: animationOpacity.export(),
        animation2: animationRotate.export(),
      })
    }
  },


  viewTouchUpDownInside: function (event) {

    var that = this

    var endX = event.changedTouches[0].clientX
    var endY = event.changedTouches[0].clientY

    var distanceX = endX - that.data.startX
    var distanceY = endY - that.data.startY

    if (distanceX > 93.75) {
      that.removeCard('right')
    } else if (distanceX < -93.75) {
      that.removeCard('left')
    } else if (distanceY < -100) {
      that.removeCard('up')
    } else if (distanceY > 100) {
      that.removeCard('down')
    }

    if (distanceX < 93.75 && distanceX > -93.75 && distanceY > -150 && distanceY < 150) {
      if (that.data.isFirstCard == true) {
        that.setData({
          top1: marginVerti,
          left1: marginHori
        })
      } else {
        that.setData({
          top2: marginVerti,
          left2: marginHori
        })
      }
    }

    var animation = wx.createAnimation({
      duration: 100,
      timingFunction: 'ease-out',
    })
    animation.scale(1).step()

    if (that.data.isFirstCard == true) {
      that.setData({
        animation1: animation.export()
      })
    } else {
      that.setData({
        animation2: animation.export()
      })
    }

    if (that.data.data.length - that.data.count < 5) {
      that.requestMenu()
    }
  },

  removeCard: function (direction) {

    var that = this

    var animation = wx.createAnimation({
      duration: 250,
      timingFunction: 'linear',
    })

    if (direction == 'right') {
      animation.translateX(400).rotate(45).opacity(0).step()
      animation.translateX(0).rotate(0).step()
    } else if (direction == 'left') {
      animation.translateX(-400).rotate(-45).opacity(0).step()
      animation.translateX(0).rotate(0).step()
    } else if (direction == 'up') {
      animation.translateY(-400).opacity(0).step()
      animation.translateY(0).step()
    } else if (direction == 'down') {
      animation.translateY(400).opacity(0).step()
      animation.translateY(0).step()
    }
    
    if (that.data.isFirstCard == true) {
      that.setData({
        animation1: animation.export(),
        count1: that.data.count1 + 2,
        count: that.data.count + 1,
        name1: that.data.data[that.data.count1 + 2]["name"],
        //isLike1: that.data.data[that.data.count1 + 2]["is_like"],
        location1: that.data.data[that.data.count1 + 2]["location"],
        isFirstCard: false,
        topp1: that.data.data[that.data.count1 + 2]["topp1"]
      })

      setTimeout(function () {
        that.setData({
          top1: marginVerti,
          left1: marginHori
        })
      }.bind(that), 250)
    } else {
      that.setData({
        animation2: animation.export(),
        count2: that.data.count2 + 2,
        count: that.data.count + 1,
        name2: that.data.data[that.data.count2 + 2]["name"],
        // isLike2: that.data.data[that.data.count2 + 2]["is_like"],
        location2: that.data.data[that.data.count2 + 2]["location"],
        isFirstCard: true,
        topp2: that.data.data[that.data.count2 + 2]["topp1"]
      })

      setTimeout(function () {
        that.setData({
          top2: marginVerti,
          left2: marginHori
        })
      }.bind(that), 100)

      //that.setImgURL()
    }
  },
  deleteFavor: function () {
    // console.log(this.data.topp1,this.data.topp2);
    var that = this;
    var url_id = this.data.topp2;
    if (this.data.isFirstCard) {
      url_id = this.data.topp1
    }
    wx.cloud.init();
    wx.cloud.database().collection('dishFavor').doc(url_id).remove({
      success: res => {
        wx.showToast({
          title: '????????????',
        })
        console.log(this.data.favorDish)
        app.globalData.favorDish = null;
        wx.cloud.init();
        wx.cloud.database().collection('dishFavor').where({
        _openid: app.globalData.userInfo.openid
        }).get({
          success: res=> {
            console.log(res)
            app.globalData.favorDish=res.data;
            console.log("over",app.globalData.favorDish)
            that.setData({
              favorDish: app.globalData.favorDish
            })
            console.log(that.data.data)
            if (that.data.favorDish.length > 0){
              that.setData({
                data: [],
                isFirstCard: true,
                isFirstInit: true,
                animation1: {},
                animation2: {},
                count: 0,
                count1: 0,
                count2: 1
              });
              that.requestMenu();
            }
          },
          fail: res => {
            console.error(res)
          }
        })
        
        // that.setData({
        //   favorDish: app.globalData.favorDish
        // });
      },
      fail: res => {
        console.log("error",res)
      }
    })
  },
  // likeImgDidClick: function() {
  //   var that = this
  //   that.requestLike()
  // },


  // setImgURL: function() {
  //   var that = this

  //   if (that.data.isLike1 == true) {
  //     that.setData({
  //       likeImgURL1: "../../images/icon_like_hl.png",
  //     })
  //   } else {
  //     that.setData({
  //       likeImgURL1: "../../images/icon_like.png",
  //     })
  //   }
  //   if (that.data.isLike2 == true) {
  //     that.setData({
  //       likeImgURL2: "../../images/icon_like_hl.png",
  //     })
  //   } else {
  //     that.setData({
  //       likeImgURL2: "../../images/icon_like.png",
  //     })
  //   }
  // },

  // requestLike: function () {

  //   var that = this

  //   var newData = that.data.data
    
  //   newData[that.data.count]["is_like"] = !newData[that.data.count]["is_like"]

  //   that.setData({
  //     data: newData,
  //   })

  //   if (that.data.isFirstCard == true) {
  //     that.setData({
  //       isLike1: !that.data.isLike1
  //     })
  //   } else {
  //     that.setData({
  //       isLike2: !that.data.isLike2
  //     })
  //   }

  //   //that.setImgURL()

  //   //var noticeMsg = (newData[that.data.count]["is_like"] == true ? "????????????" : "????????????")

  //   wx.showToast({
  //     title: noticeMsg,
  //     duration: 1000,
  //     icon: 'success',
  //   })
  // },

  requestMenu: function () {

    var that = this
    that.pushData()

  },

  pushData: function () {
    var that = this

    var newData = that.data.data
    var favor_length = that.data.favorDish.length;
    console.log(that.data.favorDish);
    var favor = that.data.favorDish;
    // var dish = { "dish_id": 0, "name": "??????" + that.data.data.length.toString(), "location": "??????" }
    var dish;
    //newData.push(dish)
    for (var i = 0; i < 5; i++) {
      // dish = { "dish_id": that.data.data.length.toString(), "is_like": false, "name": "??????" + that.data.data.length.toString(), "location": "??????" + that.data.data.length.toString(), "is_like": (i % 2 == 0 ? false : true) }
      // newData.push(dish)
      for (var j = 0; j<favor_length; j++){
        dish = {
          "dish_id": (j+1).toString(),
          "name": favor[j].dishName,
          "location": favor[j].dishName,
          "topp1": favor[j]._id,
        }
        newData.push(dish)
      }
    }
    console.log(that.data.data)
    if (that.data.isFirstInit == true) {
      that.setData({
        data: newData,
        name1: newData[that.data.count]["name"],
        name2: newData[that.data.count + 1]["name"],
        location1: newData[that.data.count]["location"],
        location2: newData[that.data.count + 1]["location"],
        //isLike1: newData[that.data.count]["is_like"],
        //isLike2: newData[that.data.count + 1]["is_like"],
        isFirstInit: false,
        topp1: newData[that.data.count]["topp1"],
        topp2: newData[that.data.count+1]["topp1"]
      })

      // that.setImgURL()
    }

  }

})
