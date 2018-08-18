// pages/person/personal.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    defaultHeaderPng: "../../assets/my.png",
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    const us = getApp().globalData.userInfo;
    if (us) {
      this.setData({
        userInfo: us,
        hasUserInfo: true
      })
    }

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },
  handleStudentTap: function() {
    wx.navigateTo({
      url: '../student/list/list',
    })
  },
  handleOrderTap: function() {
    wx.navigateTo({
      url: '../order/list/list',
    })
  },
  toLogin: function(e) {
    getApp().globalData.userInfo = e.detail.userInfo;
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    });
  }
})