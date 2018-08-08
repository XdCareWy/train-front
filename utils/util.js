const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const request = params => {
  const { url, success, fail, complete, method='get', data } = params;
  if(url) {
    wx.request({
      url: url,
      data: data,
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'sessionId': wx.getStorageSync('sessionId')
      },
      success: function(res) {
        success && success(res);
      },
      fail: function(e) {
        fail && fail(e);
        console.log(e.errMsg);
        wx.showToast({
          title: '网络信号较差',
          icon: 'loading',
          duration: 3000
        });
      },
      complete: function() {
        complete && complete();
      }
    })
  }else {
    console.log('url is required!');
    return false;
  }

};

module.exports = {
  formatTime: formatTime,
  request: request
}
