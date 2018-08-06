// pages/enter/score/score.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: "",
    msgVisible: false,
    msg: "",
    infoVisible: false, // 查询后处理
    type: "BIM技能实操", // 报考类别
    score: 100 //成绩
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  handleBlur: function (e) {
    const { value } = e.detail;
    this.setData({ value: value });
  },
  handleInquire: function () {
    console.log(this.data.value)
    // todo: 发起请求
    if (this.data.value) {
      wx.showModal({
        title: '你输入了以下内容',
        content: this.data.value,
        complete: function() {
          if(!this.data.infoVisible) {
            this.setData({ infoVisible: true });
          }
        }.bind(this)
      })
      // wx.request({
      //   url: '',
      //   method: 'GET',
      //   data: { id: this.data.value },
      //   success: function (res) {
      //     // 处理数据
      //     const { data, statusCode, header } = res;
      //   },
      //   fail: function (res) {
      //     // 处理失败响应
      //   }
      // })
    } else {
      this.setData({ msgVisible: true, msg: "请输入内容" });
      const t = setTimeout(() => {
        this.setData({ msgVisible: false, msg: "" });
        t && clearTimeout(t);
      }, 2000);
    }
  }
})