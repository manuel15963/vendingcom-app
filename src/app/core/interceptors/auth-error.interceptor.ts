import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

import { environment } from '@env/environment';
import { ToastService } from '../feedback/toast.service';
import { TokenStorageService } from '../storage/token-storage.service';

export const authErrorInterceptor: HttpInterceptorFn = (request, next) => {
  const tokenStorage = inject(TokenStorageService);
  const router = inject(Router);
  const toast = inject(ToastService);

  return next(request).pipe(
    catchError((error: unknown) => {
      if (
        error instanceof HttpErrorResponse &&
        error.status === 401 &&
        isApiRequest(request.url) &&
        !isPublicAuthRequest(request.url)
      ) {
        tokenStorage.clear();
        void toast.error('Tu sesion expiro. Inicia sesion nuevamente.');
        void router.navigateByUrl('/login');
      }

      if (
        error instanceof HttpErrorResponse &&
        error.status === 429 &&
        isApiRequest(request.url)
      ) {
        const apiMessage = (error.error as { message?: string } | undefined)?.message;
        void toast.error(apiMessage || 'Demasiadas solicitudes. Espera unos minutos e intenta de nuevo.');
      }

      return throwError(() => error);
    })
  );
};

function isApiRequest(url: string): boolean {
  return url.startsWith(environment.apiUrl) || url.startsWith(environment.customerApiUrl);
}

function isPublicAuthRequest(url: string): boolean {
  const publicUrls = [
    `${environment.apiUrl}/auth/login`,
    `${environment.apiUrl}/auth/password/recovery/request`,
    `${environment.apiUrl}/auth/password/recovery/confirm`,
  ];

  return publicUrls.includes(url);
}
