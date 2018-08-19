// pages/student/add/add.js
import { request} from '../../../utils/util.js';
const {
  BASE_URL
} = getApp().globalData.config;

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
  onLoad: function(options) {
    console.log(wx.getStorageSync('sessionId'))
  },

  formSubmit: function(e) {
    console.log(e.detail.value)
    const {
      name,
      phone,
      idNum,
      identity,
      company
    } = e.detail.value;
    // todo: 添加到服务器
    const data = {
      name: name,
      phone: phone,
      idNum: idNum,
      identity: this.data.idArray[identity],
      company: company
    };
    request({
      url: BASE_URL + '/student/create',
      data: data,
      method: 'POST',
      success: function(res) {
        const {
          code
        } = res.data;
        if (code === '0') {
          wx.showToast({
            title: '添加成功',
          });
          wx.navigateBack();
        }
      },
      fail: function(e) {
        console.log(e);
      }
    });
  }
})