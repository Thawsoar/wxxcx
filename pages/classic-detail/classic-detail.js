// pages/classic/classic.js
import { ClassicModel } from '../../models/classic.js'
import { LikeModel } from '../../models/like.js'
let classicModel = new ClassicModel()
let likeModel = new LikeModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classic: {},
    first: false,
    latest: true,
    likeStatus: false,
    likeNums: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const cid = options.cid
    const type = options.type
   
    classicModel.getById(cid, type, res => {
      this._getLikeFavor(type,cid,)
      this.setData({
        classic: res,
        latest: classicModel.isLatest(res.index),
        first: classicModel.isFirst(res.index)
      })
    })
    
  },
  onLike(event) {
    let behavior = event.detail.behavior
    likeModel.like(behavior, this.data.classic.id, this.data.classic.type)
  },
  onPrevious(event) {
    this._uptadeClassic('previous')
  },
  onNext(event) {
    this._uptadeClassic('next')
  },
  _uptadeClassic: function (nextOrPrevious) {
    let index = this.data.classic.index
    classicModel.getClassic(index, nextOrPrevious, (res) => {
      this.setData({
        classic: res,
        first: classicModel.isFirst(res.index),
        latest: classicModel.isLatest(res.index)
      })
      this._getLikeFavor(res.type, res.id)

    })
  },
  _getLikeFavor(type, artId) {
    likeModel.getLike(type, artId, (res) => {
      this.setData({
        likeStatus: res.like_status,
        likeNums: res.fav_nums
      })
    })
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