// src/router/index.js ou src/router.ts
import { createRouter, createWebHistory } from 'vue-router';
import DefaultLayout from '@/views/Layouts/default-layout.vue';

const routes = [
  // Rotas de Autenticação
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
