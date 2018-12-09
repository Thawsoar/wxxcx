import { HTTP } from '../utils/http.js'

class ClassicModel extends HTTP {
  getLatest(sCallback) {
    this.request({
      method: 'GET',
      url: 'classic/latest',
      success: (res) => {
        sCallback(res)
        this._setLatestIndex(res.index)
        let key = this._getKey(res.index)
        wx.setStorageSync(key,res)
      }
    })
  }
  getClassic(index, nextOrPrevious,sCallback) {
    let key = nextOrPrevious == 'next' ? this._getKey(index + 1) : this._getKey(index - 1)
    let classic = wx.getStorageSync(key)
    if(!classic) {
      this.request({
        url: `classic/${index}/${nextOrPrevious}`,
        success: (res) => {
          wx.setStorageSync(this._getKey(res.index), res)
          sCallback(res)
         
        }
      })
    }
    else {
      sCallback(classic)
    }
  
  }
  isFirst(index) {
    return index == 1 ? true : false
  }

  isLatest(index) {
    let latestIndex = this._getLatestIndex()
    return index == latestIndex ? true : false
  }

  _setLatestIndex (index) {
    wx.setStorageSync('latestIndex', index)
  }

  _getLatestIndex () {
    return wx.getStorageSync('latestIndex')
  }
  _getKey(index) {
    return 'classic' + index
  }
}

export {ClassicModel}