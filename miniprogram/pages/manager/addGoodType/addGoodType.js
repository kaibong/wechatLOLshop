// miniprogram/pages/manager/addGoodType/addGoodType.js
Page({
  _handlerSubmit:function(evt){
    console.log(evt)
    //1.获取用户输入的账号密码
    let name = evt.detail.value.type
    //2.存储到云数据库中
    //2.1 现获取数据库的引用
    const db = wx.cloud.database()
    //2.2 获取数据库的集合
    const accountCollection = db.collection("goods_type")
      accountCollection.where({
        name: name
      }).get().then(res=>{
        console.log("查询成功",res)
        if(res.data.length===0){
          accountCollection.add({
            data:{
              name: name,
              condition:1
            }
          })
          wx.showModal({
            content: '添加成功',
            showCancel:false
          })
          this.setData({
            name: ''
          })
        }else{
          wx.showModal({
            content: '该种类已存在',
            showCancel:false
          })
        }
      }).catch(err=>{
        console.log("查询失败",err)
      })
  },

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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