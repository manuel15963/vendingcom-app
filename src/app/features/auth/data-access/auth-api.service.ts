import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { apiEndpoints } from '@core/config/api-endpoints';
import { TokenStorageService } from '@core/storage/token-storage.service';
import {
  AuthenticatedUserResponse,
  AuthSession,
  LoginRequest,
  LoginResponse,
} from '../models/auth.models';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {

  private readonly http = inject(HttpClient);
  private readonly tokenStorage = inject(TokenStorageService);

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(apiEndpoints.auth.login, request)
      .pipe(
        tap((response) => this.persistSession(response))
      );
  }

  me(): Observable<AuthenticatedUserResponse> {
    return this.http.get<AuthenticatedUserResponse>(apiEndpoints.auth.me);
  }

  logout(): void {
    this.tokenStorage.clear();
  }

  getCurrentSession(): AuthSession | null {
    return this.tokenStorage.getSession<AuthSession>();
  }

  isAuthenticated(): boolean {
    const token = this.tokenStorage.getToken();
    const session = this.getCurrentSession();

    if (!token || !session) {
      return false;
    }

    if (new Date(session.expiresAt).getTime() <= Date.now()) {
      this.logout();
      return false;
    }

    return true;
  }

  hasAnyRole(roleCodes: string[]): boolean {
    const session = this.getCurrentSession();

    if (!session) {
      return false;
    }

    return session.roles.some((role) => {
      const roleCode = typeof role === 'string' ? role : role.roleCode;

      return roleCodes.includes(roleCode);
    });
  }

  private persistSession(response: LoginResponse): void {
    const expiresAt = new Date(Date.now() + response.expiresIn * 1000).toISOString();
    const session: AuthSession = {
      token: response.token,
      userId: response.userId,
      username: response.username,
      email: response.email,
      fullName: response.fullName,
      userStatus: response.userStatus,
      roles: response.roles,
      expiresAt,
    };

    this.tokenStorage.saveToken(response.token);
    this.tokenStorage.saveSession(session);
  }
}
