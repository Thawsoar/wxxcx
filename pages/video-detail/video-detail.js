// pages/video-detail/video-detail.js
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
    otherList: [],
    details: null,
    playing: false,
    pauseSrc: 'images/player@pause.png',
    playSrc: 'images/player@play.png',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading()
    let vid = options.vid
    let videoList = videoModel.getVideoList()
    videoList.then(res => {
      let data = this._filterVideoData(res)
      this.setData({
        details: data.filter(_=>_.id == vid)[0],
        otherList: data.filter(_ => _.id != vid)
      })
      wx.hideLoading()
    })
  },
  onPageScroll(e) {
    // console.log(e.scrollTop)
  },
  onSwitch(event) {
    let vid = event.detail.vid
    let currentDtails = this.data.otherList.filter(_ => _.id == vid)[0]
    let currentOtherList = this.data.otherList.filter(_ => _.id != vid)
    currentOtherList.push(this.data.details)
    this.setData({
      details: currentDtails,
      otherList: currentOtherList
    })
    this.bindPlay()
  },
  _filterVideoData(data) {
    let filterData = data.itemList.filter(_ => _.type == 'video')
    return filterData.map(res => { return res.data })
  },
  bindInputBlur: function (e) {
    this.inputValue = e.detail.value
  },
  bindPlay: function () {
    this.setData({
      playing: true
    })
    this.videoContext.play()
  },
  bindPause: function () {
    this.videoContext.pause()
  },
  videoErrorCallback: function (e) {
    console.log('视频错误信息:')
    console.log(e.detail.errMsg)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.videoContext = wx.createVideoContext('myVideo')
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