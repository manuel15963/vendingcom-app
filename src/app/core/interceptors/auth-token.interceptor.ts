import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { environment } from '@env/environment';
import { TokenStorageService } from '../storage/token-storage.service';

export const authTokenInterceptor: HttpInterceptorFn = (request, next) => {
  const token = inject(TokenStorageService).getToken();

  if (!token || !isApiRequest(request.url) || isPublicAuthRequest(request.url)) {
    return next(request);
  }

  return next(request.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  }));
};

function isApiRequest(url: string): boolean {
  // El mismo token (emitido por auth) sirve para auth, customer, location y machine.
  return url.startsWith(environment.apiUrl)
    || url.startsWith(environment.customerApiUrl)
    || url.startsWith(environment.locationApiUrl)
    || url.startsWith(environment.machineApiUrl);
}

function isPublicAuthRequest(url: string): boolean {
  const publicUrls = [
    `${environment.apiUrl}/auth/login`,
    `${environment.apiUrl}/auth/password/recovery/request`,
    `${environment.apiUrl}/auth/password/recovery/confirm`,
  ];

  return publicUrls.includes(url);
}
