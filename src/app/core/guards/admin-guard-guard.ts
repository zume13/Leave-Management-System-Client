import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { inject } from '@angular/core';

export const adminGuardGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);

  if(auth.getRole() === 'Admin' || auth.getRole() === 'Manager'){
    return true;
  }

  return false;
};
