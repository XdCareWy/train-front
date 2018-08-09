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
    courseTypeMappings: {},
    classTypeMappings: {},
    products: [],
    classesArr: [],
    classCheckedKey: "",
    courses: [],
    coursesCheckedKey: 0,
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
    this.getCourseData();

    // id: 1-BIM等级考试；2-CAD等级考试；3-BIM技能应用
    let cardId = options.id;
    let examineType = [];
    switch (+cardId) {
      case BIM_LEVEL:

        break;
      case CAD_LEVEL:

        break;
      case BIM_APPLY:

        break;
      default:

    }
  },
  bindPickerChange: function(e) {
    const val = e.detail.value;
    console.log('picker发送选择改变，携带值为', val)
    const {
      courses,
      courseTypeMappings
    } = this.data;
    const classesArr = courseTypeMappings[courses[val].key];
    this.setData({
      coursesCheckedKey: val,
      classesArr: classesArr,
      classCheckedKey: classesArr[0].key
    })
  },
  radioChange: function(e) {
    const val = e.detail.value;
    const {
      classesArr,
      classTypeMappings
    } = this.data;
    console.log(val)
    this.setData({
      courses: classTypeMappings[val],
      classCheckedKey: val,
      coursesCheckedKey: 0
    });
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
  },
  getCourseData: function() {
    wx.request({
      url: 'https://easy-mock.com/mock/5b698e437059a355fd430849/train/course/classify',
      method: 'GET',
      success: ({
        data,
        statusCode
      }) => {
        if (statusCode === 200) {
          const {
            code,
            data: list
          } = data;
          if (code === '0') {
            console.log(list);
            const {
              courseTypeMappings,
              classTypeMappings,
              products
            } = list;
            const classesArr = courseTypeMappings[products[0].courseType];
            const courses = classTypeMappings[products[0].classType];
            console.log(classesArr);
            console.log(courses)
            this.setData({
              courseTypeMappings: courseTypeMappings,
              classTypeMappings: classTypeMappings,
              classesArr: classesArr,
              courses: courses,
              classCheckedKey: classesArr[0].key,
              coursesCheckedKey: 0
            });
          }
        }
      },
      fail: function(e) {
        console.log(e)
      }
    })
  },

})