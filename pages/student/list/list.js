// pages/student/list/list.js
import request from '../../../utils/util.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [{
      id: 1,
      name: "张旭东"
    }, {
      id: 2,
      name: "刘柏"
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    console.log('onLoad')
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

    console.log('onReady')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    console.log('show')
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

    console.log('hide')
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },
  /**
   * 跳转到新增学员页面
   */
  jumpAddStudent: function() {
    wx.navigateTo({
      url: '../add/add',
    })
  },
  /**
   * 请求学员数据
   */
  getStudents: function() {
    request({
      url: '',
    })
  }
})