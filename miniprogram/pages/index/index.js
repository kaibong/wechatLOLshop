// miniprogram/pages/index/index.js
Page({
  _toshop: function(){
    wx.switchTab({
      url: '/pages/menu/menu'
    })
  }
  ,
  reflash: function(){
    wx.cloud.callFunction({
      name: 'getNews',
      success: res=>{
        console.log("getNews调用成功",res)
        let result = JSON.parse(res.result).data
        console.log(result)
        this.setData({
          news: result.result
        })
      },
      fail: err=>{
        console.log("getNews调用失败",err)
      }
    }) 
  },
  /**
   * 页面的初始数据
   */
  data: {
    banner1: "cloud://qibang-used.7169-qibang-used-1301801315/LolShop/index/images/banner/banner1.jpg",
    banner2: "cloud://qibang-used.7169-qibang-used-1301801315/LolShop/index/images/banner/banner2.jpg",
    banner3: "cloud://qibang-used.7169-qibang-used-1301801315/LolShop/index/images/banner/banner3.jpg",
    news: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.callFunction({
      name: 'getNews',
      success: res=>{
        console.log("getNews调用成功",res)
        let result = JSON.parse(res.result).data
        console.log(result)
        this.setData({
          news: result.result
        })
      },
      fail: err=>{
        console.log("getNews调用失败",err)
      }
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