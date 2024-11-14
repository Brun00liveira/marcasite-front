import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '', 
      component: () => import('@/layouts/Auth/Login.vue'), 
  }, 

  {
    path: '/create', 
    component: () => import('@/layouts/Auth/Register.vue'), 
}, 

{
  path: '/forgot-password', 
  component: () => import('@/layouts/Auth/ForgotPassword.vue'), 
}, 
  ],
})

export default router
