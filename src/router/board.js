export default[
    {
      path:'/board',
      name:'board',
      component: () => import("@/views/board/BoardList.vue")
    },
    {
      path:'/boardwrite',
      name:'boardwrite',
      component: () => import("@/views/board/BoardWrite.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path:'/boardedit/:id',
      name:'boardedit',      
      component: () => import("@/views/board/BoardEdit.vue")
    }
]