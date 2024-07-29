import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '',
    redirect: '/play',
  },
  {
    name: 'Play',
    path: '/play',
    component: () => import('@/views/Play.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
