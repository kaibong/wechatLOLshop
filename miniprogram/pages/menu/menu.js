// miniprogram/pages/menu/menu.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    types: [],
    select: '',
    goods:[],
    heightArr:[],
    heightNow:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
   onLoad: function (options) {
    var that = this
    db.collection("goods_type").where({condition:1}).get({
      success: res =>{
        that.setData({
          types:res.data,
          select:res.data[0]._id,
          goods:res.data
        })
        for(let i=0;i<that.data.goods.length;i++){
          db.collection("goods").where({typeId:that.data.goods[i]._id,condition:1}).get({
            success: res1 =>{
              var good = 'goods['+i+'].allGood'
              that.setData({
                [good]:res1.data
              })
            }
          })
        }
        setTimeout(function(){wx.createSelectorQuery().selectAll(".good_side").boundingClientRect(function(rect){}).exec(function (res){
          var heightArr =[]
          res[0].forEach((item)=>{
            heightArr.push(item.top-19)
          })
          heightArr.push(100000000)
          that.setData({
            heightArr:heightArr
          })
        })},5000)
      },
      fail: err=>{
        console.log(err)
      }
    })
  },
  onGoodsScroll:function(evt){
    var heightArr = this.data.heightArr
    let heightNow = this.data.heightNow
    let scrollTop = evt.detail.scrollTop
    for(let i =0;i<heightArr.length;i++){
      if(heightNow!=i){
        if(scrollTop>=heightArr[i]&&scrollTop<heightArr[i+1]){
          this.setData({
            heightNow:i,
            select:this.data.types[i]._id
          })
        }
      }
    }

  },
  _chooseType:function(evt){
    console.log(evt)
    this.setData({
      typeView:'id'+evt.currentTarget.id,
      select:evt.currentTarget.id
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