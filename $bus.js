new Vue({
    el:'#id',
    render: h => h(App),
    beforeCreate(){
        // 安装全局事件总线，$bus就是当前应用vm
        Vue.prototype.$bus = this;
    }
})


// 接收数据
{
    mounted(){
        this.$bus.$on(eventName,this.demo)
        // or
        this.$bus.$on(eventName,function(data){})
    }
    methods:{
        demo(data){}
    }
    beforeDestroy(){
        this.$bus.$off(['eventName'])
    }
    
}
// 提供数据
this.$bus.$emit('eventName',数据)
