App({

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    if(!wx.cloud){
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    }else{
      wx.cloud.init({
        env: 'refectory-demo-2g85xaaud11726ee',
        traceUser: true
      })
    }
    var that = this;
    wx.cloud.callFunction({
      name: 'get_openid',
      success:res => {
        console.log(res)
        that.globalData.openId=res.result.openid;

        wx.cloud.database().collection('users').where({
          _openid: res.result.openid
        }).get({
          success: result=>{
            if (result.data.length){
              that.globalData.userInfo=result.data[0];
              console.log("success login")
              wx.cloud.database().collection('users_loc').where({
                _openid: that.globalData.openId
              }).get({
                success: res => {
                  console.log("loc",res);
                  if(res.data.length){
                    that.globalData.userLoc=res.data[0].loc;
                  }else{
                    wx.showToast({
                      title: '未完善地区信息',
                    })
                  }
                },
              })
              that.getFavorDish();
              that.getStars();
            } else {
              wx.showToast({
                title: '请先在用户页面登录',
                icon: 'none'
              })
            }
            
          },
          fail: result=>{
            console.error(result)
          }
        })
      }
    })
    
  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {
    
  },
  getFavorDish: function () {
    this.globalData.favorDish = null;
    var that = this
    const db = wx.cloud.database({
      env: 'refectory-demo-2g85xaaud11726ee'
    });
    db.collection('dishFavor').where({
      _openid: that.globalData.userInfo.openid
    }).get({
      success: res => {
        console.log(res)
        this.globalData.favorDish=res.data;
        console.log("over",this.globalData.favorDish)
      },
      fail: res => {
        console.error(res)
      }
    })
  },
  getStars: function () {
    this.globalData.star = null;
    var that = this;
    const db = wx.cloud.database({
      env: 'refectory-demo-2g85xaaud11726ee'
    });
    db.collection('user_star').where({
      _openid: that.globalData.userInfo.openid
    }).get({
      success: res => {
        console.log("getstars")
        that.globalData.star = res.data;
      },
      fail: res => {
        console.error(res)
      }
    })
  },
  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {
    
  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {
    
  },
  globalData: {
    favorDish: [],
    openId: '',
    userInfo: null,
    userLoc: null,
    star: []
  }
})
