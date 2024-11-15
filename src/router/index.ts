import { createRouter, createWebHistory } from 'vue-router';
import DefaultLayout from '@/views/Layouts/default.vue';

const routes = [

  {
    path: '/login',
    component: () => import('@/views/Auth/Login.vue'),
  },
  {
    path: '/create',
    component: () => import('@/views/Auth/Register.vue'),
  },
  {
    path: '/forgot-password',
    component: () => import('@/views/Auth/ForgotPassword.vue'),
  },
  {
    path: '/reset-password',
    component: () => import('@/views/Auth/ResetPassword.vue'),
  },

  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: '',
        redirect: 'home',
      },
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/Home/index.vue'),
      },
      {
        path: 'my-courses',
        name: 'MyCourses',
        component: () => import('@/views/Courses/myCourses.vue'),
      },
      {
        path: 'courses',
        name: 'Courses',
        component: () => import('@/views/Courses/courses.vue'),
      },
    ],
  },
  
  {
    path: '/admin',
    component: DefaultLayout,
    children: [
      {
        path: '',
        redirect: 'dashboard',
      },
      {
        path: 'dashboard',
        name: 'AdminDashboard',
        component: () => import('@/views/Admin/dashboard.vue'),
      },
      {
        path: 'courses',
        name: 'AdminCourses',
        component: () => import('@/views/Admin/courses.vue'),
      },
      {
        path: 'users',
        name: 'AdminUsers',
        component: () => import('@/views/Admin/users.vue'),
      },
      {
        path: 'categories',
        name: 'AdminCategories',
        component: () => import('@/views/Admin/categories.vue'),
      },
    ],
  },

  {
    path: '/:catchAll(.*)',
    redirect: '/',
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('auth_token');
  if (to.path !== '/login' && to.path !== '/create' && to.path !== '/forgot-password') {
    if (!token) {
      return next('/login');
    }
  }
  next();
});

export default router;
