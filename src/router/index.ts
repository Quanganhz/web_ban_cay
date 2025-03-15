import { createRouter, createWebHistory } from 'vue-router';
import Plant from '@/views/Plant.vue'; // Đảm bảo đường dẫn đúng
import Cart from '@/views/cart.vue';

const routes = [
  { path: '/', name: 'home', component: () => import('@/views/WebPlants.vue') },
  { path: '/admin', name: 'admin', component: () => import('@/components/screen/LoginAdmin.vue') },
  { path: '/adminPlants', name: 'adminPlants', component: () => import('@/components/screen/AdminPlants.vue'), meta: { requiresAuth: true } },
  { path: '/about', name: 'about', component: () => import('@/views/AboutView.vue') },
  { path: '/plant/:id', name: 'plant', component: Plant, props: true },
  { path: '/cart', name: 'cart', component: Cart},
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;