import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '', 
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
      path: '/home', 
      component: () => import('@/views/Home/index.vue'), 
    }, 
    
  ],
})

export default router
