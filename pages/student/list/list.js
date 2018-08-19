// pages/student/list/list.js
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
    students: []
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

    console.log('onReady')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.getStudents();
    console.log('student show')
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

    console.log('student hide')
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },
  /** 选择学员事件 */
  handleSelect: function(e) {
    const studentId = e.target.id;
    const selectStudent = this.data.students.filter(item => +item.id === +studentId);
    console.log(selectStudent[0])
    const currPage = getCurrentPages();
    const prevPage = currPage[currPage.length - 2];
    prevPage.setData({user: selectStudent[0]});
    wx.navigateBack();
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
      url: BASE_URL + '/student/user/get',
      success: res => {
        const {
          code,
          data,
          msg
        } = res.data;
        if (code === '0') {
          this.setData({
            students: data.studentList
          });
        } else {
          console.log(msg);
        }
      }
    })
  }
})