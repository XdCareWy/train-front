// pages/student/add/add.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    idArray: ['大学生', '其他'],
    idIndex: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  formSubmit: function(e) {
    console.log(e.detail.value)
    // todo: 添加到服务器
    wx.navigateBack();
  }
})