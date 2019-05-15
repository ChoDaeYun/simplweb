// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import moment from 'moment'
import VueMomentJS from 'vue-momentjs'

import App from './App'
import router from './router'
import store from './store'
import firebase from "@/firebase"

Vue.config.productionTip = false

Vue.use(Vuetify)
Vue.use(VueMomentJS, moment)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
  const isLogin = to.matched.some(x => x.meta.isLogin)
  const currentUser = firebase.auth().currentUser
  if(isLogin && currentUser){
    next('/')
  }else{
    if (requiresAuth === true && !currentUser) {
      next('/login')
    } else if (requiresAuth === true && currentUser) {
        next()
    } else {
        next()
    }
  }  
})
