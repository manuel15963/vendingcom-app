import {
  ToastService
} from "./chunk-QOL6G5CZ.js";
import {
  AuthApiService
} from "./chunk-IYYVUFSF.js";
import {
  CommonModule,
  Component,
  IonBadge,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonSpinner,
  IonText,
  IonTitle,
  IonToolbar,
  RouterLink,
  inject,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
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

// src/app/features/profile/pages/profile/profile.page.ts
function ProfilePage_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 4);
    \u0275\u0275element(1, "ion-spinner", 7);
    \u0275\u0275elementEnd();
  }
}
function ProfilePage_Conditional_10_For_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ion-badge", 10);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const role_r2 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(role_r2);
  }
}
function ProfilePage_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "article", 5)(1, "div", 8);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div")(4, "span", 9);
    \u0275\u0275text(5, "Usuario autenticado");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "h1");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "p");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "dl")(11, "dt");
    \u0275\u0275text(12, "ID");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "dd");
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "dt");
    \u0275\u0275text(16, "Usuario");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "dd");
    \u0275\u0275text(18);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "dt");
    \u0275\u0275text(20, "Roles");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "dd");
    \u0275\u0275repeaterCreate(22, ProfilePage_Conditional_10_For_23_Template, 2, 1, "ion-badge", 10, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(24, "div", 11)(25, "ion-button", 12);
    \u0275\u0275text(26, "Cambiar contrasena");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "ion-button", 13);
    \u0275\u0275listener("click", function ProfilePage_Conditional_10_Template_ion_button_click_27_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.loadProfile());
    });
    \u0275\u0275text(28, "Actualizar");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r2.profile.fullName.charAt(0) || ctx_r2.profile.username.charAt(0), " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r2.profile.fullName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.profile.email);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r2.profile.userId);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r2.profile.username);
    \u0275\u0275advance(4);
    \u0275\u0275repeater(ctx_r2.profile.roles);
  }
}
function ProfilePage_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ion-text", 6)(1, "p");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.errorMessage);
  }
}
var _ProfilePage = class _ProfilePage {
  constructor() {
    this.authApi = inject(AuthApiService);
    this.toast = inject(ToastService);
    this.profile = null;
    this.loading = false;
    this.errorMessage = "";
  }
  ngOnInit() {
    this.loadProfile();
  }
  loadProfile() {
    this.loading = true;
    this.errorMessage = "";
    this.authApi.me().subscribe({
      next: (profile) => {
        this.profile = profile;
        this.loading = false;
      },
      error: (error) => {
        const apiError = error.error;
        this.loading = false;
        this.errorMessage = apiError?.message || "No se pudo cargar el perfil.";
        void this.toast.error(this.errorMessage);
      }
    });
  }
};
_ProfilePage.\u0275fac = function ProfilePage_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _ProfilePage)();
};
_ProfilePage.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ProfilePage, selectors: [["app-profile"]], decls: 12, vars: 1, consts: [["slot", "end"], ["routerLink", "/dashboard"], [1, "profile-content"], [1, "profile-shell"], [1, "profile-card", "loading-box"], [1, "profile-card"], ["color", "danger"], ["name", "crescent"], [1, "profile-avatar"], [1, "eyebrow"], ["color", "primary"], [1, "profile-actions"], ["routerLink", "/password/change"], ["fill", "outline", 3, "click"]], template: function ProfilePage_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ion-header")(1, "ion-toolbar")(2, "ion-title");
    \u0275\u0275text(3, "Mi perfil");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "ion-buttons", 0)(5, "ion-button", 1);
    \u0275\u0275text(6, "Panel");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(7, "ion-content", 2)(8, "section", 3);
    \u0275\u0275conditionalCreate(9, ProfilePage_Conditional_9_Template, 2, 0, "div", 4)(10, ProfilePage_Conditional_10_Template, 29, 5, "article", 5)(11, ProfilePage_Conditional_11_Template, 3, 1, "ion-text", 6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance(9);
    \u0275\u0275conditional(ctx.loading ? 9 : ctx.profile ? 10 : 11);
  }
}, dependencies: [
  CommonModule,
  RouterLink,
  IonBadge,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonSpinner,
  IonText,
  IonTitle,
  IonToolbar
], encapsulation: 2 });
var ProfilePage = _ProfilePage;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ProfilePage, [{
    type: Component,
    args: [{ selector: "app-profile", standalone: true, imports: [
      CommonModule,
      RouterLink,
      IonBadge,
      IonButton,
      IonButtons,
      IonContent,
      IonHeader,
      IonSpinner,
      IonText,
      IonTitle,
      IonToolbar
    ], template: '<ion-header>\n  <ion-toolbar>\n    <ion-title>Mi perfil</ion-title>\n    <ion-buttons slot="end">\n      <ion-button routerLink="/dashboard">Panel</ion-button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content class="profile-content">\n  <section class="profile-shell">\n    @if (loading) {\n      <div class="profile-card loading-box">\n        <ion-spinner name="crescent"></ion-spinner>\n      </div>\n    } @else if (profile) {\n      <article class="profile-card">\n        <div class="profile-avatar">\n          {{ profile.fullName.charAt(0) || profile.username.charAt(0) }}\n        </div>\n\n        <div>\n          <span class="eyebrow">Usuario autenticado</span>\n          <h1>{{ profile.fullName }}</h1>\n          <p>{{ profile.email }}</p>\n        </div>\n\n        <dl>\n          <dt>ID</dt>\n          <dd>{{ profile.userId }}</dd>\n          <dt>Usuario</dt>\n          <dd>{{ profile.username }}</dd>\n          <dt>Roles</dt>\n          <dd>\n            @for (role of profile.roles; track role) {\n              <ion-badge color="primary">{{ role }}</ion-badge>\n            }\n          </dd>\n        </dl>\n\n        <div class="profile-actions">\n          <ion-button routerLink="/password/change">Cambiar contrasena</ion-button>\n          <ion-button fill="outline" (click)="loadProfile()">Actualizar</ion-button>\n        </div>\n      </article>\n    } @else {\n      <ion-text color="danger">\n        <p>{{ errorMessage }}</p>\n      </ion-text>\n    }\n  </section>\n</ion-content>\n' }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ProfilePage, { className: "ProfilePage", filePath: "src/app/features/profile/pages/profile/profile.page.ts", lineNumber: 40 });
})();
export {
  ProfilePage
};
//# sourceMappingURL=profile.page-5OED4XGF.js.map
