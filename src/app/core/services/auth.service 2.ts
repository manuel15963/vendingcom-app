import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

import { environment } from '../../../environments/environment';
import { TokenService } from './token.service';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginRoleResponse {
  roleCode: string;
  roleName?: string;
}

export interface LoginResponse {
  token: string;
  tokenType: string;
  expiresIn: number;
  username: string;
  roles: LoginRoleResponse[];
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly http = inject(HttpClient);
  private readonly tokenService = inject(TokenService);
  private readonly baseUrl = environment.apiUrl;

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/auth/login`, request)
      .pipe(
        tap((response: LoginResponse) => {
          this.tokenService.saveToken(response.token);
        })
      );
  }
}
