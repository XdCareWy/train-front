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
    students: [],
    flag: '',
    visible: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if ('flag' in options) {
      this.setData({
        flag: options.flag
      });
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.getStudents();
  },

  /** 选择学员事件 */
  handleSelect: function(e) {
    const {
      flag
    } = this.data;
    const studentId = e.target.id;
    const selectStudent = this.data.students.filter(item => +item.id === +studentId);
    if (flag === 'myInfo') {
      const params = {
        isEdit: true,
        student: selectStudent[0]
      };
      wx.navigateTo({
        url: '../add/add?params=' + JSON.stringify(params),
      })
    } else {
      const currPage = getCurrentPages();
      const prevPage = currPage[currPage.length - 2];
      prevPage.setData({
        user: selectStudent[0]
      });
      wx.navigateBack();
    }
  },
  /**
   * 跳转到新增学员页面
   */
  jumpAddStudent: function() {
    wx.navigateTo({
      url: '../add/add',
    })
  },
  modalCancel: function(e) {
    this.setData({
      visible: false
    })
  },
  modalOk: function(e) {
    this.setData({
      visible: false
    });
    const userInfo = e.detail.us;
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
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
              console.info('++++++++++++++++++++++++++++', data.sessionId)
              wx.setStorageSync('sessionId', data.sessionId);
              this.getStudents();
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
        } else if (code === '401') {
          this.setData({
            visible: true
          });
        }
      }
    })
  }
})