Component({
    properties: {
        tabs:{
            type:Array,
            value:[]
        }
    },

    data: {
        indexItem:0
    },

    methods: {
        handleTap(e){
            const index = e.currentTarget.dataset.index;
            this.triggerEvent("itemTapChange",index)
        }
    }
})
