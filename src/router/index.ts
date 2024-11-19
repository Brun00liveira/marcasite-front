import { createRouter, createWebHistory } from 'vue-router';
import DefaultLayout from '@/views/Layouts/default.vue';
import { authMiddleware } from '@/middlewares/AuthMiddleware';

const routes = [
  {
    path: '/login',
    component: () => import('@/views/Auth/Login.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/create',
    component: () => import('@/views/Auth/Register.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/forgot-password',
    component: () => import('@/views/Auth/ForgotPassword.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/reset-password',
    component: () => import('@/views/Auth/ResetPassword.vue'),
    meta: { requiresAuth: false }
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
      {
        path: 'plans',
        name: 'Plans',
        component: () => import('@/views/Plans/plans.vue'),
      },
      {
        path: 'plans-confirmed',
        name: 'PlansConfirmed',
        component: () => import('@/views/Plans/confirmation.vue'),
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

router.beforeEach(authMiddleware);

export default router;
