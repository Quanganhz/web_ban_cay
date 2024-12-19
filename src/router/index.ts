import { createRouter, createWebHistory } from 'vue-router';
import LoginAdmin from '@/components/screen/LoginAdmin.vue';
import AdminPlants from '@/components/screen/AdminPlants.vue';
import WebPlants from '@/views/WebPlants.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: WebPlants,
    },
    {
      path: '/admin',
      name: 'admin',
      component: LoginAdmin,
    },
    {
      path: '/adminPlants',
      name: 'adminPlants',
      component: AdminPlants,
      meta: { requiresAuth: true }, // Đánh dấu route cần xác thực
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
  ],
});

// Navigation Guard
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token'); // Kiểm tra token trong localStorage
  if (to.matched.some((record) => record.meta.requiresAuth) && !isAuthenticated) {
    alert('You need to login first!'); // Thông báo khi chưa đăng nhập
    next({ name: 'admin' }); // Chuyển hướng về trang đăng nhập
  } else {
    next(); // Tiếp tục truy cập nếu đã đăng nhập
  }
});

export default router;
