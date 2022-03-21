// pages/cart/index.js
Page({

    data: {
        address:{},
        cart:[],
        totalPrice:0,
        number:0,
        allChecked:false
    },
    onShow(){
        let cart = wx.getStorageSync('cart');
        let address = wx.getStorageSync('address');
        this.setCart(cart);
        this.setData({address});
    },
    handleAddress(){
        wx.chooseAddress({
            success: (result)=>{
                let address = result;
                this.setData({address})
                wx.setStorageSync('address',address)
            }
        });
    },

    //封装每条数据改变的函数
    setCart(cart){
        let allChecked = cart.length?cart.every(v=>v.checked):false
        
        let number = 0;
        let totalPrice = 0;

        cart.forEach((v)=>{
            if(v.checked){
                number = v.num + number;
                totalPrice = v.num * v.goods_price + totalPrice;
            }
        })

        this.setData({
            cart,
            allChecked,
            number,
            totalPrice
        })

        wx.setStorageSync('cart',cart);
    },

    //改变商品是否选择
    handleGoodsChange(e){
        let cart = this.data.cart;
        let goods_id = e.currentTarget.dataset.id
        cart.forEach(v=>{
            if(v.goods_id === goods_id){
                v.checked = !v.checked;
            }
        })
        this.setCart(cart);
    },

    //底部全选功能
    handleAllChecked(e){
        console.log(e);
        //获取购物车数组
        let cart = this.data.cart;

        //获取是否全选
        let allChecked = this.data.allChecked;  //allChecked === false

        //将allChecked值取反
        allChecked = !allChecked;

        cart.forEach((v)=>{
            v.checked = allChecked;
        })
        this.setCart(cart);
    },

    //商品增减功能
    handleSub(e){
        let cart = this.data.cart;

        let goods_id = e.currentTarget.dataset.id;

        let index = cart.findIndex(v=>v.goods_id === goods_id);
        cart.forEach(v=>{
            if(v.goods_id === goods_id){
                if(v.num === 1){
                    wx:wx.showModal({
                        title: '提示',
                        content: '是否删除该商品?',
                        success: (result) => {
                            if(result.confirm){
                                cart.splice(index,1);
                                this.setCart(cart);
                            }else if(result.cancel) {
                                console.log("不删");
                            }
                        },
                        fail: ()=>{},
                        complete: ()=>{}
                    });
                }else if (v.num>1){
                    v.num--;
                }
            }
        })
        this.setCart(cart);
    },
    handleSum(e){
        let cart = this.data.cart;

        let goods_id = e.currentTarget.dataset.id;

        cart.forEach(v=>{
            if(v.goods_id === goods_id){
                v.num++;
            }
        })
        this.setCart(cart);
    },

    handlePay(e){
        console.log(e);
        let number = this.data.number;
        let address = this.data.address;
        if(number === 0){
            wx.showToast({
                title: '您还没有选购商品',
                icon: 'none',
            });
        }else if(!address.userName){
            wx.showToast({
                title:'您还没有选择收货地址',
                icon:'none'
            })
        }else{
            wx.navigateTo({
                url: '/pages/pay/index',
                success: (result)=>{
                    
                },
                fail: ()=>{},
                complete: ()=>{}
            });
        }
    }
})