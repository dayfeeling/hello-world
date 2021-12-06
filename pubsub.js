// 消息订阅与发布 npm install import PubSub from pubsub-js

// 组件A
import PubSub from 'pubsub-js'
// 组件A-发布一个事件 eventName
PubSub.publish('eventName', 'hello world!');


// 组件B
import PubSub from 'pubsub-js'
// 组件B-订阅一个事件 eventName
// 回调函数 接收2参数，第一个参数为事件名，第二个参数为接收数据
// 回调函数 调用事件是PubSub，箭头函数可保持this为组件
mounted(){
    this.pubId = PubSub.subscribe('eventName', (eventName,data) => {
        this.data = data
    });
}
beforeDestroy(){
    PubSub.unsubscribe(this.pubId)
}

//or—————————————————————————————————————————————————————————

// 组件B
import PubSub from 'pubsub-js'

mounted(){        
    // 组件B-订阅一个事件 eventName
    this.pubId = PubSub.subscribe('eventName', this.func)
}
methods:{    
// 回调函数 接收2参数，第一个参数为事件名，第二个参数为接收数据
// 回调函数 调用事件是PubSub，箭头函数可保持this为组件
    func(eventName,data){
        this.data = data
    }
}