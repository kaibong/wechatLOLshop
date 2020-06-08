// miniprogram/pages/manager/addGood/addGood.js
Page({
  bindPickerChange:function(evt){
    this.setData({
      index:evt.detail.value
    })
  },
  uploadFile:function(evt){
    wx.chooseImage({
      count:1,
      success: (res) => {
        wx.cloud.callFunction({
          name:'getTime',
          success: (res)=>{
            this.setData({
              imageName : res.result+".jpg"
            })
          }
        })
        this.setData({
          image:res.tempFilePaths[0]
        })
      },
    })
  },
  deleteWay:function(evt){
    let str = evt.currentTarget.id.split(",")
    let character = str[0]  
    let wayIndex = str[1]
    let allway = this.data.characters[character].way
    allway.splice(wayIndex,1)
    this.setData({
      ['characters.'+character+'.way']:allway
    })
  },
  way:function(evt){
    console.log(evt)
    let character  = evt.currentTarget.id
    let way  = evt.detail.value
    let allway = this.data.characters[character].way
    if(way != ''){
      if(way.indexOf('|')>=0 ){
        let str = way.split("|")
        let name  = str[0]
        let price = parseFloat(str[1])
        allway.push({name:name , price:price})
        this.setData({
          ['characters.'+character+'.way']:allway,
          wayContent:''
        })
      }else{
        allway.push({name:way,price:0})
        this.setData({
          ['characters.'+character+'.way']:allway,
          wayContent:''
        })
      }
    }
    console.log(this.data.characters)
  },
  add:function(evt){
    let name = evt.detail.value.name
    let price = evt.detail.value.price
    let imageName = this.data.imageName
    let index = this.data.index
    let typeId = this.data.types[index]._id
    let descript = evt.detail.value.descript
    let characters = this.data.characters
    if(name!= null && price!= null && typeId!=null && name!= '' && price!= ''){
      const db = wx.cloud.database()
      //2.2 获取数据库的集合
      const accountCollection = db.collection("goods")
        accountCollection.add({
          data:{
            name:name,
            imageName:imageName,
            price:price,
            typeId:typeId,
            descript:descript,
            condition:1,
            characters: characters
          }
        })
      if(imageName!='uploadFile.png'){
        wx.cloud.uploadFile({
          cloudPath: "LolShop/manager/goods/images/"+imageName,
          filePath:this.data.image
        })
      }
      console.log(this.data.characters)
    }else{
      wx.showModal({
        content: '请输入完整信息',
        showCancel: false
      })
    }
  },
  /**
   * 页面的初始数据
   */
  data: {
    show:true,
    add:true,
    types: [{'name':'点击选择货物种类'}],
    index: 0,
    characters:{},
    character:'',
    image: "/images/manager/uploadFile.png",
    imageName:'uploadFile.png',
    wayContent: ''
  },
  addCharacter:function(){
    if(this.data.add==true){
      this.setData({
        show : false,
        add :false
      })
    }else{
      this.setData({
        show : true,
        add :true
      })
    }
  },
  cheakIt:function(evt){
    this.setData({ 
      character:evt.detail.value
    })
  },
  changeChoose:function(evt){
    if(this.data.characters[evt.currentTarget.id].choose===1){
      this.setData({ 
        ['characters.'+evt.currentTarget.id+'.choose']: 2,
      })
     }else{
      this.setData({ 
        ['characters.'+evt.currentTarget.id+'.choose']: 1,
      })
     }
  },
  deleteCharacter:function(evt){
    delete this.data.characters[evt.currentTarget.id];
    this.setData({
      characters: this.data.characters
    })
  },
  inputCharacter:function(evt){
    if(this.data.character!=''){
      let character = this.data.character
      this.setData({ 
        ['characters.'+character+'.choose']: 1,
        ['characters.'+character+'.way']: [],
        character: ''
      })
    }else{
      wx.showModal({
        content: '请输入属性',
        showCancel:false
      })
    }
    
  },
  cancalCharacter:function(evt){
    this.setData({
      character:''
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const db = wx.cloud.database()
    //2.2 获取数据库的集合
    const accountCollection = db.collection("goods_type")
      accountCollection.where({
      }).get().then(res=>{
        console.log("查询成功",res)
        this.setData({
          types: this.data.types.concat(res.data)
        })
      }).catch(err=>{
        console.log("查询失败",err)
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