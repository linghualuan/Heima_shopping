import {request} from '../request/request.js'
Page({
  
  data: {
    swiperList:[],
    cateList:[],
    floorList:[]
  },

  onLoad:function(options){
    this.getUserInfo();
    this.getCateList();
    this.getFloorList()
  },

  getUserInfo(){
    request({url:"https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata"}).then(
      response => {
        this.setData({
          swiperList:response.data.message
        })
      }
    )
  },

  getCateList(){
    request({url:"https://api-hmugo-web.itheima.net/api/public/v1/home/catitems"}).then(
      response=>{
        this.setData({
          cateList:response.data.message
        })
      }
    )
  },

  getFloorList(){
    request({url:"https://api-hmugo-web.itheima.net/api/public/v1/home/floordata"}).then(
      response => {
        this.setData({
          floorList:response.data.message
        })
      }
    )
  }
})
