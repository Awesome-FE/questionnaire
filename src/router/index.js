import Vue from 'vue'
import vueRouter from "vue-router"
import routes from "./routerConfig.js"
import BaiduMap from 'vue-baidu-map'
import VueWechatTitle from 'vue-wechat-title'

Vue.use(VueWechatTitle)
Vue.use(vueRouter)

Vue.use(BaiduMap, {
    // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
    ak: 'pxnwjNRhLVz3oiT35iL5IPG9XH5Gw1yw'
})
export default new vueRouter({
    //mode: 'history', //切换路径模式，去掉#；刷新当前页面后，报404错。
    scrollBehavior: () => ({ y: 0 }), //滚动条滚动的行为，不加这个默认就会记忆原来滚动条的位置
    routes
});