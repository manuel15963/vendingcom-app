import {
  HttpClient,
  Injectable,
  apiEndpoints,
  inject,
  setClassMetadata,
  tap,
  ɵɵdefineInjectable
} from "./chunk-GVVL6FWI.js";

// src/app/core/storage/token-storage.service.ts
var _TokenStorageService = class _TokenStorageService {
  constructor() {
    this.tokenKey = "vendingcom_auth_token";
    this.sessionKey = "vendingcom_auth_session";
  }
  saveToken(token) {
    localStorage.setItem(this.tokenKey, token);
  }
  getToken() {
    return localStorage.getItem(this.tokenKey);
  }
  saveSession(session) {
    localStorage.setItem(this.sessionKey, JSON.stringify(session));
  }
  getSession() {
    const rawSession = localStorage.getItem(this.sessionKey);
    if (!rawSession) {
      return null;
    }
    try {
      return JSON.parse(rawSession);
    } catch {
      this.clear();
      return null;
    }
  }
  clear() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.sessionKey);
  }
};
_TokenStorageService.\u0275fac = function TokenStorageService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _TokenStorageService)();
};
_TokenStorageService.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _TokenStorageService, factory: _TokenStorageService.\u0275fac, providedIn: "root" });
var TokenStorageService = _TokenStorageService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TokenStorageService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

// src/app/features/auth/data-access/auth-api.service.ts
var _AuthApiService = class _AuthApiService {
  constructor() {
    this.http = inject(HttpClient);
    this.tokenStorage = inject(TokenStorageService);
  }
  login(request) {
    return this.http.post(apiEndpoints.auth.login, request).pipe(tap((response) => this.persistSession(response)));
  }
  me() {
    return this.http.get(apiEndpoints.auth.me);
  }
  logout() {
    this.tokenStorage.clear();
  }
  getCurrentSession() {
    return this.tokenStorage.getSession();
  }
  isAuthenticated() {
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
  hasAnyRole(roleCodes) {
    const session = this.getCurrentSession();
    if (!session) {
      return false;
    }
    return session.roles.some((role) => {
      const roleCode = typeof role === "string" ? role : role.roleCode;
      return roleCodes.includes(roleCode);
    });
  }
  persistSession(response) {
    const expiresAt = new Date(Date.now() + response.expiresIn * 1e3).toISOString();
    const session = {
      token: response.token,
      userId: response.userId,
      username: response.username,
      email: response.email,
      fullName: response.fullName,
      userStatus: response.userStatus,
      roles: response.roles,
      expiresAt
    };
    this.tokenStorage.saveToken(response.token);
    this.tokenStorage.saveSession(session);
  }
};
_AuthApiService.\u0275fac = function AuthApiService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _AuthApiService)();
};
_AuthApiService.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AuthApiService, factory: _AuthApiService.\u0275fac, providedIn: "root" });
var AuthApiService = _AuthApiService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AuthApiService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

export {
  TokenStorageService,
  AuthApiService
};
//# sourceMappingURL=chunk-IYYVUFSF.js.map
