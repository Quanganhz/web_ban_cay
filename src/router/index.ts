import { createRouter, createWebHistory } from 'vue-router'
import LoginAdmin from '@/components/screen/LoginAdmin.vue'
import OrderView from '@/views/OrderView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: OrderView
    },
    {
      path: '/admin',
      name: 'admin',
      component: LoginAdmin
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
