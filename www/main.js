import {
  ToastService
} from "./chunk-QOL6G5CZ.js";
import {
  AuthApiService,
  TokenStorageService
} from "./chunk-IYYVUFSF.js";
import {
  Component,
  HttpErrorResponse,
  IonApp,
  IonRouterOutlet2 as IonRouterOutlet,
  IonicRouteStrategy,
  PreloadAllModules,
  RouteReuseStrategy,
  Router,
  bootstrapApplication,
  catchError,
  environment,
  inject,
  provideHttpClient,
  provideIonicAngular,
  provideRouter,
  setClassMetadata,
  throwError,
  withInterceptors,
  withPreloading,
  ɵsetClassDebugInfo,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart
} from "./chunk-GVVL6FWI.js";
import "./chunk-QJQBM2CK.js";
import "./chunk-W7NNY2EY.js";
import "./chunk-5RA7GAFD.js";
import "./chunk-ADMLARTS.js";
import "./chunk-RK3ZCLYF.js";
import "./chunk-CXTH33XN.js";
import "./chunk-ZANXXOCD.js";
import "./chunk-5C7RBPYE.js";
import "./chunk-N5HPYEZY.js";
import "./chunk-BY77VLUZ.js";
import "./chunk-XQK2O555.js";
import "./chunk-SUZ7KZP7.js";
import "./chunk-D4JDJJG2.js";
import "./chunk-QI4RD4AE.js";
import "./chunk-F3JJ4YWB.js";
import "./chunk-QOQL43QQ.js";
import "./chunk-LT6P5NZW.js";
import "./chunk-IVBL4Y7V.js";
import "./chunk-GFYVZQ5H.js";
import "./chunk-J5PEQXEX.js";
import "./chunk-XNGUQ6S6.js";
import "./chunk-CIQ7WQOY.js";
import "./chunk-ZEJV63PV.js";
import "./chunk-6GY55RSK.js";
import "./chunk-7D2IXJO2.js";
import "./chunk-FZZSIR43.js";
import "./chunk-X4NBNE3H.js";
import "./chunk-7WIUP4XX.js";
import "./chunk-X2CQPUGP.js";
import "./chunk-YAS4LRVC.js";
import "./chunk-QHQP2P2Z.js";

// src/app/core/interceptors/auth-error.interceptor.ts
var authErrorInterceptor = (request, next) => {
  const tokenStorage = inject(TokenStorageService);
  const router = inject(Router);
  const toast = inject(ToastService);
  return next(request).pipe(catchError((error) => {
    if (error instanceof HttpErrorResponse && error.status === 401 && request.url.startsWith(environment.apiUrl) && !isPublicAuthRequest(request.url)) {
      tokenStorage.clear();
      void toast.error("Tu sesion expiro. Inicia sesion nuevamente.");
      void router.navigateByUrl("/login");
    }
    return throwError(() => error);
  }));
};
function isPublicAuthRequest(url) {
  const publicUrls = [
    `${environment.apiUrl}/auth/login`,
    `${environment.apiUrl}/auth/password/recovery/request`,
    `${environment.apiUrl}/auth/password/recovery/confirm`
  ];
  return publicUrls.includes(url);
}

// src/app/core/interceptors/auth-token.interceptor.ts
var authTokenInterceptor = (request, next) => {
  const token = inject(TokenStorageService).getToken();
  if (!token || !isApiRequest(request.url) || isPublicAuthRequest2(request.url)) {
    return next(request);
  }
  return next(request.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  }));
};
function isApiRequest(url) {
  return url.startsWith(environment.apiUrl);
}
function isPublicAuthRequest2(url) {
  const publicUrls = [
    `${environment.apiUrl}/auth/login`,
    `${environment.apiUrl}/auth/password/recovery/request`,
    `${environment.apiUrl}/auth/password/recovery/confirm`
  ];
  return publicUrls.includes(url);
}

// src/app/core/guards/admin.guard.ts
var adminGuard = () => {
  const authApi = inject(AuthApiService);
  const router = inject(Router);
  if (authApi.hasAnyRole(["ADMIN", "SUPERVISOR"])) {
    return true;
  }
  return router.createUrlTree(["/dashboard"]);
};

// src/app/core/guards/auth.guard.ts
var authGuard = () => {
  const authApi = inject(AuthApiService);
  const router = inject(Router);
  if (authApi.isAuthenticated()) {
    return true;
  }
  return router.createUrlTree(["/login"]);
};

// src/app/core/guards/guest.guard.ts
var guestGuard = () => {
  const authApi = inject(AuthApiService);
  const router = inject(Router);
  if (!authApi.isAuthenticated()) {
    return true;
  }
  return router.createUrlTree(["/dashboard"]);
};

// src/app/app.routes.ts
var routes = [
  {
    path: "login",
    canActivate: [guestGuard],
    loadComponent: () => import("./login.page-NPMYVPEB.js").then((m) => m.LoginPage)
  },
  {
    path: "password/recovery",
    canActivate: [guestGuard],
    loadComponent: () => import("./request-recovery.page-G5FHXM3U.js").then((m) => m.RequestRecoveryPage)
  },
  {
    path: "password/recovery/confirm",
    canActivate: [guestGuard],
    loadComponent: () => import("./confirm-recovery.page-MULVPVJG.js").then((m) => m.ConfirmRecoveryPage)
  },
  {
    path: "password/change",
    canActivate: [authGuard],
    loadComponent: () => import("./change-password.page-VZL5K6CT.js").then((m) => m.ChangePasswordPage)
  },
  {
    path: "dashboard",
    canActivate: [authGuard],
    loadComponent: () => import("./dashboard.page-QZTHEGPU.js").then((m) => m.DashboardPage)
  },
  {
    path: "profile",
    canActivate: [authGuard],
    loadComponent: () => import("./profile.page-5OED4XGF.js").then((m) => m.ProfilePage)
  },
  {
    path: "admin",
    canActivate: [authGuard, adminGuard],
    loadComponent: () => import("./admin-panel.page-3KFTYCZF.js").then((m) => m.AdminPanelPage)
  },
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full"
  },
  {
    path: "**",
    redirectTo: "login"
  }
];

// src/app/app.component.ts
var _AppComponent = class _AppComponent {
};
_AppComponent.\u0275fac = function AppComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _AppComponent)();
};
_AppComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AppComponent, selectors: [["app-root"]], decls: 2, vars: 0, template: function AppComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ion-app");
    \u0275\u0275element(1, "ion-router-outlet");
    \u0275\u0275elementEnd();
  }
}, dependencies: [IonApp, IonRouterOutlet], encapsulation: 2 });
var AppComponent = _AppComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AppComponent, [{
    type: Component,
    args: [{ selector: "app-root", standalone: true, imports: [IonApp, IonRouterOutlet], template: "<ion-app>\n  <ion-router-outlet></ion-router-outlet>\n</ion-app>\n" }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AppComponent, { className: "AppComponent", filePath: "src/app/app.component.ts", lineNumber: 10 });
})();

// src/main.ts
bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideHttpClient(withInterceptors([authTokenInterceptor, authErrorInterceptor])),
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules))
  ]
});
//# sourceMappingURL=main.js.map
