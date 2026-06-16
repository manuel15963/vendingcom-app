import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthApiService } from '../../features/auth/data-access/auth-api.service';

export const adminGuard: CanActivateFn = () => {
  const authApi = inject(AuthApiService);
  const router = inject(Router);

  if (authApi.hasAnyRole(['ADMIN', 'SUPERVISOR'])) {
    return true;
  }

  return router.createUrlTree(['/dashboard']);
};
