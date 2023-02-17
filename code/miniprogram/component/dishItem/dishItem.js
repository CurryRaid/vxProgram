// component/dishItem/dishItem.js
const app= getApp()
Component({
  
  properties: {
    item: {
      type:Object,
      value:{}
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    favor: false,
    counterId: ''
  },
  pageLifetimes: {
    show: function (params) {
      console.log("onshow");
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    handleFavor: function () {
      var that = this;
      if (app.globalData.userInfo){
        console.log(app.globalData.favorDish);
        var flag = 0;
        app.globalData.favorDish.forEach(element => {
          if (element.dishName == this.properties.item.name) {
            flag = 1;
            that.setData({
              favor: true
            })
          }
        });
        if (flag == 0) {
          that.setData({
            favor: false
          })
        }
        if (this.data.favor) {
          this.favorDish();
        }else {
          this.disfavorDish();
        }
        this.setData({
          favor: true
        })
        
      }else{
        wx.showToast({
          title: '请先在用户界面登录',
          icon: 'none'
        })
      }
      
    },
    favorDish: function () {
      wx.showToast({
        title: '已添加至列表',
      })
      console.log("duplicate")
    },
    disfavorDish: function () {
        var that = this;
        const db=wx.cloud.database({
          env :'refectory-demo-2g85xaaud11726ee'
        });
        db.collection('dishFavor').add({
          data: {
            dishName: that.properties.item.name,
            loc: that.properties.item.location,
            price: that.properties.item.price
          },
          success: res => {
            wx.showToast({
              title: '加入成功',
            })
            app.getFavorDish();
          },
          fail: res => {
            wx.showToast({
              title: '加入失败',
              icon: 'none'
            })
            console.error("数据库删除记录失败",err)
          }
        });
        app.getFavorDish();
    }
  }
})
