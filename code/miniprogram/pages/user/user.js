// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    users: {},
    userloc: '',
    list:[
      {
        icon: "images/test.png",
        title: "关于我们",
        click: "about"
      }, {
        icon: "images/update.png",
        title: "更新日志",
        click: "journal"
      }, {
        icon: "images/aboutUs.png",
        title: "意见&建议",
        click: "login"
      }
    
    ],
    userInfo:[
      {
        icon: "images/class.png",
        title: "下一餐备忘录",
        littleTitle: "",
        click: "favor"
      },
      {
        icon: "images/academy.png",
        title: "看看大家吃啥",
        littleTitle: "",
        click: "rank"
      }
    ]
  },
  onLoad() {
    if(app.globalData.userInfo){
      this.setData({
        users: app.globalData.userInfo
      })
    }
    if(app.globalData.userLoc){
      this.setData({
        userloc: app.globalData.userLoc
      })
    }
  },
  improveInfo: function () {
    wx.navigateTo({
      url: '../info/info',
    })
  },
  getUserProfile: function () {
    wx.getUserProfile({
      desc: '收集用户信息',
      success: res => {
        console.log(res)
        this.setData({
          users: res.userInfo
        })
        var user = res.userInfo;
        app.globalData.userInfo = user;
        wx.cloud.init();
        wx.cloud.database().collection('users').add({
          data: {
            avatarUrl: user.avatarUrl,
            nickName: user.nickName
          },
          success: res => {
            console.log(res)
            wx.showToast({
              title: '登录成功',
            });
            wx.navigateTo({
              url: '../info/info',
            })
          }
        })

      },
      fail: res=> {
        console.error(res)
      }
      
    })
    console.log("finish")
  },
  onShow:function (options) {
    if(app.globalData.userInfo){
      this.setData({
        users: app.globalData.userInfo
      })
    }
    if(app.globalData.userLoc){
      this.setData({
        userloc: app.globalData.userLoc
      })
    }
  },
  favor(e){
    if(app.globalData.userInfo){
      wx.navigateTo({
        url: '../card/card',
      })
    }else{
      wx.showToast({
        title: '请登录',
        icon: 'none'
      })
    }
  },
  rank(e){
    if (app.globalData.userInfo && app.globalData.userLoc) {
      wx.navigateTo({
        url: '../rank/rank',
      })
    } else {
      wx.showToast({
        title: '请完善登录信息',
        icon: 'none'
      })
    }
    
  },
  about(e){
    wx.navigateTo({
      url: '../aboutus/aboutus',
    })
  },
  journal(e){
    console.log(e)
    console.log("暂无:D")
  },
  login(e){
    wx.navigateTo({
      url: '/pages/advise/advise',
    })
  }
 })
