export function authMiddleware(to: any, from: any, next: any) {
    const token = localStorage.getItem('auth_token');
    
  
    if (
      !token &&
      to.path !== '/login' &&
      to.path !== '/create' &&
      to.path !== '/forgot-password' &&
      to.path !== '/reset-password'
    ) {
      return next('/login');
    }
    
    next();
  }
  