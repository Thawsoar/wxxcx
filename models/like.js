import { HTTP } from '../utils/http.js'
class LikeModel extends HTTP {
  like(behavior, artID, category) {
    let url = behavior == 'like' ? 'like' : 'like/cancel'
    this.request({
      url: url,
      method: 'POST',
      data: {
        art_id: artID,
        type: category
      }
    })
  }
  getLike(category, artID, sCallBack) {
    let url = `classic/${category}/${artID}`
    this.request({
      url: url,
      success: (res) => {
        sCallBack(res)
      }
    })
  }
}

export {LikeModel}