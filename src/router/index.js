import Vue from 'vue'
import Router from 'vue-router'
import board from './board'
import defaultpage from './default'
import comment from './comment'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    ...defaultpage,
    ...board,
    ...comment,
    {
      path: '/*',
      name: 'error',
      component: () => import("@/views/Error.vue")
    }
  ]
})