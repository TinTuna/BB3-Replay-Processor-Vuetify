// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '/',
        name: 'replay-processor',
        component: () => import(/* webpackChunkName: "replay-processor" */ '@/views/ReplayProcessor.vue'),
      },
      {
        path: '/ids-finder',
        name: 'ids-finder',
        component: () => import(/* webpackChunkName: "ids-finder" */ '@/views/IdsFinder.vue'),
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
