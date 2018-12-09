import { HTTP } from '../utils/http-p.js'

class VideoModel extends HTTP {
  getVideoList() {
    return this.request({
      url: 'http://baobab.kaiyanapp.com/api/v4/tabs/selected',
      baseUrl: false
    })
  }
  
}
export { VideoModel }