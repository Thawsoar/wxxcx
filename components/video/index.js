// components/video/video.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {     
    data: Object
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  attached: function () {
    // 在组件实例进入页面节点树时执行
    
  },
  detached: function () {
    // 在组件实例被从页面节点树移除时执行
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onTap(event) {
      const vid = this.properties.data.id
      wx.navigateTo({
          url: `/pages/video-detail/video-detail?vid=${vid}`,
      })
    }
  }
})
