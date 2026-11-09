import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from './auth';

export const guestGuard: CanActivateFn = () => {
  const auth = inject(Auth);
  const router = inject(Router);

  // Se NÃO estiver logado, permite acessar; 
  // Se já estiver logado, chuta para o feed.
  return !auth.isLoggedIn() ? true : router.createUrlTree(['/feed']);
};