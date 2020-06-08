// 云函数入口文件
const cloud = require('wx-server-sdk')
const rp = require('request-promise')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  let url = "http://apps.game.qq.com/cmc/zmMcnTargetContentList?num=10&target=23&page="+Math.floor(Math.random()*9 + 1);
  return await rp(url).then(function (res){
    return res
  }).catch(function (err){
    console.log(err)
  })
}