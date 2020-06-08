// components/news/news.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    newDetail: Object
  },

  /**
   * 组件的初始数据
   */
  data: {
    "title": "请输入标题",
    "date": "5-26"
  },

  /**
   * 组件的方法列表
   */
  methods: {
    watchNew:function(options){
        wx.navigateTo({
          url: '/pages/index/news/news?id='+options.currentTarget.dataset.id
        })
      }
  },
  
})
