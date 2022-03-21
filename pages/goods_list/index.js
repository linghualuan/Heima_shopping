import { request } from "../request/request";

Page({
    data: {
        tabs:[
            {
                id:1,
                value:'综合',
                isActive:true
            },
            {
                id:2,
                value:'销量',
                isActive:false
            },
            {
                id:3,
                value:'价格',
                isActive:false
            }
        ],
        goodsList:[]
    },

    //接口要的参数
    QueryParams:{
        cid:'',
        query:'',
        pagenum:1,
        pagesize:10
    },

    //总的页数
    totalPage:1,

    onLoad:function(option){
        console.log(option);
        this.QueryParams.cid = option.cid;
        this.getGoodsList()
    },

    handleItemTapChange(e){
        let index = e.detail;
        const tabs = this.data.tabs;
        tabs.forEach((v,i)=>{i === index? v.isActive=true:v.isActive=false})
        this.setData({
            tabs
        })
    },

    async getGoodsList(){
        const res = await request({url:"https://api-hmugo-web.itheima.net/api/public/v1/goods/search",data:this.QueryParams});
        console.log(res);
        //获取数据总条数
        const total = res.data.message.total;

        this.totalPages = Math.ceil(total / this.QueryParams.pagesize);

        this.setData({
            goodsList:[...this.data.goodsList,...res.data.message.goods]
        });

        wx.stopPullDownRefresh();
    },

    onReachBottom(){
        if(this.QueryParams.pagenum > this.totalPage){
            console.log("没有下一页了");
            wx.showToast({
              title: '没有下一页了！',
            })
        }else{
            console.log("还有下一页！！！！！");
            this.QueryParams.pagenum++;
            this.getGoodsList();
        }
    },

    onPullDownRefresh(){
        //重置数组 若不重置 则会看到很多以前的数据
        this.setData({
            getGoodsList:[]
        })
        this.QueryParams.pagenum = 1;
        this.getGoodsList();
    }
})