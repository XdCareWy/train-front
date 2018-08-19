// pages/student/add/add.js
import {
  request
} from '../../../utils/util.js';
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
    student: {
      name: '',
      phone: '',
      idNum: '',
      company: ''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if ('params' in options) {
      const {
        isEdit,
        student
      } = JSON.parse(options.params);
      isEdit && wx.setNavigationBarTitle({
        title: '编辑学员',
      });
      console.log(this.data.idArray.indexOf(student.identity))
      this.setData({
        student: student,
        idIndex: this.data.idArray.indexOf(student.identity)
      })
    }
  },

  formSubmit: function(e) {
    console.log(e.detail.value)
    const {
      id,
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
    let url = '/student/create';
    if (id && id !== '') {
      url = '/student/edit';
      data.id = id;
    }
    request({
      url: BASE_URL + url,
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