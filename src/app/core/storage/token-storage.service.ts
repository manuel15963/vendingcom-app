import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  private readonly tokenKey = 'vendingcom_auth_token';
  private readonly sessionKey = 'vendingcom_auth_session';

  saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  saveSession<TSession>(session: TSession): void {
    localStorage.setItem(this.sessionKey, JSON.stringify(session));
  }

  getSession<TSession>(): TSession | null {
    const rawSession = localStorage.getItem(this.sessionKey);

    if (!rawSession) {
      return null;
    }

    try {
      return JSON.parse(rawSession) as TSession;
    } catch {
      this.clear();
      return null;
    }
  }

  clear(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.sessionKey);
  }
}
