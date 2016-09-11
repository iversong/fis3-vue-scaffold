import Vue from 'vue'
import VueRouter from 'vue-router'
import routerConfig from './router'

// Router
Vue.use(VueRouter)

const App = Vue.extend({})
// 创建一个路由器实例
const router = new VueRouter()

routerConfig(router)

router.start(App, '#entry-app')

window.router = router