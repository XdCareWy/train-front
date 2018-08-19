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