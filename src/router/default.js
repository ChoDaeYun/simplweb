export default[
    {
        path: '/',
        name: 'home',
        component: () => import("@/views/Home.vue")
      },
      {
        path:'/login',
        name:'login',
        component: () => import("@/views/Login.vue"),
        meta: {
          isLogin: true
        }
      },
      {
        path: '/profile',
        name: 'profile',
        component: () => import("@/views/Profile.vue")
      },
      {
        path: '/record',
        name: 'record',
        component: () => import("@/views/Record.vue")
      }
]