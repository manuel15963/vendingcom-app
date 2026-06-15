import {
  AuthApiService
} from "./chunk-IYYVUFSF.js";
import {
  Component,
  FormsModule,
  IonButton,
  IonContent,
  IonInput,
  IonSpinner,
  NgControlStatus,
  NgControlStatusGroup,
  NgForm,
  NgModel,
  Router,
  RouterLink,
  inject,
  setClassMetadata,
  ɵNgNoValidate,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
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

// src/app/features/auth/pages/login/login.page.ts
function LoginPage_Conditional_70_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 30);
  }
}
function LoginPage_Conditional_75_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "ion-spinner", 33);
  }
}
function LoginPage_Conditional_76_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 41);
    \u0275\u0275elementStart(1, "span");
    \u0275\u0275text(2, "Iniciar sesion");
    \u0275\u0275elementEnd();
  }
}
function LoginPage_Conditional_96_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 40)(1, "div", 42);
    \u0275\u0275text(2, "!");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 43)(4, "strong");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "button", 44);
    \u0275\u0275listener("click", function LoginPage_Conditional_96_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeErrorToast());
    });
    \u0275\u0275text(9, "x");
    \u0275\u0275elementEnd();
    \u0275\u0275element(10, "div", 45);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.errorToastTitle);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.errorToastMessage);
  }
}
var _LoginPage = class _LoginPage {
  constructor() {
    this.authApi = inject(AuthApiService);
    this.router = inject(Router);
    this.username = "admin";
    this.password = "123software";
    this.rememberMe = true;
    this.showPassword = false;
    this.loading = false;
    this.errorMessage = "";
    this.errorToastOpen = false;
    this.errorToastTitle = "";
    this.errorToastMessage = "";
    this.successMessage = "";
    if (!this.authApi.isAuthenticated()) {
      this.authApi.logout();
    }
  }
  login() {
    this.errorMessage = "";
    this.successMessage = "";
    if (!this.username.trim() || !this.password.trim()) {
      this.openLoginErrorToast("Datos incompletos", "Ingresa tu usuario y contrasena para continuar.");
      return;
    }
    this.loading = true;
    this.authApi.login({
      username: this.username,
      password: this.password
    }).subscribe({
      next: (response) => {
        this.loading = false;
        this.successMessage = `Bienvenido ${response.username}. Login correcto.`;
        void this.router.navigateByUrl("/dashboard");
      },
      error: (error) => {
        const apiError = error.error;
        this.loading = false;
        this.openLoginErrorToast(this.getErrorTitle(error, apiError), this.getFallbackErrorMessage(error, apiError));
      }
    });
  }
  closeErrorToast() {
    this.errorToastOpen = false;
    if (this.errorToastTimer) {
      window.clearTimeout(this.errorToastTimer);
      this.errorToastTimer = void 0;
    }
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  toggleRememberMe() {
    this.rememberMe = !this.rememberMe;
  }
  openLoginErrorToast(title, message) {
    if (this.errorToastTimer) {
      window.clearTimeout(this.errorToastTimer);
    }
    this.errorMessage = message;
    this.errorToastTitle = title;
    this.errorToastMessage = message;
    this.errorToastOpen = true;
    this.errorToastTimer = window.setTimeout(() => {
      this.errorToastOpen = false;
      this.errorToastTimer = void 0;
    }, 3800);
  }
  getErrorTitle(error, apiError) {
    if (error.status === 0) {
      return "Servicio no disponible";
    }
    const apiMessage = (apiError?.message || "").toLowerCase();
    if (error.status === 401 || error.status === 403) {
      if (apiMessage.includes("bloque") || apiMessage.includes("locked")) {
        return "Usuario bloqueado";
      }
      if (apiMessage.includes("inactivo") || apiMessage.includes("inactive")) {
        return "Usuario inactivo";
      }
      return "Credenciales incorrectas";
    }
    return "No se pudo iniciar sesion";
  }
  getFallbackErrorMessage(error, apiError) {
    const apiMessage = apiError?.message || "";
    const normalizedMessage = apiMessage.toLowerCase();
    if (error.status === 0) {
      return "No pudimos conectar con autenticacion. Intenta nuevamente en unos segundos.";
    }
    if (error.status === 401 || error.status === 403) {
      if (normalizedMessage.includes("bloque") || normalizedMessage.includes("locked")) {
        return "Tu cuenta esta bloqueada y no puede iniciar sesion por ahora.";
      }
      if (normalizedMessage.includes("inactivo") || normalizedMessage.includes("inactive")) {
        return "Tu cuenta esta inactiva. Solicita la activacion a un administrador.";
      }
      return "El usuario o la contrasena no coinciden.";
    }
    return apiMessage || "Ocurrio un problema al validar tus credenciales. Intenta nuevamente.";
  }
};
_LoginPage.\u0275fac = function LoginPage_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _LoginPage)();
};
_LoginPage.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LoginPage, selectors: [["app-login"]], decls: 97, vars: 9, consts: [["fullscreen", "", 1, "login-page"], [1, "login-content"], [1, "login-screen"], ["aria-label", "Presentacion VendingCom", 1, "brand-panel"], [1, "brand-glow"], ["src", "assets/brand/vendingcom-logo-from-mockup.png", "alt", "VendingCom", 1, "brand-logo"], [1, "brand-copy"], [1, "feature-list"], [1, "feature-item"], ["src", "assets/icon/shield.svg", "alt", ""], ["src", "assets/icon/bolt.svg", "alt", ""], ["src", "assets/icon/chart.svg", "alt", ""], ["src", "assets/icon/support.svg", "alt", ""], [1, "copyright-box"], ["src", "assets/icon/lock.svg", "alt", ""], ["aria-label", "Inicio de sesion", 1, "auth-panel"], [1, "user-emblem"], ["src", "assets/icon/user-circle.svg", "alt", ""], [1, "auth-heading"], [1, "login-form", 3, "ngSubmit"], ["for", "username", 1, "field-label"], [1, "field-shell"], ["src", "assets/icon/user.svg", "alt", ""], ["id", "username", "name", "username", "type", "text", "placeholder", "Ingresa tu usuario", 3, "ngModelChange", "ngModel"], ["for", "password", 1, "field-label", "accent"], ["id", "password", "name", "password", "placeholder", "Ingresa tu contrasena", 3, "ngModelChange", "ngModel", "type"], ["type", "button", "aria-label", "Mostrar contrasena", 1, "icon-button", 3, "click"], ["src", "assets/icon/eye.svg", "alt", ""], [1, "form-options"], ["type", "button", 1, "remember-option", 3, "click"], ["src", "assets/icon/checkbox-check.svg", "alt", ""], ["routerLink", "/password/recovery"], ["expand", "block", "type", "submit", 1, "login-button", 3, "disabled"], ["name", "crescent"], [1, "divider"], [1, "social-actions"], ["type", "button"], ["src", "assets/icon/google.svg", "alt", ""], ["src", "assets/icon/microsoft.svg", "alt", ""], [1, "secure-note"], ["role", "alert", "aria-live", "assertive", 1, "login-feedback-panel"], ["src", "assets/icon/login-arrow.svg", "alt", ""], [1, "login-feedback-icon"], [1, "login-feedback-copy"], ["type", "button", "aria-label", "Cerrar alerta", 3, "click"], [1, "login-feedback-progress"]], template: function LoginPage_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ion-content", 0)(1, "div", 1)(2, "main", 2)(3, "section", 3);
    \u0275\u0275element(4, "div", 4)(5, "img", 5);
    \u0275\u0275elementStart(6, "div", 6)(7, "h1");
    \u0275\u0275text(8, "Soluciones ");
    \u0275\u0275elementStart(9, "span");
    \u0275\u0275text(10, "Inteligentes");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "p");
    \u0275\u0275text(12, "para un futuro eficiente");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "div", 7)(14, "article", 8);
    \u0275\u0275element(15, "img", 9);
    \u0275\u0275elementStart(16, "div")(17, "strong");
    \u0275\u0275text(18, "Seguro");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "span");
    \u0275\u0275text(20, "Protegemos tu informacion con altos estandares.");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(21, "article", 8);
    \u0275\u0275element(22, "img", 10);
    \u0275\u0275elementStart(23, "div")(24, "strong");
    \u0275\u0275text(25, "Confiable");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "span");
    \u0275\u0275text(27, "Sistema estable y disponible todo el tiempo.");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(28, "article", 8);
    \u0275\u0275element(29, "img", 11);
    \u0275\u0275elementStart(30, "div")(31, "strong");
    \u0275\u0275text(32, "Eficiente");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "span");
    \u0275\u0275text(34, "Gestion inteligente para mejores resultados.");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(35, "article", 8);
    \u0275\u0275element(36, "img", 12);
    \u0275\u0275elementStart(37, "div")(38, "strong");
    \u0275\u0275text(39, "Soporte");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(40, "span");
    \u0275\u0275text(41, "Estamos contigo en cada paso del camino.");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(42, "div", 13);
    \u0275\u0275element(43, "img", 14);
    \u0275\u0275elementStart(44, "span");
    \u0275\u0275text(45, "2026 VendingCom. Todos los derechos reservados.");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(46, "section", 15)(47, "div", 16);
    \u0275\u0275element(48, "img", 17);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(49, "div", 18)(50, "h2");
    \u0275\u0275text(51, "Bienvenido de nuevo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(52, "p");
    \u0275\u0275text(53, "Inicia sesion para continuar");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(54, "form", 19);
    \u0275\u0275listener("ngSubmit", function LoginPage_Template_form_ngSubmit_54_listener() {
      return ctx.login();
    });
    \u0275\u0275elementStart(55, "label", 20);
    \u0275\u0275text(56, "Usuario");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(57, "div", 21);
    \u0275\u0275element(58, "img", 22);
    \u0275\u0275elementStart(59, "ion-input", 23);
    \u0275\u0275twoWayListener("ngModelChange", function LoginPage_Template_ion_input_ngModelChange_59_listener($event) {
      \u0275\u0275twoWayBindingSet(ctx.username, $event) || (ctx.username = $event);
      return $event;
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(60, "label", 24);
    \u0275\u0275text(61, "Contrasena");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(62, "div", 21);
    \u0275\u0275element(63, "img", 14);
    \u0275\u0275elementStart(64, "ion-input", 25);
    \u0275\u0275twoWayListener("ngModelChange", function LoginPage_Template_ion_input_ngModelChange_64_listener($event) {
      \u0275\u0275twoWayBindingSet(ctx.password, $event) || (ctx.password = $event);
      return $event;
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(65, "button", 26);
    \u0275\u0275listener("click", function LoginPage_Template_button_click_65_listener() {
      return ctx.togglePasswordVisibility();
    });
    \u0275\u0275element(66, "img", 27);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(67, "div", 28)(68, "button", 29);
    \u0275\u0275listener("click", function LoginPage_Template_button_click_68_listener() {
      return ctx.toggleRememberMe();
    });
    \u0275\u0275elementStart(69, "span");
    \u0275\u0275conditionalCreate(70, LoginPage_Conditional_70_Template, 1, 0, "img", 30);
    \u0275\u0275elementEnd();
    \u0275\u0275text(71, " Recordarme ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(72, "a", 31);
    \u0275\u0275text(73, "Olvidaste tu contrasena?");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(74, "ion-button", 32);
    \u0275\u0275conditionalCreate(75, LoginPage_Conditional_75_Template, 1, 0, "ion-spinner", 33)(76, LoginPage_Conditional_76_Template, 3, 0);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(77, "div", 34);
    \u0275\u0275element(78, "span");
    \u0275\u0275elementStart(79, "p");
    \u0275\u0275text(80, "o continua con");
    \u0275\u0275elementEnd();
    \u0275\u0275element(81, "span");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(82, "div", 35)(83, "button", 36);
    \u0275\u0275element(84, "img", 37);
    \u0275\u0275text(85, " Google ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(86, "button", 36);
    \u0275\u0275element(87, "img", 38);
    \u0275\u0275text(88, " Microsoft ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(89, "div", 39);
    \u0275\u0275element(90, "img", 9);
    \u0275\u0275elementStart(91, "div")(92, "strong");
    \u0275\u0275text(93, "Acceso seguro y protegido");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(94, "span");
    \u0275\u0275text(95, "Tus datos estan protegidos con encriptacion de nivel empresarial.");
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275conditionalCreate(96, LoginPage_Conditional_96_Template, 11, 2, "div", 40);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance(59);
    \u0275\u0275twoWayProperty("ngModel", ctx.username);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx.password);
    \u0275\u0275property("type", ctx.showPassword ? "text" : "password");
    \u0275\u0275advance(4);
    \u0275\u0275classProp("active", ctx.rememberMe);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx.rememberMe ? 70 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", ctx.loading);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.loading ? 75 : 76);
    \u0275\u0275advance(21);
    \u0275\u0275conditional(ctx.errorToastOpen ? 96 : -1);
  }
}, dependencies: [
  FormsModule,
  \u0275NgNoValidate,
  NgControlStatus,
  NgControlStatusGroup,
  NgModel,
  NgForm,
  RouterLink,
  IonContent,
  IonInput,
  IonButton,
  IonSpinner
], styles: ['\n\n[_nghost-%COMP%] {\n  display: block;\n  min-height: 100vh;\n  background: #030814;\n}\n.login-page[_ngcontent-%COMP%] {\n  --background: #030814;\n}\n.login-content[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  min-height: 100%;\n  padding: 16px 0;\n  background:\n    radial-gradient(\n      circle at 48% 100%,\n      rgba(0, 102, 255, 0.18),\n      transparent 26%),\n    #030814;\n  font-family:\n    Inter,\n    system-ui,\n    -apple-system,\n    BlinkMacSystemFont,\n    "Segoe UI",\n    sans-serif;\n}\n.login-screen[_ngcontent-%COMP%] {\n  position: relative;\n  display: grid;\n  grid-template-columns: minmax(0, 1.18fr) minmax(430px, 0.82fr);\n  gap: 0;\n  width: min(1504px, 100% - 28px);\n  min-height: calc(100vh - 32px);\n  margin: 0 auto;\n  overflow: hidden;\n  border: 1px solid rgba(0, 128, 255, 0.82);\n  border-radius: 26px;\n  background:\n    radial-gradient(\n      circle at 52% 94%,\n      rgba(34, 197, 94, 0.28) 0,\n      transparent 18%),\n    radial-gradient(\n      circle at 55% 84%,\n      rgba(0, 102, 255, 0.48) 0,\n      transparent 22%),\n    linear-gradient(\n      135deg,\n      #020714 0%,\n      #050b1b 52%,\n      #061224 100%);\n  box-shadow: 0 0 34px rgba(0, 128, 255, 0.34), 0 28px 95px rgba(0, 0, 0, 0.62);\n}\n.brand-panel[_ngcontent-%COMP%], \n.auth-panel[_ngcontent-%COMP%] {\n  position: relative;\n  min-width: 0;\n}\n.brand-panel[_ngcontent-%COMP%] {\n  min-height: 760px;\n  padding: 34px 36px 22px;\n  overflow: hidden;\n  background:\n    linear-gradient(\n      90deg,\n      rgba(2, 6, 23, 0.1),\n      rgba(2, 6, 23, 0.08)),\n    url(/assets/images/login-full-reference.png) left center/180% 100% no-repeat;\n}\n.brand-panel[_ngcontent-%COMP%]::before {\n  display: none;\n}\n.brand-panel[_ngcontent-%COMP%]::after {\n  display: none;\n}\n.brand-glow[_ngcontent-%COMP%] {\n  display: none;\n}\n.brand-panel[_ngcontent-%COMP%]   .brand-logo[_ngcontent-%COMP%], \n.brand-panel[_ngcontent-%COMP%]   .brand-copy[_ngcontent-%COMP%], \n.brand-panel[_ngcontent-%COMP%]   .feature-list[_ngcontent-%COMP%], \n.brand-panel[_ngcontent-%COMP%]   .copyright-box[_ngcontent-%COMP%] {\n  visibility: hidden;\n}\n.brand-logo[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 4;\n  width: min(540px, 54%);\n  height: auto;\n  margin-bottom: 58px;\n  mix-blend-mode: screen;\n  opacity: 0.98;\n  filter: drop-shadow(0 16px 32px rgba(0, 102, 255, 0.38)) saturate(1.18) contrast(1.08);\n}\n.brand-copy[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 4;\n  width: min(420px, 44%);\n}\n.brand-copy[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%], \n.auth-heading[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%], \n.brand-copy[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], \n.auth-heading[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n}\n.brand-copy[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  color: #ffffff;\n  font-size: clamp(42px, 4.2vw, 64px);\n  line-height: 1.02;\n  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.52);\n}\n.brand-copy[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 8px;\n  background:\n    linear-gradient(\n      90deg,\n      #0b74ff 0%,\n      #24a7ff 42%,\n      #62e213 100%);\n  -webkit-background-clip: text;\n  background-clip: text;\n  color: transparent;\n}\n.brand-copy[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin-top: 18px;\n  color: #ffffff;\n  font-size: clamp(20px, 2vw, 28px);\n  line-height: 1.25;\n}\n.feature-list[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 4;\n  display: grid;\n  gap: 12px;\n  width: min(330px, 40%);\n  margin-top: 34px;\n}\n.feature-item[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 62px minmax(0, 1fr);\n  align-items: center;\n  gap: 14px;\n  min-height: 92px;\n  padding: 14px;\n  border: 1px solid rgba(0, 128, 255, 0.18);\n  border-radius: 8px;\n  background: rgba(3, 10, 26, 0.58);\n  box-shadow: 0 18px 36px rgba(0, 0, 0, 0.22);\n  -webkit-backdrop-filter: blur(12px);\n  backdrop-filter: blur(12px);\n}\n.feature-item[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 58px;\n  height: 58px;\n  padding: 11px;\n  border-radius: 50%;\n  background: rgba(0, 113, 255, 0.13);\n  box-shadow: 0 0 26px rgba(0, 113, 255, 0.24);\n}\n.feature-item[_ngcontent-%COMP%]:nth-child(even)   img[_ngcontent-%COMP%] {\n  background: rgba(77, 255, 0, 0.12);\n  box-shadow: 0 0 26px rgba(77, 255, 0, 0.2);\n}\n.feature-item[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], \n.feature-item[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: block;\n}\n.feature-item[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #ffffff;\n  font-size: 16px;\n  font-weight: 900;\n}\n.feature-item[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  margin-top: 6px;\n  color: #c8d3e4;\n  font-size: 14px;\n  line-height: 1.35;\n}\n.copyright-box[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 22px;\n  left: 36px;\n  z-index: 4;\n  display: inline-flex;\n  align-items: center;\n  gap: 12px;\n  max-width: 460px;\n  min-height: 58px;\n  padding: 13px 18px;\n  border: 1px solid rgba(0, 128, 255, 0.18);\n  border-radius: 8px;\n  background: rgba(5, 15, 35, 0.72);\n  color: #d6deea;\n  font-size: 14px;\n  -webkit-backdrop-filter: blur(12px);\n  backdrop-filter: blur(12px);\n}\n.copyright-box[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 22px;\n  height: 22px;\n}\n.auth-panel[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  min-height: 760px;\n  padding: 44px min(52px, 5vw);\n  border-left: 1px solid rgba(0, 128, 255, 0.82);\n  border-radius: 26px;\n  background:\n    radial-gradient(\n      circle at 50% 8%,\n      rgba(0, 128, 255, 0.22) 0,\n      transparent 26%),\n    linear-gradient(\n      180deg,\n      rgba(5, 16, 38, 0.98) 0%,\n      rgba(3, 10, 25, 0.98) 100%);\n  box-shadow: -18px 0 60px rgba(0, 102, 255, 0.18), inset 0 0 60px rgba(0, 128, 255, 0.08);\n}\n.user-emblem[_ngcontent-%COMP%] {\n  display: grid;\n  place-items: center;\n  width: 104px;\n  height: 104px;\n  margin: 0 auto 18px;\n  border: 1px solid rgba(0, 128, 255, 0.95);\n  border-radius: 50%;\n  background:\n    radial-gradient(\n      circle,\n      rgba(0, 128, 255, 0.2),\n      rgba(0, 128, 255, 0.04));\n  box-shadow: 0 0 36px rgba(0, 128, 255, 0.48), inset 0 0 24px rgba(0, 128, 255, 0.2);\n}\n.user-emblem[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 54px;\n  height: 54px;\n}\n.auth-heading[_ngcontent-%COMP%] {\n  text-align: center;\n}\n.auth-heading[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  color: #ffffff;\n  font-size: clamp(28px, 3vw, 34px);\n  line-height: 1.1;\n  text-shadow: 0 6px 22px rgba(0, 0, 0, 0.35);\n}\n.auth-heading[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin-top: 14px;\n  color: #cbd5e1;\n  font-size: 20px;\n}\n.login-form[_ngcontent-%COMP%] {\n  margin-top: 28px;\n}\n.field-label[_ngcontent-%COMP%] {\n  display: block;\n  margin: 0 0 10px;\n  color: #0b84ff;\n  font-size: 14px;\n  font-weight: 900;\n  text-transform: uppercase;\n}\n.field-label.accent[_ngcontent-%COMP%] {\n  margin-top: 24px;\n  color: #64e814;\n}\n.field-shell[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 34px minmax(0, 1fr) auto;\n  align-items: center;\n  min-height: 66px;\n  padding: 0 16px;\n  border: 1px solid rgba(148, 163, 184, 0.28);\n  border-radius: 14px;\n  background: rgba(2, 8, 23, 0.42);\n  box-shadow: inset 0 0 22px rgba(0, 128, 255, 0.04);\n  transition:\n    border-color 160ms ease,\n    box-shadow 160ms ease,\n    background 160ms ease;\n}\n.field-shell[_ngcontent-%COMP%]:focus-within {\n  border-color: rgba(0, 128, 255, 0.86);\n  background: rgba(2, 8, 23, 0.62);\n  box-shadow: 0 0 0 3px rgba(0, 128, 255, 0.12), inset 0 0 22px rgba(0, 128, 255, 0.08);\n}\n.field-shell[_ngcontent-%COMP%]    > img[_ngcontent-%COMP%] {\n  width: 25px;\n  height: 25px;\n  opacity: 0.82;\n}\n.field-shell[_ngcontent-%COMP%]   ion-input[_ngcontent-%COMP%] {\n  --color: #ffffff;\n  --placeholder-color: #96a1b6;\n  --placeholder-opacity: 1;\n  font-size: 18px;\n}\n.icon-button[_ngcontent-%COMP%] {\n  display: grid;\n  place-items: center;\n  width: 34px;\n  height: 34px;\n  border: 0;\n  border-radius: 50%;\n  background: transparent;\n  cursor: pointer;\n}\n.icon-button[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 24px;\n  height: 24px;\n  opacity: 0.84;\n}\n.form-options[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 16px;\n  margin: 24px 0 28px;\n}\n.remember-option[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 12px;\n  min-height: 32px;\n  padding: 0;\n  border: 0;\n  background: transparent;\n  color: #ffffff;\n  font: inherit;\n  font-size: 16px;\n  cursor: pointer;\n}\n.remember-option[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: grid;\n  place-items: center;\n  width: 27px;\n  height: 27px;\n  border: 1px solid rgba(148, 163, 184, 0.42);\n  border-radius: 7px;\n  background: rgba(15, 23, 42, 0.48);\n}\n.remember-option.active[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  border-color: #0b84ff;\n  background: #0b84ff;\n  box-shadow: 0 0 18px rgba(0, 128, 255, 0.35);\n}\n.remember-option[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 18px;\n  height: 18px;\n}\n.form-options[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: #0b84ff;\n  font-size: 16px;\n  text-decoration: none;\n}\n.form-options[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {\n  color: #64e814;\n}\n.login-button[_ngcontent-%COMP%] {\n  min-height: 74px;\n  --border-radius: 14px;\n  --background:\n    linear-gradient(\n      90deg,\n      #0059ff 0%,\n      #0789ff 36%,\n      #38bd42 72%,\n      #55d600 100%);\n  --background-hover:\n    linear-gradient(\n      90deg,\n      #0067ff 0%,\n      #1498ff 36%,\n      #43c84d 72%,\n      #62e213 100%);\n  --box-shadow: 0 18px 38px rgba(0, 102, 255, 0.26), 0 0 24px rgba(85, 214, 0, 0.2);\n  font-size: 22px;\n  font-weight: 900;\n}\n.login-button[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 30px;\n  height: 30px;\n  margin-right: 12px;\n}\n.divider[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);\n  align-items: center;\n  gap: 18px;\n  margin: 30px 0 24px;\n}\n.divider[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  height: 1px;\n  background:\n    linear-gradient(\n      90deg,\n      transparent,\n      rgba(148, 163, 184, 0.38),\n      transparent);\n}\n.divider[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #aab4c4;\n  font-size: 15px;\n}\n.social-actions[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 18px;\n}\n.social-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 12px;\n  min-height: 66px;\n  border: 1px solid rgba(148, 163, 184, 0.3);\n  border-radius: 8px;\n  background: rgba(3, 10, 25, 0.46);\n  color: #ffffff;\n  font-size: 20px;\n  font-weight: 800;\n  cursor: pointer;\n}\n.social-actions[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 30px;\n  height: 30px;\n}\n.secure-note[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 62px minmax(0, 1fr);\n  align-items: center;\n  gap: 16px;\n  min-height: 118px;\n  margin-top: 34px;\n  padding: 18px;\n  border: 1px solid rgba(148, 163, 184, 0.28);\n  border-radius: 8px;\n  background: rgba(3, 10, 25, 0.5);\n}\n.secure-note[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 58px;\n  height: 58px;\n  padding: 11px;\n  border-radius: 50%;\n  background: rgba(0, 128, 255, 0.16);\n  box-shadow: 0 0 26px rgba(0, 128, 255, 0.26);\n}\n.secure-note[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], \n.secure-note[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: block;\n}\n.secure-note[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #ffffff;\n  font-size: 18px;\n  font-weight: 900;\n}\n.secure-note[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  margin-top: 6px;\n  color: #c8d3e4;\n  font-size: 16px;\n  line-height: 1.4;\n}\n.login-feedback-panel[_ngcontent-%COMP%] {\n  position: fixed;\n  top: max(18px, env(safe-area-inset-top));\n  left: 50%;\n  z-index: 1000;\n  display: grid;\n  grid-template-columns: 44px minmax(0, 1fr) 30px;\n  align-items: center;\n  gap: 12px;\n  width: min(430px, 100% - 28px);\n  min-height: 86px;\n  padding: 14px 14px 18px;\n  overflow: hidden;\n  border: 1px solid rgba(248, 113, 113, 0.32);\n  border-radius: 8px;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(127, 29, 29, 0.28) 0%,\n      rgba(15, 23, 42, 0) 42%),\n    linear-gradient(\n      180deg,\n      rgba(30, 41, 59, 0.98) 0%,\n      rgba(15, 23, 42, 0.98) 100%);\n  box-shadow: 0 26px 70px rgba(0, 0, 0, 0.46), 0 0 0 1px rgba(255, 255, 255, 0.04) inset;\n  transform: translateX(-50%);\n  animation: _ngcontent-%COMP%_feedback-panel-in 180ms ease-out;\n}\n.login-feedback-icon[_ngcontent-%COMP%] {\n  display: grid;\n  place-items: center;\n  width: 44px;\n  height: 44px;\n  border: 1px solid rgba(254, 202, 202, 0.42);\n  border-radius: 50%;\n  background: rgba(254, 226, 226, 0.12);\n  color: #fecaca;\n  font-size: 24px;\n  font-weight: 900;\n}\n.login-feedback-copy[_ngcontent-%COMP%] {\n  min-width: 0;\n}\n.login-feedback-copy[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], \n.login-feedback-copy[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: block;\n}\n.login-feedback-copy[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #ffffff;\n  font-size: 15px;\n  font-weight: 900;\n}\n.login-feedback-copy[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  margin-top: 4px;\n  color: #cbd5e1;\n  font-size: 14px;\n  line-height: 1.35;\n}\n.login-feedback-panel[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  display: grid;\n  place-items: center;\n  width: 30px;\n  height: 30px;\n  border: 1px solid rgba(148, 163, 184, 0.28);\n  border-radius: 50%;\n  background: rgba(15, 23, 42, 0.28);\n  color: #cbd5e1;\n  font-size: 15px;\n  font-weight: 900;\n  cursor: pointer;\n}\n.login-feedback-panel[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover {\n  border-color: rgba(248, 113, 113, 0.48);\n  color: #ffffff;\n}\n.login-feedback-progress[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  height: 3px;\n  background:\n    linear-gradient(\n      90deg,\n      #ef4444 0%,\n      #f97316 45%,\n      #60a5fa 100%);\n  transform-origin: left;\n  animation: _ngcontent-%COMP%_feedback-progress 3800ms linear forwards;\n}\n@media (max-width: 1180px) {\n  .login-screen[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .brand-panel[_ngcontent-%COMP%] {\n    min-height: 560px;\n  }\n  .brand-logo[_ngcontent-%COMP%] {\n    width: min(500px, 74%);\n    margin-bottom: 42px;\n  }\n  .brand-copy[_ngcontent-%COMP%], \n   .feature-list[_ngcontent-%COMP%] {\n    width: min(420px, 56%);\n  }\n  .auth-panel[_ngcontent-%COMP%] {\n    min-height: auto;\n    border-top: 1px solid rgba(0, 128, 255, 0.82);\n    border-left: 0;\n    border-radius: 24px 24px 0 0;\n  }\n}\n@media (max-width: 760px) {\n  .login-screen[_ngcontent-%COMP%] {\n    width: min(100% - 18px, 540px);\n    min-height: auto;\n    margin: 9px auto;\n    border-radius: 18px;\n  }\n  .brand-panel[_ngcontent-%COMP%] {\n    min-height: 420px;\n    padding: 22px;\n  }\n  .brand-logo[_ngcontent-%COMP%] {\n    width: 88%;\n    margin-bottom: 26px;\n  }\n  .brand-copy[_ngcontent-%COMP%], \n   .feature-list[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n  .brand-copy[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: 38px;\n  }\n  .brand-copy[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n    font-size: 19px;\n  }\n  .feature-list[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n  .feature-item[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    align-items: start;\n    min-height: 136px;\n  }\n  .feature-item[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n    width: 48px;\n    height: 48px;\n  }\n  .copyright-box[_ngcontent-%COMP%] {\n    position: relative;\n    bottom: auto;\n    left: auto;\n    margin-top: 20px;\n  }\n  .auth-panel[_ngcontent-%COMP%] {\n    padding: 34px 20px 28px;\n    border-radius: 18px 18px 0 0;\n  }\n  .user-emblem[_ngcontent-%COMP%] {\n    width: 84px;\n    height: 84px;\n  }\n  .auth-heading[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n    font-size: 17px;\n  }\n  .form-options[_ngcontent-%COMP%], \n   .social-actions[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .form-options[_ngcontent-%COMP%] {\n    align-items: flex-start;\n    flex-direction: column;\n  }\n  .login-button[_ngcontent-%COMP%] {\n    min-height: 62px;\n    font-size: 19px;\n  }\n  .social-actions[_ngcontent-%COMP%] {\n    gap: 12px;\n  }\n  .secure-note[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n@keyframes _ngcontent-%COMP%_feedback-panel-in {\n  from {\n    opacity: 0;\n    transform: translate(-50%, -14px);\n  }\n  to {\n    opacity: 1;\n    transform: translate(-50%, 0);\n  }\n}\n@keyframes _ngcontent-%COMP%_feedback-progress {\n  from {\n    transform: scaleX(1);\n  }\n  to {\n    transform: scaleX(0);\n  }\n}\n/*# sourceMappingURL=login.page.css.map */'] });
var LoginPage = _LoginPage;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LoginPage, [{
    type: Component,
    args: [{ selector: "app-login", standalone: true, imports: [
      FormsModule,
      RouterLink,
      IonContent,
      IonInput,
      IonButton,
      IonSpinner
    ], template: `<ion-content class="login-page" fullscreen>
  <div class="login-content">
    <main class="login-screen">
    <section class="brand-panel" aria-label="Presentacion VendingCom">
      <div class="brand-glow"></div>

      <img
        class="brand-logo"
        src="assets/brand/vendingcom-logo-from-mockup.png"
        alt="VendingCom">

      <div class="brand-copy">
        <h1>Soluciones <span>Inteligentes</span></h1>
        <p>para un futuro eficiente</p>
      </div>

      <div class="feature-list">
        <article class="feature-item">
          <img src="assets/icon/shield.svg" alt="">
          <div>
            <strong>Seguro</strong>
            <span>Protegemos tu informacion con altos estandares.</span>
          </div>
        </article>

        <article class="feature-item">
          <img src="assets/icon/bolt.svg" alt="">
          <div>
            <strong>Confiable</strong>
            <span>Sistema estable y disponible todo el tiempo.</span>
          </div>
        </article>

        <article class="feature-item">
          <img src="assets/icon/chart.svg" alt="">
          <div>
            <strong>Eficiente</strong>
            <span>Gestion inteligente para mejores resultados.</span>
          </div>
        </article>

        <article class="feature-item">
          <img src="assets/icon/support.svg" alt="">
          <div>
            <strong>Soporte</strong>
            <span>Estamos contigo en cada paso del camino.</span>
          </div>
        </article>
      </div>

      <div class="copyright-box">
        <img src="assets/icon/lock.svg" alt="">
        <span>2026 VendingCom. Todos los derechos reservados.</span>
      </div>
    </section>

    <section class="auth-panel" aria-label="Inicio de sesion">
      <div class="user-emblem">
        <img src="assets/icon/user-circle.svg" alt="">
      </div>

      <div class="auth-heading">
        <h2>Bienvenido de nuevo</h2>
        <p>Inicia sesion para continuar</p>
      </div>

      <form class="login-form" (ngSubmit)="login()">
        <label class="field-label" for="username">Usuario</label>
        <div class="field-shell">
          <img src="assets/icon/user.svg" alt="">
          <ion-input
            id="username"
            [(ngModel)]="username"
            name="username"
            type="text"
            placeholder="Ingresa tu usuario">
          </ion-input>
        </div>

        <label class="field-label accent" for="password">Contrasena</label>
        <div class="field-shell">
          <img src="assets/icon/lock.svg" alt="">
          <ion-input
            id="password"
            [(ngModel)]="password"
            name="password"
            [type]="showPassword ? 'text' : 'password'"
            placeholder="Ingresa tu contrasena">
          </ion-input>
          <button class="icon-button" type="button" aria-label="Mostrar contrasena" (click)="togglePasswordVisibility()">
            <img src="assets/icon/eye.svg" alt="">
          </button>
        </div>

        <div class="form-options">
          <button class="remember-option" type="button" [class.active]="rememberMe" (click)="toggleRememberMe()">
            <span>
              @if (rememberMe) {
                <img src="assets/icon/checkbox-check.svg" alt="">
              }
            </span>
            Recordarme
          </button>

          <a routerLink="/password/recovery">Olvidaste tu contrasena?</a>
        </div>

        <ion-button
          expand="block"
          class="login-button"
          type="submit"
          [disabled]="loading">
          @if (loading) {
            <ion-spinner name="crescent"></ion-spinner>
          } @else {
            <img src="assets/icon/login-arrow.svg" alt="">
            <span>Iniciar sesion</span>
          }
        </ion-button>
      </form>

      <div class="divider">
        <span></span>
        <p>o continua con</p>
        <span></span>
      </div>

      <div class="social-actions">
        <button type="button">
          <img src="assets/icon/google.svg" alt="">
          Google
        </button>
        <button type="button">
          <img src="assets/icon/microsoft.svg" alt="">
          Microsoft
        </button>
      </div>

      <div class="secure-note">
        <img src="assets/icon/shield.svg" alt="">
        <div>
          <strong>Acceso seguro y protegido</strong>
          <span>Tus datos estan protegidos con encriptacion de nivel empresarial.</span>
        </div>
      </div>
    </section>
    </main>

    @if (errorToastOpen) {
      <div class="login-feedback-panel" role="alert" aria-live="assertive">
        <div class="login-feedback-icon">!</div>
        <div class="login-feedback-copy">
          <strong>{{ errorToastTitle }}</strong>
          <span>{{ errorToastMessage }}</span>
        </div>
        <button type="button" aria-label="Cerrar alerta" (click)="closeErrorToast()">x</button>
        <div class="login-feedback-progress"></div>
      </div>
    }
  </div>
</ion-content>
`, styles: ['/* src/app/features/auth/pages/login/login.page.scss */\n:host {\n  display: block;\n  min-height: 100vh;\n  background: #030814;\n}\n.login-page {\n  --background: #030814;\n}\n.login-content {\n  position: relative;\n  z-index: 1;\n  min-height: 100%;\n  padding: 16px 0;\n  background:\n    radial-gradient(\n      circle at 48% 100%,\n      rgba(0, 102, 255, 0.18),\n      transparent 26%),\n    #030814;\n  font-family:\n    Inter,\n    system-ui,\n    -apple-system,\n    BlinkMacSystemFont,\n    "Segoe UI",\n    sans-serif;\n}\n.login-screen {\n  position: relative;\n  display: grid;\n  grid-template-columns: minmax(0, 1.18fr) minmax(430px, 0.82fr);\n  gap: 0;\n  width: min(1504px, 100% - 28px);\n  min-height: calc(100vh - 32px);\n  margin: 0 auto;\n  overflow: hidden;\n  border: 1px solid rgba(0, 128, 255, 0.82);\n  border-radius: 26px;\n  background:\n    radial-gradient(\n      circle at 52% 94%,\n      rgba(34, 197, 94, 0.28) 0,\n      transparent 18%),\n    radial-gradient(\n      circle at 55% 84%,\n      rgba(0, 102, 255, 0.48) 0,\n      transparent 22%),\n    linear-gradient(\n      135deg,\n      #020714 0%,\n      #050b1b 52%,\n      #061224 100%);\n  box-shadow: 0 0 34px rgba(0, 128, 255, 0.34), 0 28px 95px rgba(0, 0, 0, 0.62);\n}\n.brand-panel,\n.auth-panel {\n  position: relative;\n  min-width: 0;\n}\n.brand-panel {\n  min-height: 760px;\n  padding: 34px 36px 22px;\n  overflow: hidden;\n  background:\n    linear-gradient(\n      90deg,\n      rgba(2, 6, 23, 0.1),\n      rgba(2, 6, 23, 0.08)),\n    url(/assets/images/login-full-reference.png) left center/180% 100% no-repeat;\n}\n.brand-panel::before {\n  display: none;\n}\n.brand-panel::after {\n  display: none;\n}\n.brand-glow {\n  display: none;\n}\n.brand-panel .brand-logo,\n.brand-panel .brand-copy,\n.brand-panel .feature-list,\n.brand-panel .copyright-box {\n  visibility: hidden;\n}\n.brand-logo {\n  position: relative;\n  z-index: 4;\n  width: min(540px, 54%);\n  height: auto;\n  margin-bottom: 58px;\n  mix-blend-mode: screen;\n  opacity: 0.98;\n  filter: drop-shadow(0 16px 32px rgba(0, 102, 255, 0.38)) saturate(1.18) contrast(1.08);\n}\n.brand-copy {\n  position: relative;\n  z-index: 4;\n  width: min(420px, 44%);\n}\n.brand-copy h1,\n.auth-heading h2,\n.brand-copy p,\n.auth-heading p {\n  margin: 0;\n}\n.brand-copy h1 {\n  color: #ffffff;\n  font-size: clamp(42px, 4.2vw, 64px);\n  line-height: 1.02;\n  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.52);\n}\n.brand-copy h1 span {\n  display: block;\n  margin-top: 8px;\n  background:\n    linear-gradient(\n      90deg,\n      #0b74ff 0%,\n      #24a7ff 42%,\n      #62e213 100%);\n  -webkit-background-clip: text;\n  background-clip: text;\n  color: transparent;\n}\n.brand-copy p {\n  margin-top: 18px;\n  color: #ffffff;\n  font-size: clamp(20px, 2vw, 28px);\n  line-height: 1.25;\n}\n.feature-list {\n  position: relative;\n  z-index: 4;\n  display: grid;\n  gap: 12px;\n  width: min(330px, 40%);\n  margin-top: 34px;\n}\n.feature-item {\n  display: grid;\n  grid-template-columns: 62px minmax(0, 1fr);\n  align-items: center;\n  gap: 14px;\n  min-height: 92px;\n  padding: 14px;\n  border: 1px solid rgba(0, 128, 255, 0.18);\n  border-radius: 8px;\n  background: rgba(3, 10, 26, 0.58);\n  box-shadow: 0 18px 36px rgba(0, 0, 0, 0.22);\n  -webkit-backdrop-filter: blur(12px);\n  backdrop-filter: blur(12px);\n}\n.feature-item img {\n  width: 58px;\n  height: 58px;\n  padding: 11px;\n  border-radius: 50%;\n  background: rgba(0, 113, 255, 0.13);\n  box-shadow: 0 0 26px rgba(0, 113, 255, 0.24);\n}\n.feature-item:nth-child(even) img {\n  background: rgba(77, 255, 0, 0.12);\n  box-shadow: 0 0 26px rgba(77, 255, 0, 0.2);\n}\n.feature-item strong,\n.feature-item span {\n  display: block;\n}\n.feature-item strong {\n  color: #ffffff;\n  font-size: 16px;\n  font-weight: 900;\n}\n.feature-item span {\n  margin-top: 6px;\n  color: #c8d3e4;\n  font-size: 14px;\n  line-height: 1.35;\n}\n.copyright-box {\n  position: absolute;\n  bottom: 22px;\n  left: 36px;\n  z-index: 4;\n  display: inline-flex;\n  align-items: center;\n  gap: 12px;\n  max-width: 460px;\n  min-height: 58px;\n  padding: 13px 18px;\n  border: 1px solid rgba(0, 128, 255, 0.18);\n  border-radius: 8px;\n  background: rgba(5, 15, 35, 0.72);\n  color: #d6deea;\n  font-size: 14px;\n  -webkit-backdrop-filter: blur(12px);\n  backdrop-filter: blur(12px);\n}\n.copyright-box img {\n  width: 22px;\n  height: 22px;\n}\n.auth-panel {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  min-height: 760px;\n  padding: 44px min(52px, 5vw);\n  border-left: 1px solid rgba(0, 128, 255, 0.82);\n  border-radius: 26px;\n  background:\n    radial-gradient(\n      circle at 50% 8%,\n      rgba(0, 128, 255, 0.22) 0,\n      transparent 26%),\n    linear-gradient(\n      180deg,\n      rgba(5, 16, 38, 0.98) 0%,\n      rgba(3, 10, 25, 0.98) 100%);\n  box-shadow: -18px 0 60px rgba(0, 102, 255, 0.18), inset 0 0 60px rgba(0, 128, 255, 0.08);\n}\n.user-emblem {\n  display: grid;\n  place-items: center;\n  width: 104px;\n  height: 104px;\n  margin: 0 auto 18px;\n  border: 1px solid rgba(0, 128, 255, 0.95);\n  border-radius: 50%;\n  background:\n    radial-gradient(\n      circle,\n      rgba(0, 128, 255, 0.2),\n      rgba(0, 128, 255, 0.04));\n  box-shadow: 0 0 36px rgba(0, 128, 255, 0.48), inset 0 0 24px rgba(0, 128, 255, 0.2);\n}\n.user-emblem img {\n  width: 54px;\n  height: 54px;\n}\n.auth-heading {\n  text-align: center;\n}\n.auth-heading h2 {\n  color: #ffffff;\n  font-size: clamp(28px, 3vw, 34px);\n  line-height: 1.1;\n  text-shadow: 0 6px 22px rgba(0, 0, 0, 0.35);\n}\n.auth-heading p {\n  margin-top: 14px;\n  color: #cbd5e1;\n  font-size: 20px;\n}\n.login-form {\n  margin-top: 28px;\n}\n.field-label {\n  display: block;\n  margin: 0 0 10px;\n  color: #0b84ff;\n  font-size: 14px;\n  font-weight: 900;\n  text-transform: uppercase;\n}\n.field-label.accent {\n  margin-top: 24px;\n  color: #64e814;\n}\n.field-shell {\n  display: grid;\n  grid-template-columns: 34px minmax(0, 1fr) auto;\n  align-items: center;\n  min-height: 66px;\n  padding: 0 16px;\n  border: 1px solid rgba(148, 163, 184, 0.28);\n  border-radius: 14px;\n  background: rgba(2, 8, 23, 0.42);\n  box-shadow: inset 0 0 22px rgba(0, 128, 255, 0.04);\n  transition:\n    border-color 160ms ease,\n    box-shadow 160ms ease,\n    background 160ms ease;\n}\n.field-shell:focus-within {\n  border-color: rgba(0, 128, 255, 0.86);\n  background: rgba(2, 8, 23, 0.62);\n  box-shadow: 0 0 0 3px rgba(0, 128, 255, 0.12), inset 0 0 22px rgba(0, 128, 255, 0.08);\n}\n.field-shell > img {\n  width: 25px;\n  height: 25px;\n  opacity: 0.82;\n}\n.field-shell ion-input {\n  --color: #ffffff;\n  --placeholder-color: #96a1b6;\n  --placeholder-opacity: 1;\n  font-size: 18px;\n}\n.icon-button {\n  display: grid;\n  place-items: center;\n  width: 34px;\n  height: 34px;\n  border: 0;\n  border-radius: 50%;\n  background: transparent;\n  cursor: pointer;\n}\n.icon-button img {\n  width: 24px;\n  height: 24px;\n  opacity: 0.84;\n}\n.form-options {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 16px;\n  margin: 24px 0 28px;\n}\n.remember-option {\n  display: inline-flex;\n  align-items: center;\n  gap: 12px;\n  min-height: 32px;\n  padding: 0;\n  border: 0;\n  background: transparent;\n  color: #ffffff;\n  font: inherit;\n  font-size: 16px;\n  cursor: pointer;\n}\n.remember-option span {\n  display: grid;\n  place-items: center;\n  width: 27px;\n  height: 27px;\n  border: 1px solid rgba(148, 163, 184, 0.42);\n  border-radius: 7px;\n  background: rgba(15, 23, 42, 0.48);\n}\n.remember-option.active span {\n  border-color: #0b84ff;\n  background: #0b84ff;\n  box-shadow: 0 0 18px rgba(0, 128, 255, 0.35);\n}\n.remember-option img {\n  width: 18px;\n  height: 18px;\n}\n.form-options a {\n  color: #0b84ff;\n  font-size: 16px;\n  text-decoration: none;\n}\n.form-options a:hover {\n  color: #64e814;\n}\n.login-button {\n  min-height: 74px;\n  --border-radius: 14px;\n  --background:\n    linear-gradient(\n      90deg,\n      #0059ff 0%,\n      #0789ff 36%,\n      #38bd42 72%,\n      #55d600 100%);\n  --background-hover:\n    linear-gradient(\n      90deg,\n      #0067ff 0%,\n      #1498ff 36%,\n      #43c84d 72%,\n      #62e213 100%);\n  --box-shadow: 0 18px 38px rgba(0, 102, 255, 0.26), 0 0 24px rgba(85, 214, 0, 0.2);\n  font-size: 22px;\n  font-weight: 900;\n}\n.login-button img {\n  width: 30px;\n  height: 30px;\n  margin-right: 12px;\n}\n.divider {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);\n  align-items: center;\n  gap: 18px;\n  margin: 30px 0 24px;\n}\n.divider span {\n  height: 1px;\n  background:\n    linear-gradient(\n      90deg,\n      transparent,\n      rgba(148, 163, 184, 0.38),\n      transparent);\n}\n.divider p {\n  margin: 0;\n  color: #aab4c4;\n  font-size: 15px;\n}\n.social-actions {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 18px;\n}\n.social-actions button {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 12px;\n  min-height: 66px;\n  border: 1px solid rgba(148, 163, 184, 0.3);\n  border-radius: 8px;\n  background: rgba(3, 10, 25, 0.46);\n  color: #ffffff;\n  font-size: 20px;\n  font-weight: 800;\n  cursor: pointer;\n}\n.social-actions img {\n  width: 30px;\n  height: 30px;\n}\n.secure-note {\n  display: grid;\n  grid-template-columns: 62px minmax(0, 1fr);\n  align-items: center;\n  gap: 16px;\n  min-height: 118px;\n  margin-top: 34px;\n  padding: 18px;\n  border: 1px solid rgba(148, 163, 184, 0.28);\n  border-radius: 8px;\n  background: rgba(3, 10, 25, 0.5);\n}\n.secure-note img {\n  width: 58px;\n  height: 58px;\n  padding: 11px;\n  border-radius: 50%;\n  background: rgba(0, 128, 255, 0.16);\n  box-shadow: 0 0 26px rgba(0, 128, 255, 0.26);\n}\n.secure-note strong,\n.secure-note span {\n  display: block;\n}\n.secure-note strong {\n  color: #ffffff;\n  font-size: 18px;\n  font-weight: 900;\n}\n.secure-note span {\n  margin-top: 6px;\n  color: #c8d3e4;\n  font-size: 16px;\n  line-height: 1.4;\n}\n.login-feedback-panel {\n  position: fixed;\n  top: max(18px, env(safe-area-inset-top));\n  left: 50%;\n  z-index: 1000;\n  display: grid;\n  grid-template-columns: 44px minmax(0, 1fr) 30px;\n  align-items: center;\n  gap: 12px;\n  width: min(430px, 100% - 28px);\n  min-height: 86px;\n  padding: 14px 14px 18px;\n  overflow: hidden;\n  border: 1px solid rgba(248, 113, 113, 0.32);\n  border-radius: 8px;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(127, 29, 29, 0.28) 0%,\n      rgba(15, 23, 42, 0) 42%),\n    linear-gradient(\n      180deg,\n      rgba(30, 41, 59, 0.98) 0%,\n      rgba(15, 23, 42, 0.98) 100%);\n  box-shadow: 0 26px 70px rgba(0, 0, 0, 0.46), 0 0 0 1px rgba(255, 255, 255, 0.04) inset;\n  transform: translateX(-50%);\n  animation: feedback-panel-in 180ms ease-out;\n}\n.login-feedback-icon {\n  display: grid;\n  place-items: center;\n  width: 44px;\n  height: 44px;\n  border: 1px solid rgba(254, 202, 202, 0.42);\n  border-radius: 50%;\n  background: rgba(254, 226, 226, 0.12);\n  color: #fecaca;\n  font-size: 24px;\n  font-weight: 900;\n}\n.login-feedback-copy {\n  min-width: 0;\n}\n.login-feedback-copy strong,\n.login-feedback-copy span {\n  display: block;\n}\n.login-feedback-copy strong {\n  color: #ffffff;\n  font-size: 15px;\n  font-weight: 900;\n}\n.login-feedback-copy span {\n  margin-top: 4px;\n  color: #cbd5e1;\n  font-size: 14px;\n  line-height: 1.35;\n}\n.login-feedback-panel button {\n  display: grid;\n  place-items: center;\n  width: 30px;\n  height: 30px;\n  border: 1px solid rgba(148, 163, 184, 0.28);\n  border-radius: 50%;\n  background: rgba(15, 23, 42, 0.28);\n  color: #cbd5e1;\n  font-size: 15px;\n  font-weight: 900;\n  cursor: pointer;\n}\n.login-feedback-panel button:hover {\n  border-color: rgba(248, 113, 113, 0.48);\n  color: #ffffff;\n}\n.login-feedback-progress {\n  position: absolute;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  height: 3px;\n  background:\n    linear-gradient(\n      90deg,\n      #ef4444 0%,\n      #f97316 45%,\n      #60a5fa 100%);\n  transform-origin: left;\n  animation: feedback-progress 3800ms linear forwards;\n}\n@media (max-width: 1180px) {\n  .login-screen {\n    grid-template-columns: 1fr;\n  }\n  .brand-panel {\n    min-height: 560px;\n  }\n  .brand-logo {\n    width: min(500px, 74%);\n    margin-bottom: 42px;\n  }\n  .brand-copy,\n  .feature-list {\n    width: min(420px, 56%);\n  }\n  .auth-panel {\n    min-height: auto;\n    border-top: 1px solid rgba(0, 128, 255, 0.82);\n    border-left: 0;\n    border-radius: 24px 24px 0 0;\n  }\n}\n@media (max-width: 760px) {\n  .login-screen {\n    width: min(100% - 18px, 540px);\n    min-height: auto;\n    margin: 9px auto;\n    border-radius: 18px;\n  }\n  .brand-panel {\n    min-height: 420px;\n    padding: 22px;\n  }\n  .brand-logo {\n    width: 88%;\n    margin-bottom: 26px;\n  }\n  .brand-copy,\n  .feature-list {\n    width: 100%;\n  }\n  .brand-copy h1 {\n    font-size: 38px;\n  }\n  .brand-copy p {\n    font-size: 19px;\n  }\n  .feature-list {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n  .feature-item {\n    grid-template-columns: 1fr;\n    align-items: start;\n    min-height: 136px;\n  }\n  .feature-item img {\n    width: 48px;\n    height: 48px;\n  }\n  .copyright-box {\n    position: relative;\n    bottom: auto;\n    left: auto;\n    margin-top: 20px;\n  }\n  .auth-panel {\n    padding: 34px 20px 28px;\n    border-radius: 18px 18px 0 0;\n  }\n  .user-emblem {\n    width: 84px;\n    height: 84px;\n  }\n  .auth-heading p {\n    font-size: 17px;\n  }\n  .form-options,\n  .social-actions {\n    grid-template-columns: 1fr;\n  }\n  .form-options {\n    align-items: flex-start;\n    flex-direction: column;\n  }\n  .login-button {\n    min-height: 62px;\n    font-size: 19px;\n  }\n  .social-actions {\n    gap: 12px;\n  }\n  .secure-note {\n    grid-template-columns: 1fr;\n  }\n}\n@keyframes feedback-panel-in {\n  from {\n    opacity: 0;\n    transform: translate(-50%, -14px);\n  }\n  to {\n    opacity: 1;\n    transform: translate(-50%, 0);\n  }\n}\n@keyframes feedback-progress {\n  from {\n    transform: scaleX(1);\n  }\n  to {\n    transform: scaleX(0);\n  }\n}\n/*# sourceMappingURL=login.page.css.map */\n'] }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LoginPage, { className: "LoginPage", filePath: "src/app/features/auth/pages/login/login.page.ts", lineNumber: 30 });
})();
export {
  LoginPage
};
//# sourceMappingURL=login.page-NPMYVPEB.js.map
