import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';

export const homeRedirectGuardGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if(!auth.isLoggedIn()){
    return router.createUrlTree(['/login']);
  }

  const role = auth.getRole();

  return role === 'Admin' || role === 'Manager' ? 
    router.createUrlTree(['/admin/dashboard']) 
    : router.createUrlTree(['/employee/dashboard']);
};
