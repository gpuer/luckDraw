import Vue from 'vue'
import Router from 'vue-router'
import show from '@/views/show'
import draw from '@/views/draw'
import admin from '@/views/admin'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: "/show",
      name: "show",
      component: show
    }, {
      path: "/admin",
      name: "admin",
      component: admin
    },
    {
      path: "/draw",
      name: "draw",
      component: draw
    },
  ]
})
