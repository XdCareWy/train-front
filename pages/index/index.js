//index.js
const { BIM_LEVEL, CAD_LEVEL, BIM_APPLY, MY_SCORE, GROUP, MY_SUBJECT } = getApp().globalData.enterType;
const {BASE_URL} = getApp().globalData.config;

Page({
  data: {
    course: []
  },
  onLoad: function () {
    console.log(BASE_URL)
    this.getCourseData()
  },
  onShow: function () {

  },
  handleEnter: function (event) {
    const cardId = event.currentTarget.id;
    let navigateUrl = "";
    switch (+cardId) {
      case BIM_LEVEL:
      case CAD_LEVEL:
      case BIM_APPLY:
        navigateUrl = '../enter/gradeEnter?id=' + cardId;
        break;
      case MY_SCORE:
        navigateUrl = '../enter/score/score';
        break;
      case GROUP:
      case MY_SUBJECT:
        wx.showToast({
          title: '暂未开放',
          icon: "loading"
        })
        break;
    }
    if (navigateUrl) {
      wx.navigateTo({
        url: navigateUrl,
      })
    }
  },
  getCourseData: function () {
    wx.request({
      url: BASE_URL + "/course/classify",
      success: (req) => {
        console.log(req)
      }
    })
  }
})
