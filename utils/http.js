import {config} from '../config.js'

const tips = {
  1: '抱歉，出现了一个错误',
  1005: 'appkey无效，请前往www.7yue.pro申请',
  3000: '期刊不存在'
}

class HTTP {
  // url method data
  request(params) {
    if(!params.method) {
      params.method = 'GET'
    }
    wx.request({
      url: config.api_base_url + params.url,
      method: params.method,
      data: params.data,
      header: {
        'content-type': 'application/json',
        'appkey': config.appkey
      },
      success: (res) => {
        if (res.statusCode.toString().startsWith('2')) {
          params.success && params.success(res.data)
        }else {
          this._show_error(res.data.error_code)
        }
      },
      fail: (err) => {
        this._show_error(1)
      }
    })
  }

  _show_error(error_code) {
    if(!error_code) {
      error_code = 1     
    }
    const tip = tips[error_code]
    if(error_code == 1) {
      wx.showModal({
        title: '提示',
        content: config.err,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })     
    } else {
      wx.showToast({
        title: tip,
        icon: 'none',
        duration: 2000
      })
    }
   
  }
}
export {HTTP}