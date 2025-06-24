// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      // {
      //   path: '',
      //   name: 'processor',
      //   component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
      // },
      {
        path: '/',
        name: 'replay-processor',
        component: () => import(/* webpackChunkName: "replay-processor" */ '@/views/ReplayProcessor.vue'),
      },
      {
        path: '/replay-processor',
        name: 'replay-processor',
        component: () => import(/* webpackChunkName: "replay-processor" */ '@/views/ReplayProcessor.vue'),
      },
      {
        path: '/git',
        name: 'git',
        component: () => import(/* webpackChunkName: "git" */ '@/views/Git.vue'),
      }
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
