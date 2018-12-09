import {config} from '../config.js'

const tips = {
  1: '抱歉，出现了一个错误',
  1005: 'appkey无效，请前往www.7yue.pro申请',
  3000: '期刊不存在'
}

class HTTP {
  // url method data
  request({url,data={},method='GET', baseUrl=true}) {
    return new Promise((resolve,reject)=> {
      this._request(resolve, reject, url, method, data, baseUrl)
    })
  }
  _request(resolve, reject, url, method = 'GET', data = {}, baseUrl) {
    if(baseUrl) {
       url = config.api_base_url + url
    }
    wx.request({
      url: url,
      method: method,
      data: data,
      header: {
        'content-type': 'application/json',
        'appkey': config.appkey
      },
      success: (res) => {
        if (res.statusCode.toString().startsWith('2')) {
          resolve(res.data)
        }else {
          reject()
          this._show_error(res.data.error_code)
        }
      },
      fail: (err) => {
        reject()
        this._show_error(1)
      }
    })
  }

  _show_error(error_code) {
    if(!error_code) {
      error_code = 1
    }
    const tip = tips[error_code]
    wx.showToast({
      title: tip ? tip : tips[1],
      icon: 'none',
      duration: 2000
    })
  }
}
export {HTTP}