import VueRouter from 'vue-router'
import Vue from 'vue'
Vue.use(VueRouter)
// import Login from '@/views/Login'
const routes = [
  {
    path: '/login',
    // component:Login
    component: () => import('@/views/Login')
  },
  {
    path: '/',
    component: () => import('@/views/Layout'),
    redirect: '/ ',
    children: [
      {
        path: '/ ',
        component: () => import('@/views/Home')
      },
      {
        path: '/video',
        component: () => import('@/views/Video')
      },
      {
        path: '/qa',
        component: () => import('@/views/Qa')
      },
      {
        path: '/my',
        component: () => import('@/views/My')
      }
    ]
  },
  {
    path: '/search',
    component: () => import('@/views/Serach')
  },
  {
    path: '/user',
    component: () => import('@/views/User')
  }
]

const router = new VueRouter({
  routes
})

export default router
