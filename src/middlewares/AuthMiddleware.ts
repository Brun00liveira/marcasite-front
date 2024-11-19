import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

export function authMiddleware(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
): void {
  const token = localStorage.getItem('auth_token');

  // Rotas públicas que não requerem autenticação
  const publicPaths = ['/login', '/create', '/forgot-password', '/reset-password'];

  // Redirecionar usuários não autenticados para a página de login
  if (!token && !publicPaths.includes(to.path)) {
    return next('/login');
  }

  // Redirecionar usuários autenticados que tentam acessar rotas públicas
  if (token && publicPaths.includes(to.path)) {
    return next('/home');
  }

  next(); // Permite o acesso à rota
}
