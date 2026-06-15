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

// src/app/features/password/pages/request-recovery/request-recovery.page.ts
function RequestRecoveryPage_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "ion-spinner", 7);
  }
}
function RequestRecoveryPage_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Enviar codigo ");
  }
}
function RequestRecoveryPage_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ion-text", 9)(1, "p");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.errorMessage);
  }
}
function RequestRecoveryPage_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ion-text", 10)(1, "p");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.successMessage);
  }
}
var _RequestRecoveryPage = class _RequestRecoveryPage {
  constructor() {
    this.passwordApi = inject(PasswordApiService);
    this.router = inject(Router);
    this.email = "";
    this.loading = false;
    this.errorMessage = "";
    this.successMessage = "";
  }
  requestRecovery() {
    this.errorMessage = "";
    this.successMessage = "";
    this.loading = true;
    this.passwordApi.requestRecovery({ email: this.email }).subscribe({
      next: (response) => {
        this.loading = false;
        this.successMessage = response.message;
        void this.router.navigate(["/password/recovery/confirm"], {
          queryParams: { email: this.email }
        });
      },
      error: (error) => {
        const apiError = error.error;
        this.loading = false;
        this.errorMessage = apiError?.message || "No se pudo solicitar el codigo.";
      }
    });
  }
};
_RequestRecoveryPage.\u0275fac = function RequestRecoveryPage_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _RequestRecoveryPage)();
};
_RequestRecoveryPage.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _RequestRecoveryPage, selectors: [["app-request-recovery"]], decls: 18, vars: 5, consts: [[1, "auth-content"], [1, "auth-wrapper"], [1, "auth-card"], [1, "subtitle"], ["position", "floating"], ["name", "email", "type", "email", 3, "ngModelChange", "ngModel"], ["expand", "block", 1, "primary-button", 3, "click", "disabled"], ["name", "crescent"], ["fill", "clear", "expand", "block", "routerLink", "/login"], ["color", "danger"], ["color", "success"]], template: function RequestRecoveryPage_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ion-content", 0)(1, "div", 1)(2, "div", 2)(3, "h1");
    \u0275\u0275text(4, "Recuperar contrasena");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 3);
    \u0275\u0275text(6, "Ingresa tu correo registrado.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "ion-item")(8, "ion-label", 4);
    \u0275\u0275text(9, "Correo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "ion-input", 5);
    \u0275\u0275twoWayListener("ngModelChange", function RequestRecoveryPage_Template_ion_input_ngModelChange_10_listener($event) {
      \u0275\u0275twoWayBindingSet(ctx.email, $event) || (ctx.email = $event);
      return $event;
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "ion-button", 6);
    \u0275\u0275listener("click", function RequestRecoveryPage_Template_ion_button_click_11_listener() {
      return ctx.requestRecovery();
    });
    \u0275\u0275conditionalCreate(12, RequestRecoveryPage_Conditional_12_Template, 1, 0, "ion-spinner", 7)(13, RequestRecoveryPage_Conditional_13_Template, 1, 0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "ion-button", 8);
    \u0275\u0275text(15, " Volver al login ");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(16, RequestRecoveryPage_Conditional_16_Template, 3, 1, "ion-text", 9);
    \u0275\u0275conditionalCreate(17, RequestRecoveryPage_Conditional_17_Template, 3, 1, "ion-text", 10);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    \u0275\u0275advance(10);
    \u0275\u0275twoWayProperty("ngModel", ctx.email);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx.loading || !ctx.email);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.loading ? 12 : 13);
    \u0275\u0275advance(4);
    \u0275\u0275conditional(ctx.errorMessage ? 16 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.successMessage ? 17 : -1);
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
], styles: ["\n\n.auth-content[_ngcontent-%COMP%] {\n  --background:\n    linear-gradient(\n      135deg,\n      #07111f,\n      #111827);\n}\n.auth-wrapper[_ngcontent-%COMP%] {\n  min-height: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 24px;\n}\n.auth-card[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 440px;\n  padding: 28px;\n  border-radius: 8px;\n  background: rgba(15, 23, 42, 0.96);\n  border: 1px solid rgba(148, 163, 184, 0.25);\n  box-shadow: 0 24px 70px rgba(0, 0, 0, 0.45);\n}\nh1[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 30px;\n  font-weight: 800;\n  color: #ffffff;\n}\n.subtitle[_ngcontent-%COMP%] {\n  margin-top: 8px;\n  margin-bottom: 28px;\n  color: #94a3b8;\n}\nion-item[_ngcontent-%COMP%] {\n  --background: transparent;\n  --color: #ffffff;\n  --border-color: rgba(148, 163, 184, 0.35);\n  margin-bottom: 14px;\n}\nion-label[_ngcontent-%COMP%] {\n  color: #cbd5e1 !important;\n}\nion-input[_ngcontent-%COMP%] {\n  --color: #ffffff;\n}\n.primary-button[_ngcontent-%COMP%] {\n  margin-top: 22px;\n  height: 48px;\n  --border-radius: 8px;\n  font-weight: 700;\n}\nion-text[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin-top: 18px;\n  text-align: center;\n}\n/*# sourceMappingURL=request-recovery.page.css.map */"] });
var RequestRecoveryPage = _RequestRecoveryPage;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RequestRecoveryPage, [{
    type: Component,
    args: [{ selector: "app-request-recovery", standalone: true, imports: [
      FormsModule,
      RouterLink,
      IonContent,
      IonItem,
      IonLabel,
      IonInput,
      IonButton,
      IonText,
      IonSpinner
    ], template: '<ion-content class="auth-content">\n  <div class="auth-wrapper">\n    <div class="auth-card">\n      <h1>Recuperar contrasena</h1>\n      <p class="subtitle">Ingresa tu correo registrado.</p>\n\n      <ion-item>\n        <ion-label position="floating">Correo</ion-label>\n        <ion-input\n          [(ngModel)]="email"\n          name="email"\n          type="email">\n        </ion-input>\n      </ion-item>\n\n      <ion-button\n        expand="block"\n        class="primary-button"\n        [disabled]="loading || !email"\n        (click)="requestRecovery()">\n        @if (loading) {\n          <ion-spinner name="crescent"></ion-spinner>\n        } @else {\n          Enviar codigo\n        }\n      </ion-button>\n\n      <ion-button fill="clear" expand="block" routerLink="/login">\n        Volver al login\n      </ion-button>\n\n      @if (errorMessage) {\n        <ion-text color="danger">\n          <p>{{ errorMessage }}</p>\n        </ion-text>\n      }\n\n      @if (successMessage) {\n        <ion-text color="success">\n          <p>{{ successMessage }}</p>\n        </ion-text>\n      }\n    </div>\n  </div>\n</ion-content>\n', styles: ["/* src/app/features/password/pages/request-recovery/request-recovery.page.scss */\n.auth-content {\n  --background:\n    linear-gradient(\n      135deg,\n      #07111f,\n      #111827);\n}\n.auth-wrapper {\n  min-height: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 24px;\n}\n.auth-card {\n  width: 100%;\n  max-width: 440px;\n  padding: 28px;\n  border-radius: 8px;\n  background: rgba(15, 23, 42, 0.96);\n  border: 1px solid rgba(148, 163, 184, 0.25);\n  box-shadow: 0 24px 70px rgba(0, 0, 0, 0.45);\n}\nh1 {\n  margin: 0;\n  font-size: 30px;\n  font-weight: 800;\n  color: #ffffff;\n}\n.subtitle {\n  margin-top: 8px;\n  margin-bottom: 28px;\n  color: #94a3b8;\n}\nion-item {\n  --background: transparent;\n  --color: #ffffff;\n  --border-color: rgba(148, 163, 184, 0.35);\n  margin-bottom: 14px;\n}\nion-label {\n  color: #cbd5e1 !important;\n}\nion-input {\n  --color: #ffffff;\n}\n.primary-button {\n  margin-top: 22px;\n  height: 48px;\n  --border-radius: 8px;\n  font-weight: 700;\n}\nion-text p {\n  margin-top: 18px;\n  text-align: center;\n}\n/*# sourceMappingURL=request-recovery.page.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(RequestRecoveryPage, { className: "RequestRecoveryPage", filePath: "src/app/features/password/pages/request-recovery/request-recovery.page.ts", lineNumber: 35 });
})();
export {
  RequestRecoveryPage
};
//# sourceMappingURL=request-recovery.page-G5FHXM3U.js.map
