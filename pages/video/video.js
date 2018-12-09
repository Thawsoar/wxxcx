// pages/video/video.js
import {
  VideoModel
} from '../../models/video.js'
import {
  LikeModel
} from '../../models/like.js'
const videoModel = new VideoModel()
const likeModel = new LikeModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let videoList = videoModel.getVideoList()
    videoList.then(res => {
      let data = this._filterVideoData(res)
      this.setData({
        list: data
      })
    })
  },

  _filterVideoData(data) {
    let filterData =  data.itemList.filter(_ =>_.type== 'video')
    return filterData.map(res => {return res.data})
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})