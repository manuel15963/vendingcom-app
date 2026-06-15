import {
  AuthApiService
} from "./chunk-IYYVUFSF.js";
import {
  Component,
  IonButton,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  Router,
  RouterLink,
  inject,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-GVVL6FWI.js";
import "./chunk-CXTH33XN.js";
import "./chunk-ZANXXOCD.js";
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

// src/app/features/dashboard/pages/dashboard/dashboard.page.ts
function DashboardPage_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ion-button", 4);
    \u0275\u0275text(1, "Administracion");
    \u0275\u0275elementEnd();
  }
}
var _DashboardPage = class _DashboardPage {
  constructor() {
    this.authApi = inject(AuthApiService);
    this.router = inject(Router);
    this.session = this.authApi.getCurrentSession();
    this.canOpenAdmin = this.authApi.hasAnyRole(["ADMIN", "SUPERVISOR"]);
  }
  logout() {
    this.authApi.logout();
    void this.router.navigateByUrl("/login");
  }
};
_DashboardPage.\u0275fac = function DashboardPage_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _DashboardPage)();
};
_DashboardPage.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DashboardPage, selectors: [["app-dashboard"]], decls: 19, vars: 3, consts: [[1, "dashboard-content"], [1, "dashboard-panel"], [1, "muted"], ["routerLink", "/profile"], ["routerLink", "/admin"], ["routerLink", "/password/change"], [3, "click"]], template: function DashboardPage_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ion-header")(1, "ion-toolbar")(2, "ion-title");
    \u0275\u0275text(3, "VendingCom");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(4, "ion-content", 0)(5, "section", 1)(6, "h1");
    \u0275\u0275text(7, "Panel principal");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "p");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "p", 2);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "ion-button", 3);
    \u0275\u0275text(13, "Mi perfil");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(14, DashboardPage_Conditional_14_Template, 2, 0, "ion-button", 4);
    \u0275\u0275elementStart(15, "ion-button", 5);
    \u0275\u0275text(16, "Cambiar contrasena");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "ion-button", 6);
    \u0275\u0275listener("click", function DashboardPage_Template_ion_button_click_17_listener() {
      return ctx.logout();
    });
    \u0275\u0275text(18, "Cerrar sesion");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate1("Sesion activa para ", (ctx.session == null ? null : ctx.session.fullName) || (ctx.session == null ? null : ctx.session.username) || "usuario", ".");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx.session == null ? null : ctx.session.email);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx.canOpenAdmin ? 14 : -1);
  }
}, dependencies: [
  IonContent,
  RouterLink,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton
], styles: ["\n\n.dashboard-content[_ngcontent-%COMP%] {\n  --background: #f7fafc;\n}\n.dashboard-panel[_ngcontent-%COMP%] {\n  width: min(960px, 100% - 32px);\n  margin: 32px auto;\n}\nh1[_ngcontent-%COMP%] {\n  margin: 0 0 8px;\n  color: #111827;\n  font-size: 28px;\n}\np[_ngcontent-%COMP%] {\n  margin: 0 0 24px;\n  color: #475569;\n}\n.muted[_ngcontent-%COMP%] {\n  margin-top: -16px;\n  color: #64748b;\n}\n/*# sourceMappingURL=dashboard.page.css.map */"] });
var DashboardPage = _DashboardPage;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DashboardPage, [{
    type: Component,
    args: [{ selector: "app-dashboard", standalone: true, imports: [
      IonContent,
      RouterLink,
      IonHeader,
      IonToolbar,
      IonTitle,
      IonButton
    ], template: `<ion-header>
  <ion-toolbar>
    <ion-title>VendingCom</ion-title>
  </ion-toolbar>
</ion-header>

<ion-content class="dashboard-content">
  <section class="dashboard-panel">
    <h1>Panel principal</h1>
    <p>Sesion activa para {{ session?.fullName || session?.username || 'usuario' }}.</p>
    <p class="muted">{{ session?.email }}</p>

    <ion-button routerLink="/profile">Mi perfil</ion-button>
    @if (canOpenAdmin) {
      <ion-button routerLink="/admin">Administracion</ion-button>
    }
    <ion-button routerLink="/password/change">Cambiar contrasena</ion-button>
    <ion-button (click)="logout()">Cerrar sesion</ion-button>
  </section>
</ion-content>
`, styles: ["/* src/app/features/dashboard/pages/dashboard/dashboard.page.scss */\n.dashboard-content {\n  --background: #f7fafc;\n}\n.dashboard-panel {\n  width: min(960px, 100% - 32px);\n  margin: 32px auto;\n}\nh1 {\n  margin: 0 0 8px;\n  color: #111827;\n  font-size: 28px;\n}\np {\n  margin: 0 0 24px;\n  color: #475569;\n}\n.muted {\n  margin-top: -16px;\n  color: #64748b;\n}\n/*# sourceMappingURL=dashboard.page.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DashboardPage, { className: "DashboardPage", filePath: "src/app/features/dashboard/pages/dashboard/dashboard.page.ts", lineNumber: 27 });
})();
export {
  DashboardPage
};
//# sourceMappingURL=dashboard.page-QZTHEGPU.js.map
