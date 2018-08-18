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
    courses: []
  },
  onLoad: function() {
    console.log(BASE_URL)
    this.getCourseData()
  },
  onShow: function() {

  },
  handleEnter: function(event) {
    const cardId = event.currentTarget.id;
    console.log(cardId)
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