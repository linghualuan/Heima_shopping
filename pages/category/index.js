import { request } from "../request/request"

Page({
    data: {
        //左侧数据
        leftMenuList:[],
        //右侧数据
        rightContent:[],
        //左侧菜单索引
        leftIndex:0,
        //右侧滚动条位置
        scrollTop:0
    },
    //保存总数据
    Cates:[],

    onLoad:function(option){
        this.getCates()
    },

    getCates(){
        request({url:"https://api-hmugo-web.itheima.net/api/public/v1/categories"}).then(
            response => {
                console.log(response);
                this.Cates = response.data.message
                console.log(this.Cates);
                let leftMenuList = this.Cates.map(v => v.cat_name);
                let rightContent = this.Cates[0].children;
                this.setData({
                    leftMenuList,
                    rightContent
                })
            }
        )
    },

    handleItemTap(e){
        const index = e.currentTarget.dataset.index;
        let rightContent = this.Cates[index].children;
        this.setData({
            rightContent,
            leftIndex:index,
            scrollTop:0
        })
    }
})