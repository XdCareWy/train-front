//index.js
const {
  BIM_LEVEL,
  CAD_LEVEL,
  BIM_APPLY
} = getApp().globalData.enterType;
const {
  BASE_URL
} = getApp().globalData.config;

Page({
  data: {
    courses: [],
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function() {
    this.getCourseData()
  },
  bindGetUserInfo: function(e) {
    console.log(e.detail.userInfo)
  },
  onShow: function() {

  },
  /**
   * 点击某个课程事件
   */
  handleEnter: event => {
    const userInfo = event.detail.userInfo;
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(res)
        wx.request({
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          url: BASE_URL + "/login",
          method: 'POST',
          data: {
            code: res.code,
            ...userInfo
          },
          success: res => {
            const {
              code,
              data,
              msg
            } = res.data;
            if (code === '0') {
              console.info('++++++++++++++++++++++++++++', data.result.openid)
              wx.setStorageSync('sessionId', data.result.openid);
              const cardId = event.currentTarget.id;
              let navigateUrl = "";
              switch (cardId) {
                case BIM_LEVEL:
                case CAD_LEVEL:
                case BIM_APPLY:
                  navigateUrl = '../enter/gradeEnter?id=' + cardId;
                  break;
              }
              if (navigateUrl) {
                wx.navigateTo({
                  url: navigateUrl,
                })
              }
            } else {
              wx.showToast({
                title: msg,
                icon: 'loading'
              })
            }
          }
        })
      }
    })
  },
  /**
   * 获取课程分类信息
   */
  getCourseData: function() {
    wx.request({
      url: BASE_URL + "/product/course/classify",
      success: ({
        data,
        statusCode
      }) => {
        if (statusCode === 200) {
          const {
            code,
            data: {
              courseClassifyList
            }
          } = data;
          if (code === '0') {
            this.setData({
              courses: courseClassifyList
            });
          }
        }
      }
    })
  }
})