// pages/enter/gradeEnter.js
const {
  BIM_LEVEL,
} = getApp().globalData.enterType;
const {
  BASE_URL
} = getApp().globalData.config;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    courseTypeMappings: {}, // 报考类别Map
    classTypeMappings: {}, // 班级人数Map
    products: [], // 所有的课程
    classesArr: [], // 班级人数（做渲染）
    classCheckedKey: "", // 班级人数，默认的key
    courses: [], // 考试类别（做渲染）
    coursesCheckedKey: 0, // 考试类别，默认可以
    // idArray: ['大学生', '其他'],
    // idIndex: 0,
    result: {
      code: '',
      name: '',
      feeDesc: '',
    },
    msg: "",
    user: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // courseClassify: 1-BIM等级考试；2-CAD等级考试；3-BIM技能应用
    let courseClassify = options.id || BIM_LEVEL;
    this.getCourseData(courseClassify);
    this.setData({
      courseClassify: courseClassify,
    })
  },

  onShow: function() {
    console.log(this.data.user)
  },
  /**
   * 考试类别Tap
   */
  bindPickerChange: function(e) {
    const val = e.detail.value;
    console.log('picker发送选择改变，携带值为', val)
    const {
      courses,
      courseTypeMappings
    } = this.data;
    const classesArr = courseTypeMappings[courses[val].key];
    const key = this.getNewClassKey(val)
    this.setData({
      coursesCheckedKey: val,
      classesArr: classesArr,
      classCheckedKey: key,
      result: this.getProduct(courses[+val].key, key)
    })
  },
  /**
   * 班级人数Tap
   */
  radioChange: function(e) {
    const val = e.detail.value;
    const {
      classesArr,
      classTypeMappings,
      products,
      courses,
      coursesCheckedKey,
    } = this.data;

    const key = this.getNewCourseKey(val);
    const newCourses = classTypeMappings[val];
    this.setData({
      courses: newCourses,
      classCheckedKey: val,
      coursesCheckedKey: key,
      result: this.getProduct(newCourses[key].key, val)
    });
  },
  // bindIdPickerChange: function(e) {
  //   console.log('picker发送选择改变，携带值为', e.detail.value)
  //   this.setData({
  //     idIndex: e.detail.value
  //   })
  // },

  /**
   * 获取最新的考试类别key
   * @param classType 班级人数
   */
  getNewCourseKey: function(classType) {
    const {
      classTypeMappings,
      courses,
      coursesCheckedKey,
    } = this.data;

    const newCourses = classTypeMappings[classType];
    const oldKey = courses[coursesCheckedKey].key;
    const flag = newCourses.some(item => item.key === oldKey);
    let key = 0;
    newCourses.forEach((item, index) => {
      if (item.key === oldKey) {
        key = index;
      }
    });
    return key;
  },

  /**
   * 获取最新的班级人数key
   */
  getNewClassKey: function(courseType) {
    const {
      courseTypeMappings,
      classesArr,
      classCheckedKey,
      courses,
    } = this.data;
    const newClassArr = courseTypeMappings[courses[courseType].key];
    console.log(newClassArr)
    console.log(classCheckedKey)
    const flag = newClassArr.some(item => item.key === classCheckedKey);
    return flag ? classCheckedKey : newClassArr[0].key;
  },

  /**
   * 根据考试类别和班级人数确定课程
   * @param ex: 考试类别
   * @param num: 班级人数
   */
  getProduct: function(ex, num) {
    const {
      products
    } = this.data;
    const res = products.filter(item => {
      const {
        classType,
        courseType
      } = item;
      if (ex === courseType && num === classType) {
        return item;
      }
    });
    return res[0];
  },


  /**
   * 错误消息统一处理函数
   * @param filed: 校验字段
   * @param msg: 提示消息
   */
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
    // const requireFiled = ["name"];
    // const requireValue = {
    //   name: "姓名不能为空",
    // };
    const data = e.detail.value;
    // const {
    //   name
    // } = data;
    // for (let k in data) {
    //   let r = requireFiled.includes(k) && this.showErrorMsg(data[k], requireValue[k]);
    //   if (!r) {
    //     return;
    //   }
    // }
    console.log(data);

    wx.showModal({
      title: '表单信息',
      content: JSON.stringify(data),
    })
  },
  /** 选择学员 */
  handleStudentTap: function() {
    const {
      courseClassify
    } = this.data;
    wx.navigateTo({
      url: '../student/list/list?id=' + courseClassify,
    })
  },
  getCourseData: function(courseClassify) {
    wx.request({
      url: `${BASE_URL}/product/course/classify/detail`,
      method: 'GET',
      data: {
        courseClassify: courseClassify
      },
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
            const {
              courseTypeMappings,
              classTypeMappings,
              products
            } = list;
            const classesArr = courseTypeMappings[products[0].courseType];
            const courses = classTypeMappings[products[0].classType];
            this.setData({
              products: products,
              courseTypeMappings: courseTypeMappings,
              classTypeMappings: classTypeMappings,
              classesArr: classesArr,
              courses: courses,
              classCheckedKey: classesArr[0].key,
              coursesCheckedKey: 0,
              result: products[0]
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