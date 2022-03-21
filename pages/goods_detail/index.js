import { request } from "../request/request";

Page({

    data: {
        goodsObj:[]
    },

    GoodsInfo:{},

    onLoad:function(options){
        const goods_id = options;
        this.getGoodsDetail(goods_id)
    },

    async getGoodsDetail(goods_id){
        const goodsObj = await request({url:"https://api-hmugo-web.itheima.net/api/public/v1/goods/detail",data:goods_id});

        this.GoodsInfo = goodsObj.data.message;
        console.log(goodsObj);
        console.log(this.GoodsInfo);
        this.setData({
            goodsObj
        })
    },

    //放大图片预览
    handleImage(e){
        console.log(e);

        //把五张图片的链接遍历到urls
        const urls = this.GoodsInfo.pics.map(v=>v.pics_mid);
        console.log(urls);

        //表示当前点击的图片的链接
        const current = e.currentTarget.dataset.url;
        console.log(current);
        wx.previewImage({
          urls, //表示五张图片的数组
          current   //表示当前图片显示的链接
        })
    },

    //点击加入购物车
    handleCart(){
        // let cart = wx.getStorageInfoSync('cart')||[]
        let cart = wx.getStorageSync('cart')||[];

        let index = cart.findIndex(v=>v.goods_id === this.GoodsInfo.goods_id);
        if(index === -1){

            let GoodsInfo = this.GoodsInfo
            GoodsInfo.num=1;
            GoodsInfo.checked = true;
            cart.push(GoodsInfo);
        }else{
            cart[index].num++;
        }

        wx.setStorageSync('cart', cart);

        wx.showToast({
          title: '加入成功',
          icon:'success',
          mask:true
        })
    }
})