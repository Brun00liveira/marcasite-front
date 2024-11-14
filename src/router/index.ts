// src/router/index.js ou src/router.ts
import { createRouter, createWebHistory } from 'vue-router';
import DefaultLayout from '@/views/Layouts/default.vue';

const routes = [
  // Rotas de Autenticação
  {
    path: '/login',
    component: () => import('@/views/Auth/login.vue'),
  },
  {
    path: '/create',
    component: () => import('@/views/Auth/register.vue'),
  },
  {
    path: '/forgot-password',
    component: () => import('@/views/Auth/forgotPassword.vue'),
  },

  // Rotas protegidas usando o layout padrão
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: '',
        redirect: 'home', // Redireciona para /home se acessar apenas "/"
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

  // Rota 404
  {
    path: '/:catchAll(.*)',
    redirect: '/',
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
