// pages/enter/gradeEnter.js
const {
  BIM_LEVEL,
  CAD_LEVEL,
  BIM_APPLY
} = getApp().globalData.enterType;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [{
        id: 1,
        name: '3',
        value: '3人班',
        checked: 'true'
      },
      {
        id: 2,
        name: '5',
        value: '5人班'
      },
      {
        id: 3,
        name: '10',
        value: '10人班'
      }
    ],
    examineType: [{
        id: 0,
        name: 'BIM一级'
      },
      {
        id: 1,
        name: '二级建筑'
      },
      {
        id: 2,
        name: '二级结构'
      },
      {
        id: 3,
        name: '二级设备'
      }
    ],
    exampleIndex: 0,
    idArray: ['大学生', '其他'],
    idIndex: 0,
    msg: "",
    user: {
      id: 1,
      name: "张旭东"
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // id: 1-BIM等级考试；2-CAD等级考试；3-BIM技能应用
    let cardId = options.id;
    let examineType = [];
    switch (+cardId) {
      case BIM_LEVEL:
        examineType = [{
            id: 0,
            name: 'BIM一级'
          },
          {
            id: 1,
            name: '二级建筑'
          },
          {
            id: 2,
            name: '二级结构'
          },
          {
            id: 3,
            name: '二级设备'
          }
        ];
        break;
      case CAD_LEVEL:
        examineType = [{
          id: 0,
          name: 'CAD一级'
        }];
        break;
      case BIM_APPLY:
        examineType = [{
            id: 0,
            name: 'Revit基础与提高'
          },
          {
            id: 1,
            name: '案例实操'
          },
          {
            id: 2,
            name: 'Revit基础与提高+案例实操'
          }
        ];
        break;
      default:
        examineType = [{
            id: 0,
            name: 'BIM一级'
          },
          {
            id: 1,
            name: '二级建筑'
          },
          {
            id: 2,
            name: '二级结构'
          },
          {
            id: 3,
            name: '二级设备'
          }
        ];;
    }
    this.setData({
      examineType: examineType,
    })
  },
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      exampleIndex: e.detail.value
    })
  },
  bindIdPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      idIndex: e.detail.value
    })
  },
  showErrorMsg: function(filed, msg) {
    if (filed === "" || filed.length === 0) {
      this.setData({
        msgVisible: true,
        msg: msg
      });
      const t = setTimeout(() => {
        this.setData({
          msgVisible: false,
          msg: ""
        });
        t && clearTimeout(t);
      }, 2000);
      return false;
    }
    return true;
  },
  formSubmit: function(e) {
    const requireFiled = ["name", "phone", "idCard", "idType", "address", "exampleType"];
    const requireValue = {
      name: "姓名不能为空",
      phone: "手机号不能为空",
      idCard: "身份证号码不能为空",
      idType: "选择身份",
      address: "请填写单位地址",
      exampleType: "选择考试类别"
    };
    const data = e.detail.value;
    const {
      name,
      phone,
      idCard,
      idType,
      address,
      exampleType
    } = data;
    for (let k in data) {
      let r = requireFiled.includes(k) && this.showErrorMsg(data[k], requireValue[k]);
      if (!r) {
        return;
      }
    }
    console.log(data);

    wx.showModal({
      title: '表单信息',
      content: JSON.stringify(data),
    })
    // todo: 发送请求
    // wx.request({
    //   url: '',
    //   method: 'POST',
    //   data: data,
    //   success: function ({ data, statusCode}) {
    //     // todo: 处理数据
    //     console.log(statusCode, data)
    //   },
    //   fail: function(res) {
    //     // todo: 处理错误
    //   }
    // })
  },
  handleStudentTap: function() {
    wx.navigateTo({
      url: '../student/list/list',
    })
  }
})