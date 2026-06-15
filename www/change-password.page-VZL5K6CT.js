import {
  PasswordApiService
} from "./chunk-5MRZKIHQ.js";
import {
  Component,
  FormsModule,
  IonButton,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonSpinner,
  IonText,
  NgControlStatus,
  NgModel,
  Router,
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
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
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

// src/app/features/password/pages/change-password/change-password.page.ts
function ChangePasswordPage_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "ion-spinner", 8);
  }
}
function ChangePasswordPage_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Guardar contrasena ");
  }
}
function ChangePasswordPage_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ion-text", 10)(1, "p");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.errorMessage);
  }
}
function ChangePasswordPage_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ion-text", 11)(1, "p");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.successMessage);
  }
}
var _ChangePasswordPage = class _ChangePasswordPage {
  constructor() {
    this.passwordApi = inject(PasswordApiService);
    this.router = inject(Router);
    this.currentPassword = "";
    this.newPassword = "";
    this.loading = false;
    this.errorMessage = "";
    this.successMessage = "";
  }
  changePassword() {
    this.errorMessage = "";
    this.successMessage = "";
    this.loading = true;
    this.passwordApi.changeMyPassword({
      currentPassword: this.currentPassword,
      newPassword: this.newPassword
    }).subscribe({
      next: (response) => {
        this.loading = false;
        this.successMessage = response.message;
        void this.router.navigateByUrl("/dashboard");
      },
      error: (error) => {
        const apiError = error.error;
        this.loading = false;
        this.errorMessage = apiError?.message || "No se pudo cambiar la contrasena.";
      }
    });
  }
};
_ChangePasswordPage.\u0275fac = function ChangePasswordPage_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _ChangePasswordPage)();
};
_ChangePasswordPage.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ChangePasswordPage, selectors: [["app-change-password"]], decls: 22, vars: 6, consts: [[1, "auth-content"], [1, "auth-wrapper"], [1, "auth-card"], [1, "subtitle"], ["position", "floating"], ["name", "currentPassword", "type", "password", 3, "ngModelChange", "ngModel"], ["name", "newPassword", "type", "password", 3, "ngModelChange", "ngModel"], ["expand", "block", 1, "primary-button", 3, "click", "disabled"], ["name", "crescent"], ["fill", "clear", "expand", "block", "routerLink", "/dashboard"], ["color", "danger"], ["color", "success"]], template: function ChangePasswordPage_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ion-content", 0)(1, "div", 1)(2, "div", 2)(3, "h1");
    \u0275\u0275text(4, "Cambiar contrasena");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 3);
    \u0275\u0275text(6, "Actualiza la contrasena de tu cuenta.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "ion-item")(8, "ion-label", 4);
    \u0275\u0275text(9, "Contrasena actual");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "ion-input", 5);
    \u0275\u0275twoWayListener("ngModelChange", function ChangePasswordPage_Template_ion_input_ngModelChange_10_listener($event) {
      \u0275\u0275twoWayBindingSet(ctx.currentPassword, $event) || (ctx.currentPassword = $event);
      return $event;
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "ion-item")(12, "ion-label", 4);
    \u0275\u0275text(13, "Nueva contrasena");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "ion-input", 6);
    \u0275\u0275twoWayListener("ngModelChange", function ChangePasswordPage_Template_ion_input_ngModelChange_14_listener($event) {
      \u0275\u0275twoWayBindingSet(ctx.newPassword, $event) || (ctx.newPassword = $event);
      return $event;
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "ion-button", 7);
    \u0275\u0275listener("click", function ChangePasswordPage_Template_ion_button_click_15_listener() {
      return ctx.changePassword();
    });
    \u0275\u0275conditionalCreate(16, ChangePasswordPage_Conditional_16_Template, 1, 0, "ion-spinner", 8)(17, ChangePasswordPage_Conditional_17_Template, 1, 0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "ion-button", 9);
    \u0275\u0275text(19, " Volver ");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(20, ChangePasswordPage_Conditional_20_Template, 3, 1, "ion-text", 10);
    \u0275\u0275conditionalCreate(21, ChangePasswordPage_Conditional_21_Template, 3, 1, "ion-text", 11);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    \u0275\u0275advance(10);
    \u0275\u0275twoWayProperty("ngModel", ctx.currentPassword);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx.newPassword);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx.loading || ctx.currentPassword.length < 6 || ctx.newPassword.length < 6);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.loading ? 16 : 17);
    \u0275\u0275advance(4);
    \u0275\u0275conditional(ctx.errorMessage ? 20 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.successMessage ? 21 : -1);
  }
}, dependencies: [
  FormsModule,
  NgControlStatus,
  NgModel,
  RouterLink,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonText,
  IonSpinner
], styles: ["\n\n.auth-content[_ngcontent-%COMP%] {\n  --background:\n    linear-gradient(\n      135deg,\n      #07111f,\n      #111827);\n}\n.auth-wrapper[_ngcontent-%COMP%] {\n  min-height: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 24px;\n}\n.auth-card[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 440px;\n  padding: 28px;\n  border-radius: 8px;\n  background: rgba(15, 23, 42, 0.96);\n  border: 1px solid rgba(148, 163, 184, 0.25);\n  box-shadow: 0 24px 70px rgba(0, 0, 0, 0.45);\n}\nh1[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 30px;\n  font-weight: 800;\n  color: #ffffff;\n}\n.subtitle[_ngcontent-%COMP%] {\n  margin-top: 8px;\n  margin-bottom: 28px;\n  color: #94a3b8;\n}\nion-item[_ngcontent-%COMP%] {\n  --background: transparent;\n  --color: #ffffff;\n  --border-color: rgba(148, 163, 184, 0.35);\n  margin-bottom: 14px;\n}\nion-label[_ngcontent-%COMP%] {\n  color: #cbd5e1 !important;\n}\nion-input[_ngcontent-%COMP%] {\n  --color: #ffffff;\n}\n.primary-button[_ngcontent-%COMP%] {\n  margin-top: 22px;\n  height: 48px;\n  --border-radius: 8px;\n  font-weight: 700;\n}\nion-text[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin-top: 18px;\n  text-align: center;\n}\n/*# sourceMappingURL=change-password.page.css.map */"] });
var ChangePasswordPage = _ChangePasswordPage;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ChangePasswordPage, [{
    type: Component,
    args: [{ selector: "app-change-password", standalone: true, imports: [
      FormsModule,
      RouterLink,
      IonContent,
      IonItem,
      IonLabel,
      IonInput,
      IonButton,
      IonText,
      IonSpinner
    ], template: '<ion-content class="auth-content">\n  <div class="auth-wrapper">\n    <div class="auth-card">\n      <h1>Cambiar contrasena</h1>\n      <p class="subtitle">Actualiza la contrasena de tu cuenta.</p>\n\n      <ion-item>\n        <ion-label position="floating">Contrasena actual</ion-label>\n        <ion-input\n          [(ngModel)]="currentPassword"\n          name="currentPassword"\n          type="password">\n        </ion-input>\n      </ion-item>\n\n      <ion-item>\n        <ion-label position="floating">Nueva contrasena</ion-label>\n        <ion-input\n          [(ngModel)]="newPassword"\n          name="newPassword"\n          type="password">\n        </ion-input>\n      </ion-item>\n\n      <ion-button\n        expand="block"\n        class="primary-button"\n        [disabled]="loading || currentPassword.length < 6 || newPassword.length < 6"\n        (click)="changePassword()">\n        @if (loading) {\n          <ion-spinner name="crescent"></ion-spinner>\n        } @else {\n          Guardar contrasena\n        }\n      </ion-button>\n\n      <ion-button fill="clear" expand="block" routerLink="/dashboard">\n        Volver\n      </ion-button>\n\n      @if (errorMessage) {\n        <ion-text color="danger">\n          <p>{{ errorMessage }}</p>\n        </ion-text>\n      }\n\n      @if (successMessage) {\n        <ion-text color="success">\n          <p>{{ successMessage }}</p>\n        </ion-text>\n      }\n    </div>\n  </div>\n</ion-content>\n', styles: ["/* src/app/features/password/pages/change-password/change-password.page.scss */\n.auth-content {\n  --background:\n    linear-gradient(\n      135deg,\n      #07111f,\n      #111827);\n}\n.auth-wrapper {\n  min-height: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 24px;\n}\n.auth-card {\n  width: 100%;\n  max-width: 440px;\n  padding: 28px;\n  border-radius: 8px;\n  background: rgba(15, 23, 42, 0.96);\n  border: 1px solid rgba(148, 163, 184, 0.25);\n  box-shadow: 0 24px 70px rgba(0, 0, 0, 0.45);\n}\nh1 {\n  margin: 0;\n  font-size: 30px;\n  font-weight: 800;\n  color: #ffffff;\n}\n.subtitle {\n  margin-top: 8px;\n  margin-bottom: 28px;\n  color: #94a3b8;\n}\nion-item {\n  --background: transparent;\n  --color: #ffffff;\n  --border-color: rgba(148, 163, 184, 0.35);\n  margin-bottom: 14px;\n}\nion-label {\n  color: #cbd5e1 !important;\n}\nion-input {\n  --color: #ffffff;\n}\n.primary-button {\n  margin-top: 22px;\n  height: 48px;\n  --border-radius: 8px;\n  font-weight: 700;\n}\nion-text p {\n  margin-top: 18px;\n  text-align: center;\n}\n/*# sourceMappingURL=change-password.page.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ChangePasswordPage, { className: "ChangePasswordPage", filePath: "src/app/features/password/pages/change-password/change-password.page.ts", lineNumber: 35 });
})();
export {
  ChangePasswordPage
};
//# sourceMappingURL=change-password.page-VZL5K6CT.js.map
