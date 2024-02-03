// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'processor',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
      },
      {
        path: '/git',
        name: 'git',
        component: () => import(/* webpackChunkName: "git" */ '@/views/Git.vue'),
      },
      {
        path: '/contact',
        name: 'contact',
        component: () => import(/* webpackChunkName: "contact" */ '@/views/Contact.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
