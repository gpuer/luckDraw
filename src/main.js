import Vue from 'vue'
import App from './App'
import router from './router'
import ls from "vue-ls"
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
Vue.use(ls)
Vue.config.productionTip = false
import global_ from './components/Global'//引用文件
Vue.prototype.GLOBAL = global_//挂载到Vue实例上面
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
