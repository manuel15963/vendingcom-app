import {
  AlertController,
  ToastService
} from "./chunk-QOL6G5CZ.js";
import {
  AuthApiService
} from "./chunk-IYYVUFSF.js";
import {
  CommonModule,
  Component,
  DatePipe,
  FormsModule,
  HttpClient,
  HttpParams,
  Injectable,
  IonBadge,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonModal2 as IonModal,
  IonSpinner,
  IonText,
  IonTitle,
  IonToolbar,
  MaxLengthValidator,
  NgControlStatus,
  NgModel,
  RouterLink,
  apiEndpoints,
  inject,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
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
import {
  __async
} from "./chunk-QHQP2P2Z.js";

// src/app/features/audit-logs/data-access/audit-logs-api.service.ts
var _AuditLogsApiService = class _AuditLogsApiService {
  constructor() {
    this.http = inject(HttpClient);
  }
  findAll() {
    return this.http.get(apiEndpoints.auditLogs.base);
  }
  findByAffectedUserId(userId) {
    return this.http.get(apiEndpoints.auditLogs.byUser(userId));
  }
  findByActionType(actionType) {
    return this.http.get(apiEndpoints.auditLogs.byAction(actionType));
  }
};
_AuditLogsApiService.\u0275fac = function AuditLogsApiService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _AuditLogsApiService)();
};
_AuditLogsApiService.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AuditLogsApiService, factory: _AuditLogsApiService.\u0275fac, providedIn: "root" });
var AuditLogsApiService = _AuditLogsApiService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AuditLogsApiService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

// src/app/features/roles/data-access/roles-api.service.ts
var _RolesApiService = class _RolesApiService {
  constructor() {
    this.http = inject(HttpClient);
  }
  findAll(params = {}) {
    return this.http.get(apiEndpoints.roles.base, {
      params: new HttpParams().set("activeOnly", params.activeOnly ?? false)
    });
  }
  findByRoleCode(roleCode) {
    return this.http.get(apiEndpoints.roles.search, {
      params: new HttpParams().set("roleCode", roleCode)
    });
  }
};
_RolesApiService.\u0275fac = function RolesApiService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _RolesApiService)();
};
_RolesApiService.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _RolesApiService, factory: _RolesApiService.\u0275fac, providedIn: "root" });
var RolesApiService = _RolesApiService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RolesApiService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

// src/app/features/users/data-access/users-api.service.ts
var _UsersApiService = class _UsersApiService {
  constructor() {
    this.http = inject(HttpClient);
  }
  findAll(params = {}) {
    return this.http.get(apiEndpoints.users.base, {
      params: this.buildFindAllParams(params)
    });
  }
  findById(userId) {
    return this.http.get(apiEndpoints.users.byId(userId));
  }
  findByUsername(username) {
    return this.http.get(apiEndpoints.users.search, {
      params: new HttpParams().set("username", username)
    });
  }
  create(request) {
    return this.http.post(apiEndpoints.users.base, request);
  }
  update(userId, request) {
    return this.http.put(apiEndpoints.users.byId(userId), request);
  }
  deactivate(userId) {
    return this.http.delete(apiEndpoints.users.byId(userId));
  }
  activate(userId) {
    return this.http.patch(apiEndpoints.users.activate(userId), {});
  }
  lock(userId) {
    return this.http.patch(apiEndpoints.users.lock(userId), {});
  }
  buildFindAllParams(params) {
    let httpParams = new HttpParams();
    if (params.status !== void 0) {
      httpParams = httpParams.set("status", params.status);
    }
    return httpParams;
  }
};
_UsersApiService.\u0275fac = function UsersApiService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _UsersApiService)();
};
_UsersApiService.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _UsersApiService, factory: _UsersApiService.\u0275fac, providedIn: "root" });
var UsersApiService = _UsersApiService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(UsersApiService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

// src/app/features/admin/pages/admin-panel/admin-panel.page.ts
var _forTrack0 = ($index, $item) => $item.userId;
var _forTrack1 = ($index, $item) => $item.roleId;
var _forTrack2 = ($index, $item) => $item.auditLogId;
function AdminPanelPage_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "ion-button", 17);
    \u0275\u0275listener("click", function AdminPanelPage_Conditional_17_Template_ion_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openCreateUserModal());
    });
    \u0275\u0275text(1, " Nuevo usuario ");
    \u0275\u0275elementEnd();
  }
}
function AdminPanelPage_Conditional_47_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ion-text", 12)(1, "p", 18);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.errorMessage);
  }
}
function AdminPanelPage_Conditional_48_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 24);
    \u0275\u0275element(1, "ion-spinner", 26);
    \u0275\u0275elementEnd();
  }
}
function AdminPanelPage_Conditional_48_Conditional_22_For_18_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "ion-button", 29);
    \u0275\u0275listener("click", function AdminPanelPage_Conditional_48_Conditional_22_For_18_Conditional_17_Template_ion_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const user_r5 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.openEditUserModal(user_r5));
    });
    \u0275\u0275text(1, "Editar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "ion-button", 30);
    \u0275\u0275listener("click", function AdminPanelPage_Conditional_48_Conditional_22_For_18_Conditional_17_Template_ion_button_click_2_listener() {
      \u0275\u0275restoreView(_r4);
      const user_r5 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.activateUser(user_r5.userId));
    });
    \u0275\u0275text(3, "Activar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "ion-button", 31);
    \u0275\u0275listener("click", function AdminPanelPage_Conditional_48_Conditional_22_For_18_Conditional_17_Template_ion_button_click_4_listener() {
      \u0275\u0275restoreView(_r4);
      const user_r5 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.lockUser(user_r5.userId));
    });
    \u0275\u0275text(5, "Bloquear");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "ion-button", 32);
    \u0275\u0275listener("click", function AdminPanelPage_Conditional_48_Conditional_22_For_18_Conditional_17_Template_ion_button_click_6_listener() {
      \u0275\u0275restoreView(_r4);
      const user_r5 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.deactivateUser(user_r5.userId));
    });
    \u0275\u0275text(7, "Desactivar");
    \u0275\u0275elementEnd();
  }
}
function AdminPanelPage_Conditional_48_Conditional_22_For_18_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Solo lectura");
    \u0275\u0275elementEnd();
  }
}
function AdminPanelPage_Conditional_48_Conditional_22_For_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td")(2, "strong");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "td");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "td");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "td")(11, "ion-badge", 27);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "td");
    \u0275\u0275text(14);
    \u0275\u0275pipe(15, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "td", 28);
    \u0275\u0275conditionalCreate(17, AdminPanelPage_Conditional_48_Conditional_22_For_18_Conditional_17_Template, 8, 0)(18, AdminPanelPage_Conditional_48_Conditional_22_For_18_Conditional_18_Template, 2, 0, "span");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const user_r5 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(user_r5.username);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(user_r5.email);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(user_r5.fullName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", user_r5.documentType || "-", " ", user_r5.documentNumber || "");
    \u0275\u0275advance(2);
    \u0275\u0275property("color", ctx_r1.getStatusColor(user_r5.userStatus));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getUserStatusLabel(user_r5.userStatus), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(user_r5.lastLoginAt ? \u0275\u0275pipeBind2(15, 9, user_r5.lastLoginAt, "short") : "-");
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r1.canManageUsers ? 17 : 18);
  }
}
function AdminPanelPage_Conditional_48_Conditional_22_ForEmpty_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 33);
    \u0275\u0275text(2, "No hay usuarios para mostrar.");
    \u0275\u0275elementEnd()();
  }
}
function AdminPanelPage_Conditional_48_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 25)(1, "table")(2, "thead")(3, "tr")(4, "th");
    \u0275\u0275text(5, "Usuario");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "th");
    \u0275\u0275text(7, "Nombre");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "th");
    \u0275\u0275text(9, "Documento");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th");
    \u0275\u0275text(11, "Estado");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "th");
    \u0275\u0275text(13, "Ultimo login");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "th");
    \u0275\u0275text(15, "Acciones");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(16, "tbody");
    \u0275\u0275repeaterCreate(17, AdminPanelPage_Conditional_48_Conditional_22_For_18_Template, 19, 12, "tr", null, _forTrack0, false, AdminPanelPage_Conditional_48_Conditional_22_ForEmpty_19_Template, 3, 0, "tr");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(17);
    \u0275\u0275repeater(ctx_r1.users);
  }
}
function AdminPanelPage_Conditional_48_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 13)(1, "div", 19)(2, "div")(3, "h2");
    \u0275\u0275text(4, "Usuarios");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6, "Alta, edicion y control de estado de cuentas.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 20)(8, "div", 21)(9, "button", 11);
    \u0275\u0275listener("click", function AdminPanelPage_Conditional_48_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.setUserStatusFilter(void 0));
    });
    \u0275\u0275text(10, "Todos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "button", 11);
    \u0275\u0275listener("click", function AdminPanelPage_Conditional_48_Template_button_click_11_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.setUserStatusFilter(1));
    });
    \u0275\u0275text(12, "Activos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "button", 11);
    \u0275\u0275listener("click", function AdminPanelPage_Conditional_48_Template_button_click_13_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.setUserStatusFilter(2));
    });
    \u0275\u0275text(14, "Bloqueados");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "button", 11);
    \u0275\u0275listener("click", function AdminPanelPage_Conditional_48_Template_button_click_15_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.setUserStatusFilter(0));
    });
    \u0275\u0275text(16, "Inactivos");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "ion-button", 22);
    \u0275\u0275listener("click", function AdminPanelPage_Conditional_48_Template_ion_button_click_17_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.loadUsers());
    });
    \u0275\u0275text(18, "Actualizar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "ion-button", 23);
    \u0275\u0275listener("click", function AdminPanelPage_Conditional_48_Template_ion_button_click_19_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.clearUserFilters());
    });
    \u0275\u0275text(20, "Limpiar");
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(21, AdminPanelPage_Conditional_48_Conditional_21_Template, 2, 0, "div", 24)(22, AdminPanelPage_Conditional_48_Conditional_22_Template, 20, 1, "div", 25);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(9);
    \u0275\u0275classProp("active", ctx_r1.userStatusFilter === void 0);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", ctx_r1.userStatusFilter === 1);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", ctx_r1.userStatusFilter === 2);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", ctx_r1.userStatusFilter === 0);
    \u0275\u0275advance(6);
    \u0275\u0275conditional(ctx_r1.loadingUsers ? 21 : 22);
  }
}
function AdminPanelPage_Conditional_49_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 24);
    \u0275\u0275element(1, "ion-spinner", 26);
    \u0275\u0275elementEnd();
  }
}
function AdminPanelPage_Conditional_49_Conditional_8_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "article", 35)(1, "div")(2, "h2");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "ion-badge", 27);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "p");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const role_r6 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(role_r6.roleName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(role_r6.roleCode);
    \u0275\u0275advance();
    \u0275\u0275property("color", role_r6.roleStatus === 1 ? "success" : "medium");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", role_r6.roleStatus === 1 ? "Activo" : "Inactivo", " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(role_r6.roleDescription || "Sin descripcion.");
  }
}
function AdminPanelPage_Conditional_49_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 34);
    \u0275\u0275repeaterCreate(1, AdminPanelPage_Conditional_49_Conditional_8_For_2_Template, 10, 5, "article", 35, _forTrack1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.roles);
  }
}
function AdminPanelPage_Conditional_49_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 13)(1, "div", 19)(2, "div")(3, "h2");
    \u0275\u0275text(4, "Roles");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6, "Roles disponibles para asignacion y permisos.");
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(7, AdminPanelPage_Conditional_49_Conditional_7_Template, 2, 0, "div", 24)(8, AdminPanelPage_Conditional_49_Conditional_8_Template, 3, 0, "div", 34);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275conditional(ctx_r1.loadingRoles ? 7 : 8);
  }
}
function AdminPanelPage_Conditional_50_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 24);
    \u0275\u0275element(1, "ion-spinner", 26);
    \u0275\u0275elementEnd();
  }
}
function AdminPanelPage_Conditional_50_Conditional_21_For_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td")(2, "strong");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "td");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "td");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "td");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "td");
    \u0275\u0275text(11);
    \u0275\u0275pipe(12, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "td", 28)(14, "ion-button", 40);
    \u0275\u0275listener("click", function AdminPanelPage_Conditional_50_Conditional_21_For_17_Template_ion_button_click_14_listener() {
      const auditLog_r9 = \u0275\u0275restoreView(_r8).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.openAuditDetail(auditLog_r9));
    });
    \u0275\u0275text(15, "Ver");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const auditLog_r9 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(auditLog_r9.actionType);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(auditLog_r9.affectedTableName || "-");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(auditLog_r9.affectedUserId || "-");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(auditLog_r9.executedByUserId || "-");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(12, 5, auditLog_r9.executedAt, "short"));
  }
}
function AdminPanelPage_Conditional_50_Conditional_21_ForEmpty_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 33);
    \u0275\u0275text(2, "No hay eventos para mostrar.");
    \u0275\u0275elementEnd()();
  }
}
function AdminPanelPage_Conditional_50_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 25)(1, "table")(2, "thead")(3, "tr")(4, "th");
    \u0275\u0275text(5, "Accion");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "th");
    \u0275\u0275text(7, "Tabla");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "th");
    \u0275\u0275text(9, "Usuario afectado");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th");
    \u0275\u0275text(11, "Ejecutado por");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "th");
    \u0275\u0275text(13, "Fecha");
    \u0275\u0275elementEnd();
    \u0275\u0275element(14, "th");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "tbody");
    \u0275\u0275repeaterCreate(16, AdminPanelPage_Conditional_50_Conditional_21_For_17_Template, 16, 8, "tr", null, _forTrack2, false, AdminPanelPage_Conditional_50_Conditional_21_ForEmpty_18_Template, 3, 0, "tr");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(16);
    \u0275\u0275repeater(ctx_r1.auditLogs);
  }
}
function AdminPanelPage_Conditional_50_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 13)(1, "div", 19)(2, "div")(3, "h2");
    \u0275\u0275text(4, "Auditoria");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6, "Eventos de seguridad, accesos y cambios administrativos.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 20)(8, "ion-item", 36)(9, "ion-label", 37);
    \u0275\u0275text(10, "Usuario afectado");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "ion-input", 38);
    \u0275\u0275twoWayListener("ngModelChange", function AdminPanelPage_Conditional_50_Template_ion_input_ngModelChange_11_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.auditUserFilter, $event) || (ctx_r1.auditUserFilter = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "ion-item", 36)(13, "ion-label", 37);
    \u0275\u0275text(14, "Accion");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "ion-input", 39);
    \u0275\u0275twoWayListener("ngModelChange", function AdminPanelPage_Conditional_50_Template_ion_input_ngModelChange_15_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.auditActionFilter, $event) || (ctx_r1.auditActionFilter = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "ion-button", 22);
    \u0275\u0275listener("click", function AdminPanelPage_Conditional_50_Template_ion_button_click_16_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.loadAuditLogs());
    });
    \u0275\u0275text(17, "Buscar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "ion-button", 23);
    \u0275\u0275listener("click", function AdminPanelPage_Conditional_50_Template_ion_button_click_18_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.clearAuditFilters());
    });
    \u0275\u0275text(19, "Limpiar");
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(20, AdminPanelPage_Conditional_50_Conditional_20_Template, 2, 0, "div", 24)(21, AdminPanelPage_Conditional_50_Conditional_21_Template, 19, 1, "div", 25);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(11);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.auditUserFilter);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.auditActionFilter);
    \u0275\u0275advance(5);
    \u0275\u0275conditional(ctx_r1.loadingAuditLogs ? 20 : 21);
  }
}
function AdminPanelPage_ng_template_52_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 45)(1, "div")(2, "strong");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "ion-badge", 57);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.userForm.fullName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.userForm.email);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("ID ", ctx_r1.userForm.userId);
  }
}
function AdminPanelPage_ng_template_52_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ion-text", 12)(1, "p", 58);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.formErrorMessage);
  }
}
function AdminPanelPage_ng_template_52_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.getUserFieldError("username"));
  }
}
function AdminPanelPage_ng_template_52_Conditional_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.getUserFieldError("email"));
  }
}
function AdminPanelPage_ng_template_52_Conditional_30_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.getUserFieldError("password"));
  }
}
function AdminPanelPage_ng_template_52_Conditional_30_Conditional_9_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 62);
    \u0275\u0275listener("click", function AdminPanelPage_ng_template_52_Conditional_30_Conditional_9_For_2_Template_button_click_0_listener() {
      const role_r13 = \u0275\u0275restoreView(_r12).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.selectRole(role_r13.roleCode));
    });
    \u0275\u0275elementStart(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const role_r13 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275classProp("active", ctx_r1.userForm.roleCode === role_r13.roleCode);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(role_r13.roleName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(role_r13.roleCode);
  }
}
function AdminPanelPage_ng_template_52_Conditional_30_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 60);
    \u0275\u0275repeaterCreate(1, AdminPanelPage_ng_template_52_Conditional_30_Conditional_9_For_2_Template, 5, 4, "button", 61, _forTrack1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.getRoleOptions());
  }
}
function AdminPanelPage_ng_template_52_Conditional_30_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "ion-item")(1, "ion-input", 63);
    \u0275\u0275twoWayListener("ngModelChange", function AdminPanelPage_ng_template_52_Conditional_30_Conditional_10_Template_ion_input_ngModelChange_1_listener($event) {
      \u0275\u0275restoreView(_r14);
      const ctx_r1 = \u0275\u0275nextContext(3);
      \u0275\u0275twoWayBindingSet(ctx_r1.userForm.roleCode, $event) || (ctx_r1.userForm.roleCode = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("ionBlur", function AdminPanelPage_ng_template_52_Conditional_30_Conditional_10_Template_ion_input_ionBlur_1_listener() {
      \u0275\u0275restoreView(_r14);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.markUserFieldAsTouched("roleCode"));
    })("ionInput", function AdminPanelPage_ng_template_52_Conditional_30_Conditional_10_Template_ion_input_ionInput_1_listener() {
      \u0275\u0275restoreView(_r14);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.markUserFieldAsTouched("roleCode"));
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.userForm.roleCode);
  }
}
function AdminPanelPage_ng_template_52_Conditional_30_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.getUserFieldError("roleCode"));
  }
}
function AdminPanelPage_ng_template_52_Conditional_30_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 47)(1, "span");
    \u0275\u0275text(2, "Contrasena *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "ion-item")(4, "ion-input", 59);
    \u0275\u0275twoWayListener("ngModelChange", function AdminPanelPage_ng_template_52_Conditional_30_Template_ion_input_ngModelChange_4_listener($event) {
      \u0275\u0275restoreView(_r11);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.userForm.password, $event) || (ctx_r1.userForm.password = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("ionBlur", function AdminPanelPage_ng_template_52_Conditional_30_Template_ion_input_ionBlur_4_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.markUserFieldAsTouched("password"));
    })("ionInput", function AdminPanelPage_ng_template_52_Conditional_30_Template_ion_input_ionInput_4_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.markUserFieldAsTouched("password"));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(5, AdminPanelPage_ng_template_52_Conditional_30_Conditional_5_Template, 2, 1, "small");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 47)(7, "span");
    \u0275\u0275text(8, "Rol inicial *");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(9, AdminPanelPage_ng_template_52_Conditional_30_Conditional_9_Template, 3, 0, "div", 60)(10, AdminPanelPage_ng_template_52_Conditional_30_Conditional_10_Template, 2, 1, "ion-item");
    \u0275\u0275conditionalCreate(11, AdminPanelPage_ng_template_52_Conditional_30_Conditional_11_Template, 2, 1, "small");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.userForm.password);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.shouldShowUserFieldError("password") ? 5 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275conditional(ctx_r1.getRoleOptions().length ? 9 : 10);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.shouldShowUserFieldError("roleCode") ? 11 : -1);
  }
}
function AdminPanelPage_ng_template_52_Conditional_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.getUserFieldError("fullName"));
  }
}
function AdminPanelPage_ng_template_52_Conditional_42_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.getUserFieldError("phoneNumber"));
  }
}
function AdminPanelPage_ng_template_52_Conditional_56_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.getUserFieldError("documentNumber"));
  }
}
function AdminPanelPage_ng_template_52_Conditional_61_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "ion-spinner", 26);
  }
}
function AdminPanelPage_ng_template_52_Conditional_62_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.userPrimaryActionLabel, " ");
  }
}
function AdminPanelPage_ng_template_52_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "ion-header")(1, "ion-toolbar")(2, "ion-title");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "ion-buttons", 0)(5, "ion-button", 41);
    \u0275\u0275listener("click", function AdminPanelPage_ng_template_52_Template_ion_button_click_5_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeUserModal());
    });
    \u0275\u0275text(6, "Cerrar");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(7, "ion-content", 42)(8, "div", 43)(9, "span", 44);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "h2");
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "p");
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(15, AdminPanelPage_ng_template_52_Conditional_15_Template, 8, 3, "div", 45);
    \u0275\u0275conditionalCreate(16, AdminPanelPage_ng_template_52_Conditional_16_Template, 3, 1, "ion-text", 12);
    \u0275\u0275elementStart(17, "div", 46)(18, "div", 47)(19, "span");
    \u0275\u0275text(20, "Usuario *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "ion-item")(22, "ion-input", 48);
    \u0275\u0275twoWayListener("ngModelChange", function AdminPanelPage_ng_template_52_Template_ion_input_ngModelChange_22_listener($event) {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.userForm.username, $event) || (ctx_r1.userForm.username = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("ionBlur", function AdminPanelPage_ng_template_52_Template_ion_input_ionBlur_22_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.markUserFieldAsTouched("username"));
    })("ionInput", function AdminPanelPage_ng_template_52_Template_ion_input_ionInput_22_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.markUserFieldAsTouched("username"));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(23, AdminPanelPage_ng_template_52_Conditional_23_Template, 2, 1, "small");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "div", 47)(25, "span");
    \u0275\u0275text(26, "Correo *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "ion-item")(28, "ion-input", 49);
    \u0275\u0275twoWayListener("ngModelChange", function AdminPanelPage_ng_template_52_Template_ion_input_ngModelChange_28_listener($event) {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.userForm.email, $event) || (ctx_r1.userForm.email = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("ionBlur", function AdminPanelPage_ng_template_52_Template_ion_input_ionBlur_28_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.markUserFieldAsTouched("email"));
    })("ionInput", function AdminPanelPage_ng_template_52_Template_ion_input_ionInput_28_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.markUserFieldAsTouched("email"));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(29, AdminPanelPage_ng_template_52_Conditional_29_Template, 2, 1, "small");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(30, AdminPanelPage_ng_template_52_Conditional_30_Template, 12, 4);
    \u0275\u0275elementStart(31, "div", 50)(32, "span");
    \u0275\u0275text(33, "Nombre completo *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "ion-item")(35, "ion-input", 51);
    \u0275\u0275twoWayListener("ngModelChange", function AdminPanelPage_ng_template_52_Template_ion_input_ngModelChange_35_listener($event) {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.userForm.fullName, $event) || (ctx_r1.userForm.fullName = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("ionBlur", function AdminPanelPage_ng_template_52_Template_ion_input_ionBlur_35_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.markUserFieldAsTouched("fullName"));
    })("ionInput", function AdminPanelPage_ng_template_52_Template_ion_input_ionInput_35_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.markUserFieldAsTouched("fullName"));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(36, AdminPanelPage_ng_template_52_Conditional_36_Template, 2, 1, "small");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "div", 47)(38, "span");
    \u0275\u0275text(39, "Telefono");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(40, "ion-item")(41, "ion-input", 52);
    \u0275\u0275twoWayListener("ngModelChange", function AdminPanelPage_ng_template_52_Template_ion_input_ngModelChange_41_listener($event) {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.userForm.phoneNumber, $event) || (ctx_r1.userForm.phoneNumber = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("ionBlur", function AdminPanelPage_ng_template_52_Template_ion_input_ionBlur_41_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.markUserFieldAsTouched("phoneNumber"));
    })("ionInput", function AdminPanelPage_ng_template_52_Template_ion_input_ionInput_41_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.markUserFieldAsTouched("phoneNumber"));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(42, AdminPanelPage_ng_template_52_Conditional_42_Template, 2, 1, "small");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(43, "div", 47)(44, "span");
    \u0275\u0275text(45, "Tipo de documento");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(46, "div", 53)(47, "button", 11);
    \u0275\u0275listener("click", function AdminPanelPage_ng_template_52_Template_button_click_47_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.selectDocumentType(""));
    });
    \u0275\u0275text(48, "Sin documento");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(49, "button", 11);
    \u0275\u0275listener("click", function AdminPanelPage_ng_template_52_Template_button_click_49_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.selectDocumentType("DNI"));
    });
    \u0275\u0275text(50, "DNI");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(51, "div", 47)(52, "span");
    \u0275\u0275text(53, "Numero documento");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(54, "ion-item")(55, "ion-input", 54);
    \u0275\u0275twoWayListener("ngModelChange", function AdminPanelPage_ng_template_52_Template_ion_input_ngModelChange_55_listener($event) {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.userForm.documentNumber, $event) || (ctx_r1.userForm.documentNumber = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("ionBlur", function AdminPanelPage_ng_template_52_Template_ion_input_ionBlur_55_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.markUserFieldAsTouched("documentNumber"));
    })("ionInput", function AdminPanelPage_ng_template_52_Template_ion_input_ionInput_55_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.markUserFieldAsTouched("documentNumber"));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(56, AdminPanelPage_ng_template_52_Conditional_56_Template, 2, 1, "small");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(57, "div", 55)(58, "ion-button", 22);
    \u0275\u0275listener("click", function AdminPanelPage_ng_template_52_Template_ion_button_click_58_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeUserModal());
    });
    \u0275\u0275text(59, "Cancelar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(60, "ion-button", 56);
    \u0275\u0275listener("click", function AdminPanelPage_ng_template_52_Template_ion_button_click_60_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.saveUser());
    });
    \u0275\u0275conditionalCreate(61, AdminPanelPage_ng_template_52_Conditional_61_Template, 1, 0, "ion-spinner", 26)(62, AdminPanelPage_ng_template_52_Conditional_62_Template, 1, 1);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.userModalTitle);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r1.userFormMode === "create" ? "Alta de usuario" : "Edicion de usuario");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.userModalTitle);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.userModalDescription);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.userFormMode === "edit" ? 15 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.formErrorMessage ? 16 : -1);
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.userForm.username);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.shouldShowUserFieldError("username") ? 23 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.userForm.email);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.shouldShowUserFieldError("email") ? 29 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.userFormMode === "create" ? 30 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.userForm.fullName);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.shouldShowUserFieldError("fullName") ? 36 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.userForm.phoneNumber);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.shouldShowUserFieldError("phoneNumber") ? 42 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275classProp("active", ctx_r1.userForm.documentType === "");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", ctx_r1.userForm.documentType === "DNI");
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.userForm.documentNumber);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.shouldShowUserFieldError("documentNumber") ? 56 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", ctx_r1.savingUser || !ctx_r1.isUserFormValid());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.savingUser ? 61 : 62);
  }
}
function AdminPanelPage_ng_template_54_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "ion-content", 64)(1, "div", 65)(2, "div", 66);
    \u0275\u0275text(3, "OK");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 44);
    \u0275\u0275text(5, "Operacion completada");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "h2");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "p");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 67)(11, "ion-button", 41);
    \u0275\u0275listener("click", function AdminPanelPage_ng_template_54_Template_ion_button_click_11_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeSuccessModal());
    });
    \u0275\u0275text(12, "Volver a usuarios");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r1.successModalTitle);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.successModalMessage);
  }
}
function AdminPanelPage_ng_template_56_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "dl", 68)(1, "dt");
    \u0275\u0275text(2, "Accion");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "dd");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "dt");
    \u0275\u0275text(6, "Descripcion");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "dd");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "dt");
    \u0275\u0275text(10, "Tabla / registro");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "dd");
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "dt");
    \u0275\u0275text(14, "IP");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "dd");
    \u0275\u0275text(16);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "dt");
    \u0275\u0275text(18, "User agent");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "dd");
    \u0275\u0275text(20);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "dt");
    \u0275\u0275text(22, "Datos anteriores");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "dd")(24, "pre");
    \u0275\u0275text(25);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(26, "dt");
    \u0275\u0275text(27, "Datos nuevos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "dd")(29, "pre");
    \u0275\u0275text(30);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.selectedAuditLog.actionType);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.selectedAuditLog.actionDescription || "-");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate2("", ctx_r1.selectedAuditLog.affectedTableName || "-", " #", ctx_r1.selectedAuditLog.affectedRecordId || "-");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.selectedAuditLog.ipAddress || "-");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.selectedAuditLog.userAgent || "-");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.selectedAuditLog.oldData || "-");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.selectedAuditLog.newData || "-");
  }
}
function AdminPanelPage_ng_template_56_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "ion-header")(1, "ion-toolbar")(2, "ion-title");
    \u0275\u0275text(3, "Detalle de auditoria");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "ion-buttons", 0)(5, "ion-button", 41);
    \u0275\u0275listener("click", function AdminPanelPage_ng_template_56_Template_ion_button_click_5_listener() {
      \u0275\u0275restoreView(_r16);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeAuditDetail());
    });
    \u0275\u0275text(6, "Cerrar");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(7, "ion-content", 42);
    \u0275\u0275conditionalCreate(8, AdminPanelPage_ng_template_56_Conditional_8_Template, 31, 8, "dl", 68);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(8);
    \u0275\u0275conditional(ctx_r1.selectedAuditLog ? 8 : -1);
  }
}
var _AdminPanelPage = class _AdminPanelPage {
  constructor() {
    this.authApi = inject(AuthApiService);
    this.usersApi = inject(UsersApiService);
    this.rolesApi = inject(RolesApiService);
    this.auditLogsApi = inject(AuditLogsApiService);
    this.alertController = inject(AlertController);
    this.toast = inject(ToastService);
    this.activeTab = "users";
    this.users = [];
    this.roles = [];
    this.auditLogs = [];
    this.selectedAuditLog = null;
    this.loadingUsers = false;
    this.loadingRoles = false;
    this.loadingAuditLogs = false;
    this.savingUser = false;
    this.errorMessage = "";
    this.formErrorMessage = "";
    this.auditActionFilter = "";
    this.userFormOpen = false;
    this.auditDetailOpen = false;
    this.successModalOpen = false;
    this.successModalTitle = "";
    this.successModalMessage = "";
    this.pendingSuccessModal = null;
    this.userFormMode = "create";
    this.userForm = this.getEmptyUserForm();
    this.touchedUserFields = {};
    this.session = this.authApi.getCurrentSession();
    this.canManageUsers = this.authApi.hasAnyRole(["ADMIN"]);
  }
  get activeUsersCount() {
    return this.users.filter((user) => user.userStatus === 1).length;
  }
  get lockedUsersCount() {
    return this.users.filter((user) => user.userStatus === 2).length;
  }
  get userModalTitle() {
    return this.userFormMode === "create" ? "Crear usuario" : `Editar ${this.userForm.fullName || this.userForm.username}`;
  }
  get userModalDescription() {
    return this.userFormMode === "create" ? "Registra credenciales, datos personales y rol inicial." : `Actualizando datos de @${this.userForm.username}.`;
  }
  get userPrimaryActionLabel() {
    return this.userFormMode === "create" ? "Crear usuario" : "Guardar cambios";
  }
  ngOnInit() {
    this.loadRoles();
    this.loadUsers();
    this.loadAuditLogs();
  }
  setActiveTab(tab) {
    this.activeTab = tab;
  }
  loadUsers() {
    this.loadingUsers = true;
    this.errorMessage = "";
    this.usersApi.findAll({ status: this.userStatusFilter }).subscribe({
      next: (users) => {
        this.users = users;
        this.loadingUsers = false;
      },
      error: (error) => this.handleLoadError(error, "No se pudieron cargar los usuarios.")
    });
  }
  loadRoles() {
    this.loadingRoles = true;
    this.errorMessage = "";
    this.rolesApi.findAll({ activeOnly: false }).subscribe({
      next: (roles) => {
        this.roles = roles;
        this.loadingRoles = false;
        this.ensureDefaultRoleSelected();
      },
      error: (error) => this.handleLoadError(error, "No se pudieron cargar los roles.")
    });
  }
  loadAuditLogs() {
    this.loadingAuditLogs = true;
    this.errorMessage = "";
    const request = this.auditUserFilter ? this.auditLogsApi.findByAffectedUserId(this.auditUserFilter) : this.auditActionFilter ? this.auditLogsApi.findByActionType(this.auditActionFilter) : this.auditLogsApi.findAll();
    request.subscribe({
      next: (auditLogs) => {
        this.auditLogs = auditLogs;
        this.loadingAuditLogs = false;
      },
      error: (error) => this.handleLoadError(error, "No se pudo cargar la auditoria.")
    });
  }
  clearUserFilters() {
    this.userStatusFilter = void 0;
    this.loadUsers();
  }
  setUserStatusFilter(status) {
    this.userStatusFilter = status;
    this.loadUsers();
  }
  clearAuditFilters() {
    this.auditUserFilter = void 0;
    this.auditActionFilter = "";
    this.loadAuditLogs();
  }
  openCreateUserModal() {
    this.activeTab = "users";
    this.userFormMode = "create";
    this.userForm = this.getEmptyUserForm();
    this.formErrorMessage = "";
    this.touchedUserFields = {};
    this.ensureDefaultRoleSelected();
    this.userFormOpen = true;
  }
  openEditUserModal(user) {
    this.activeTab = "users";
    this.userFormMode = "edit";
    this.userForm = {
      userId: user.userId,
      username: user.username,
      email: user.email,
      password: "",
      fullName: user.fullName,
      phoneNumber: user.phoneNumber || "",
      documentType: user.documentType || "",
      documentNumber: user.documentNumber || "",
      roleCode: ""
    };
    this.formErrorMessage = "";
    this.touchedUserFields = {};
    this.userFormOpen = true;
  }
  closeUserModal() {
    this.userFormOpen = false;
    this.formErrorMessage = "";
    this.touchedUserFields = {};
    if (this.pendingSuccessModal) {
      const successModal = this.pendingSuccessModal;
      this.pendingSuccessModal = null;
      window.setTimeout(() => {
        this.showSuccessModal(successModal.title, successModal.message);
      }, 120);
    }
  }
  saveUser() {
    this.markAllUserFieldsAsTouched();
    const validationMessage = this.getUserFormValidationMessage();
    if (validationMessage) {
      this.formErrorMessage = validationMessage;
      return;
    }
    this.savingUser = true;
    this.errorMessage = "";
    this.formErrorMessage = "";
    const isCreateMode = this.userFormMode === "create";
    const successName = this.userForm.fullName.trim() || this.userForm.username.trim();
    const request = this.userFormMode === "create" ? this.usersApi.create(this.buildCreateUserRequest()) : this.usersApi.update(this.userForm.userId, this.buildUpdateUserRequest());
    request.subscribe({
      next: () => {
        this.savingUser = false;
        this.pendingSuccessModal = {
          title: isCreateMode ? "Usuario creado" : "Usuario actualizado",
          message: isCreateMode ? `${successName} fue registrado correctamente y ya queda disponible en el modulo de acceso.` : `Los datos de ${successName} se actualizaron correctamente.`
        };
        this.userFormOpen = false;
        this.loadUsers();
      },
      error: (error) => {
        this.savingUser = false;
        this.handleFormError(error, "No se pudo guardar el usuario.");
      }
    });
  }
  activateUser(userId) {
    return __async(this, null, function* () {
      const confirmed = yield this.confirmAction("Activar usuario", "El usuario podra iniciar sesion nuevamente.");
      if (!confirmed) {
        return;
      }
      this.usersApi.activate(userId).subscribe({
        next: () => {
          void this.toast.success("Usuario activado.");
          this.loadUsers();
        },
        error: (error) => this.handleLoadError(error, "No se pudo activar el usuario.")
      });
    });
  }
  lockUser(userId) {
    return __async(this, null, function* () {
      const confirmed = yield this.confirmAction("Bloquear usuario", "El usuario no podra acceder hasta que sea activado.");
      if (!confirmed) {
        return;
      }
      this.usersApi.lock(userId).subscribe({
        next: () => {
          void this.toast.success("Usuario bloqueado.");
          this.loadUsers();
        },
        error: (error) => this.handleLoadError(error, "No se pudo bloquear el usuario.")
      });
    });
  }
  deactivateUser(userId) {
    return __async(this, null, function* () {
      const confirmed = yield this.confirmAction("Desactivar usuario", "El usuario quedara inactivo de forma logica.");
      if (!confirmed) {
        return;
      }
      this.usersApi.deactivate(userId).subscribe({
        next: () => {
          void this.toast.success("Usuario desactivado.");
          this.loadUsers();
        },
        error: (error) => this.handleLoadError(error, "No se pudo desactivar el usuario.")
      });
    });
  }
  openAuditDetail(auditLog) {
    this.selectedAuditLog = auditLog;
    this.auditDetailOpen = true;
  }
  closeAuditDetail() {
    this.auditDetailOpen = false;
    this.selectedAuditLog = null;
  }
  closeSuccessModal() {
    this.successModalOpen = false;
  }
  getUserStatusLabel(status) {
    const labels = {
      0: "Inactivo",
      1: "Activo",
      2: "Bloqueado"
    };
    return labels[status] || "Desconocido";
  }
  getStatusColor(status) {
    const colors = {
      0: "medium",
      1: "success",
      2: "warning"
    };
    return colors[status] || "medium";
  }
  getRoleOptions() {
    return this.roles.filter((role) => role.roleStatus === 1);
  }
  selectRole(roleCode) {
    this.userForm.roleCode = roleCode;
    this.markUserFieldAsTouched("roleCode");
  }
  selectDocumentType(documentType) {
    this.userForm.documentType = documentType;
    if (!documentType) {
      this.userForm.documentNumber = "";
    }
    this.markUserFieldAsTouched("documentNumber");
  }
  isUserFormValid() {
    return !this.getUserFormValidationMessage();
  }
  markUserFieldAsTouched(field) {
    this.touchedUserFields[field] = true;
  }
  shouldShowUserFieldError(field) {
    return Boolean(this.touchedUserFields[field] && this.getUserFieldError(field));
  }
  getUserFieldError(field) {
    const username = this.userForm.username.trim();
    const email = this.userForm.email.trim();
    const password = this.userForm.password.trim();
    const fullName = this.userForm.fullName.trim();
    const phoneNumber = this.userForm.phoneNumber.trim();
    const documentNumber = this.userForm.documentNumber.trim();
    const roleCode = this.userForm.roleCode.trim();
    if (field === "username") {
      if (!username) {
        return "El usuario es obligatorio.";
      }
      if (username.length > 50) {
        return "Maximo 50 caracteres.";
      }
    }
    if (field === "email") {
      if (!email) {
        return "El correo es obligatorio.";
      }
      if (email.length > 120 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return "Ingresa un correo valido de maximo 120 caracteres.";
      }
    }
    if (field === "password" && this.userFormMode === "create") {
      if (!password) {
        return "La contrasena es obligatoria.";
      }
      if (password.length < 6) {
        return "Debe tener al menos 6 caracteres.";
      }
    }
    if (field === "fullName") {
      if (!fullName) {
        return "El nombre completo es obligatorio.";
      }
      if (fullName.length > 150) {
        return "Maximo 150 caracteres.";
      }
    }
    if (field === "phoneNumber" && phoneNumber && !/^[0-9]{9}$/.test(phoneNumber)) {
      return "Debe tener exactamente 9 digitos.";
    }
    if (field === "documentNumber" && this.userForm.documentType === "DNI") {
      if (!documentNumber) {
        return "El DNI es obligatorio.";
      }
      if (!/^[0-9]{8}$/.test(documentNumber)) {
        return "El DNI debe tener exactamente 8 digitos.";
      }
    }
    if (field === "roleCode" && this.userFormMode === "create" && !roleCode) {
      return "Selecciona un rol inicial.";
    }
    return "";
  }
  markAllUserFieldsAsTouched() {
    const fields = ["username", "email", "password", "fullName", "phoneNumber", "documentNumber", "roleCode"];
    fields.forEach((field) => this.markUserFieldAsTouched(field));
  }
  getUserFormValidationMessage() {
    const fields = ["username", "email", "password", "fullName", "phoneNumber", "documentNumber", "roleCode"];
    return fields.map((field) => this.getUserFieldError(field)).find(Boolean) || "";
  }
  buildCreateUserRequest() {
    return {
      username: this.userForm.username.trim(),
      email: this.userForm.email.trim(),
      password: this.userForm.password.trim(),
      fullName: this.userForm.fullName.trim(),
      phoneNumber: this.userForm.phoneNumber.trim(),
      documentType: this.userForm.documentType.trim(),
      documentNumber: this.userForm.documentNumber.trim(),
      roleCode: this.userForm.roleCode.trim()
    };
  }
  buildUpdateUserRequest() {
    return {
      username: this.userForm.username.trim(),
      email: this.userForm.email.trim(),
      fullName: this.userForm.fullName.trim(),
      phoneNumber: this.userForm.phoneNumber.trim(),
      documentType: this.userForm.documentType.trim(),
      documentNumber: this.userForm.documentNumber.trim(),
      updatedByUserId: this.session?.userId || 0
    };
  }
  getEmptyUserForm() {
    return {
      username: "",
      email: "",
      password: "",
      fullName: "",
      phoneNumber: "",
      documentType: "DNI",
      documentNumber: "",
      roleCode: ""
    };
  }
  ensureDefaultRoleSelected() {
    if (this.userFormMode !== "create" || this.userForm.roleCode) {
      return;
    }
    const defaultRole = this.getRoleOptions()[0];
    if (defaultRole) {
      this.userForm.roleCode = defaultRole.roleCode;
    }
  }
  showSuccessModal(title, message) {
    this.successModalTitle = title;
    this.successModalMessage = message;
    this.successModalOpen = true;
  }
  handleFormError(error, fallbackMessage) {
    const apiError = error.error;
    this.formErrorMessage = apiError?.message || fallbackMessage;
    void this.toast.error(this.formErrorMessage);
  }
  handleLoadError(error, fallbackMessage) {
    const apiError = error.error;
    this.loadingUsers = false;
    this.loadingRoles = false;
    this.loadingAuditLogs = false;
    this.errorMessage = apiError?.message || fallbackMessage;
    void this.toast.error(this.errorMessage);
  }
  confirmAction(header, message) {
    return __async(this, null, function* () {
      const alert = yield this.alertController.create({
        header,
        message,
        buttons: [
          {
            text: "Cancelar",
            role: "cancel"
          },
          {
            text: "Confirmar",
            role: "confirm"
          }
        ]
      });
      yield alert.present();
      const result = yield alert.onDidDismiss();
      return result.role === "confirm";
    });
  }
};
_AdminPanelPage.\u0275fac = function AdminPanelPage_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _AdminPanelPage)();
};
_AdminPanelPage.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AdminPanelPage, selectors: [["app-admin-panel"]], decls: 57, vars: 19, consts: [["slot", "end"], ["routerLink", "/dashboard"], [1, "admin-content"], [1, "admin-shell"], [1, "admin-hero"], [1, "eyebrow"], [1, "hero-action"], [1, "metric-grid"], [1, "metric-card"], [1, "workspace"], [1, "tab-list"], ["type", "button", 3, "click"], ["color", "danger"], [1, "panel-section"], [1, "entity-modal", 3, "didDismiss", "backdropDismiss", "isOpen"], [1, "success-modal", 3, "didDismiss", "isOpen"], [3, "didDismiss", "isOpen"], [1, "hero-action", 3, "click"], [1, "feedback"], [1, "section-heading"], [1, "toolbar-row"], [1, "status-filter"], ["fill", "outline", 3, "click"], ["fill", "clear", 3, "click"], [1, "loading-box"], [1, "data-table"], ["name", "crescent"], [3, "color"], [1, "actions"], ["size", "small", 3, "click"], ["size", "small", "fill", "outline", "color", "success", 3, "click"], ["size", "small", "fill", "outline", "color", "warning", 3, "click"], ["size", "small", "fill", "outline", "color", "danger", 3, "click"], ["colspan", "6", 1, "empty-state"], [1, "role-grid"], [1, "role-card"], [1, "select-field"], ["position", "floating"], ["type", "number", 3, "ngModelChange", "ngModel"], ["type", "text", 3, "ngModelChange", "ngModel"], ["size", "small", "fill", "outline", 3, "click"], [3, "click"], [1, "modal-content"], [1, "modal-intro"], [1, "mode-pill"], [1, "selected-user-banner"], [1, "form-grid"], [1, "field-block"], ["placeholder", "admin.operaciones", 3, "ngModelChange", "ionBlur", "ionInput", "ngModel"], ["placeholder", "usuario@empresa.com", "type", "email", 3, "ngModelChange", "ionBlur", "ionInput", "ngModel"], [1, "field-block", "wide-field"], ["placeholder", "Nombre y apellidos", 3, "ngModelChange", "ionBlur", "ionInput", "ngModel"], ["maxlength", "9", "placeholder", "999999999", 3, "ngModelChange", "ionBlur", "ionInput", "ngModel"], [1, "choice-row"], ["maxlength", "8", "placeholder", "00000000", 3, "ngModelChange", "ionBlur", "ionInput", "ngModel"], [1, "modal-actions"], [3, "click", "disabled"], ["color", "primary"], [1, "form-feedback"], ["placeholder", "Minimo 6 caracteres", "type", "password", 3, "ngModelChange", "ionBlur", "ionInput", "ngModel"], [1, "choice-grid"], ["type", "button", 1, "choice-card", 3, "active"], ["type", "button", 1, "choice-card", 3, "click"], ["placeholder", "ADMIN, SUPERVISOR u OPERATOR", 3, "ngModelChange", "ionBlur", "ionInput", "ngModel"], [1, "success-modal-content"], [1, "success-card"], [1, "success-mark"], [1, "success-actions"], [1, "detail-list"]], template: function AdminPanelPage_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ion-header")(1, "ion-toolbar")(2, "ion-title");
    \u0275\u0275text(3, "Administracion");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "ion-buttons", 0)(5, "ion-button", 1);
    \u0275\u0275text(6, "Panel");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(7, "ion-content", 2)(8, "section", 3)(9, "div", 4)(10, "div")(11, "span", 5);
    \u0275\u0275text(12, "Auth Service");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "h1");
    \u0275\u0275text(14, "Administracion de acceso");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "p");
    \u0275\u0275text(16, "Gestiona usuarios, consulta roles y revisa la auditoria del modulo de autenticacion.");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(17, AdminPanelPage_Conditional_17_Template, 2, 0, "ion-button", 6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "div", 7)(19, "article", 8)(20, "span");
    \u0275\u0275text(21, "Usuarios");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "strong");
    \u0275\u0275text(23);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(24, "article", 8)(25, "span");
    \u0275\u0275text(26, "Activos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "strong");
    \u0275\u0275text(28);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(29, "article", 8)(30, "span");
    \u0275\u0275text(31, "Bloqueados");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "strong");
    \u0275\u0275text(33);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(34, "article", 8)(35, "span");
    \u0275\u0275text(36, "Roles");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "strong");
    \u0275\u0275text(38);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(39, "div", 9)(40, "div", 10)(41, "button", 11);
    \u0275\u0275listener("click", function AdminPanelPage_Template_button_click_41_listener() {
      return ctx.setActiveTab("users");
    });
    \u0275\u0275text(42, "Usuarios");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(43, "button", 11);
    \u0275\u0275listener("click", function AdminPanelPage_Template_button_click_43_listener() {
      return ctx.setActiveTab("roles");
    });
    \u0275\u0275text(44, "Roles");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(45, "button", 11);
    \u0275\u0275listener("click", function AdminPanelPage_Template_button_click_45_listener() {
      return ctx.setActiveTab("audit");
    });
    \u0275\u0275text(46, "Auditoria");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(47, AdminPanelPage_Conditional_47_Template, 3, 1, "ion-text", 12);
    \u0275\u0275conditionalCreate(48, AdminPanelPage_Conditional_48_Template, 23, 9, "section", 13);
    \u0275\u0275conditionalCreate(49, AdminPanelPage_Conditional_49_Template, 9, 1, "section", 13);
    \u0275\u0275conditionalCreate(50, AdminPanelPage_Conditional_50_Template, 22, 3, "section", 13);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(51, "ion-modal", 14);
    \u0275\u0275listener("didDismiss", function AdminPanelPage_Template_ion_modal_didDismiss_51_listener() {
      return ctx.closeUserModal();
    });
    \u0275\u0275template(52, AdminPanelPage_ng_template_52_Template, 63, 23, "ng-template");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(53, "ion-modal", 15);
    \u0275\u0275listener("didDismiss", function AdminPanelPage_Template_ion_modal_didDismiss_53_listener() {
      return ctx.closeSuccessModal();
    });
    \u0275\u0275template(54, AdminPanelPage_ng_template_54_Template, 13, 2, "ng-template");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(55, "ion-modal", 16);
    \u0275\u0275listener("didDismiss", function AdminPanelPage_Template_ion_modal_didDismiss_55_listener() {
      return ctx.closeAuditDetail();
    });
    \u0275\u0275template(56, AdminPanelPage_ng_template_56_Template, 9, 1, "ng-template");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance(17);
    \u0275\u0275conditional(ctx.canManageUsers ? 17 : -1);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx.users.length);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx.activeUsersCount);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx.lockedUsersCount);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx.roles.length);
    \u0275\u0275advance(3);
    \u0275\u0275classProp("active", ctx.activeTab === "users");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", ctx.activeTab === "roles");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", ctx.activeTab === "audit");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx.errorMessage ? 47 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.activeTab === "users" ? 48 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.activeTab === "roles" ? 49 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.activeTab === "audit" ? 50 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("backdropDismiss", false)("isOpen", ctx.userFormOpen);
    \u0275\u0275advance(2);
    \u0275\u0275property("isOpen", ctx.successModalOpen);
    \u0275\u0275advance(2);
    \u0275\u0275property("isOpen", ctx.auditDetailOpen);
  }
}, dependencies: [
  CommonModule,
  FormsModule,
  NgControlStatus,
  MaxLengthValidator,
  NgModel,
  RouterLink,
  IonBadge,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonModal,
  IonSpinner,
  IonText,
  IonTitle,
  IonToolbar,
  DatePipe
], encapsulation: 2 });
var AdminPanelPage = _AdminPanelPage;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AdminPanelPage, [{
    type: Component,
    args: [{ selector: "app-admin-panel", standalone: true, imports: [
      CommonModule,
      FormsModule,
      RouterLink,
      IonBadge,
      IonButton,
      IonButtons,
      IonContent,
      IonHeader,
      IonInput,
      IonItem,
      IonLabel,
      IonModal,
      IonSpinner,
      IonText,
      IonTitle,
      IonToolbar
    ], template: `<ion-header>
  <ion-toolbar>
    <ion-title>Administracion</ion-title>
    <ion-buttons slot="end">
      <ion-button routerLink="/dashboard">Panel</ion-button>
    </ion-buttons>
  </ion-toolbar>
</ion-header>

<ion-content class="admin-content">
  <section class="admin-shell">
    <div class="admin-hero">
      <div>
        <span class="eyebrow">Auth Service</span>
        <h1>Administracion de acceso</h1>
        <p>Gestiona usuarios, consulta roles y revisa la auditoria del modulo de autenticacion.</p>
      </div>

      @if (canManageUsers) {
        <ion-button class="hero-action" (click)="openCreateUserModal()">
          Nuevo usuario
        </ion-button>
      }
    </div>

    <div class="metric-grid">
      <article class="metric-card">
        <span>Usuarios</span>
        <strong>{{ users.length }}</strong>
      </article>
      <article class="metric-card">
        <span>Activos</span>
        <strong>{{ activeUsersCount }}</strong>
      </article>
      <article class="metric-card">
        <span>Bloqueados</span>
        <strong>{{ lockedUsersCount }}</strong>
      </article>
      <article class="metric-card">
        <span>Roles</span>
        <strong>{{ roles.length }}</strong>
      </article>
    </div>

    <div class="workspace">
      <div class="tab-list">
        <button type="button" [class.active]="activeTab === 'users'" (click)="setActiveTab('users')">Usuarios</button>
        <button type="button" [class.active]="activeTab === 'roles'" (click)="setActiveTab('roles')">Roles</button>
        <button type="button" [class.active]="activeTab === 'audit'" (click)="setActiveTab('audit')">Auditoria</button>
      </div>

      @if (errorMessage) {
        <ion-text color="danger">
          <p class="feedback">{{ errorMessage }}</p>
        </ion-text>
      }

      @if (activeTab === 'users') {
        <section class="panel-section">
          <div class="section-heading">
            <div>
              <h2>Usuarios</h2>
              <p>Alta, edicion y control de estado de cuentas.</p>
            </div>
            <div class="toolbar-row">
              <div class="status-filter">
                <button type="button" [class.active]="userStatusFilter === undefined" (click)="setUserStatusFilter(undefined)">Todos</button>
                <button type="button" [class.active]="userStatusFilter === 1" (click)="setUserStatusFilter(1)">Activos</button>
                <button type="button" [class.active]="userStatusFilter === 2" (click)="setUserStatusFilter(2)">Bloqueados</button>
                <button type="button" [class.active]="userStatusFilter === 0" (click)="setUserStatusFilter(0)">Inactivos</button>
              </div>
              <ion-button fill="outline" (click)="loadUsers()">Actualizar</ion-button>
              <ion-button fill="clear" (click)="clearUserFilters()">Limpiar</ion-button>
            </div>
          </div>

          @if (loadingUsers) {
            <div class="loading-box"><ion-spinner name="crescent"></ion-spinner></div>
          } @else {
            <div class="data-table">
              <table>
                <thead>
                  <tr>
                    <th>Usuario</th>
                    <th>Nombre</th>
                    <th>Documento</th>
                    <th>Estado</th>
                    <th>Ultimo login</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  @for (user of users; track user.userId) {
                    <tr>
                      <td>
                        <strong>{{ user.username }}</strong>
                        <span>{{ user.email }}</span>
                      </td>
                      <td>{{ user.fullName }}</td>
                      <td>{{ user.documentType || '-' }} {{ user.documentNumber || '' }}</td>
                      <td>
                        <ion-badge [color]="getStatusColor(user.userStatus)">
                          {{ getUserStatusLabel(user.userStatus) }}
                        </ion-badge>
                      </td>
                      <td>{{ user.lastLoginAt ? (user.lastLoginAt | date:'short') : '-' }}</td>
                      <td class="actions">
                        @if (canManageUsers) {
                          <ion-button size="small" (click)="openEditUserModal(user)">Editar</ion-button>
                          <ion-button size="small" fill="outline" color="success" (click)="activateUser(user.userId)">Activar</ion-button>
                          <ion-button size="small" fill="outline" color="warning" (click)="lockUser(user.userId)">Bloquear</ion-button>
                          <ion-button size="small" fill="outline" color="danger" (click)="deactivateUser(user.userId)">Desactivar</ion-button>
                        } @else {
                          <span>Solo lectura</span>
                        }
                      </td>
                    </tr>
                  } @empty {
                    <tr>
                      <td colspan="6" class="empty-state">No hay usuarios para mostrar.</td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          }
        </section>
      }

      @if (activeTab === 'roles') {
        <section class="panel-section">
          <div class="section-heading">
            <div>
              <h2>Roles</h2>
              <p>Roles disponibles para asignacion y permisos.</p>
            </div>
          </div>

          @if (loadingRoles) {
            <div class="loading-box"><ion-spinner name="crescent"></ion-spinner></div>
          } @else {
            <div class="role-grid">
              @for (role of roles; track role.roleId) {
                <article class="role-card">
                  <div>
                    <h2>{{ role.roleName }}</h2>
                    <p>{{ role.roleCode }}</p>
                  </div>
                  <ion-badge [color]="role.roleStatus === 1 ? 'success' : 'medium'">
                    {{ role.roleStatus === 1 ? 'Activo' : 'Inactivo' }}
                  </ion-badge>
                  <p>{{ role.roleDescription || 'Sin descripcion.' }}</p>
                </article>
              }
            </div>
          }
        </section>
      }

      @if (activeTab === 'audit') {
        <section class="panel-section">
          <div class="section-heading">
            <div>
              <h2>Auditoria</h2>
              <p>Eventos de seguridad, accesos y cambios administrativos.</p>
            </div>
            <div class="toolbar-row">
              <ion-item class="select-field">
                <ion-label position="floating">Usuario afectado</ion-label>
                <ion-input [(ngModel)]="auditUserFilter" type="number"></ion-input>
              </ion-item>

              <ion-item class="select-field">
                <ion-label position="floating">Accion</ion-label>
                <ion-input [(ngModel)]="auditActionFilter" type="text"></ion-input>
              </ion-item>

              <ion-button fill="outline" (click)="loadAuditLogs()">Buscar</ion-button>
              <ion-button fill="clear" (click)="clearAuditFilters()">Limpiar</ion-button>
            </div>
          </div>

          @if (loadingAuditLogs) {
            <div class="loading-box"><ion-spinner name="crescent"></ion-spinner></div>
          } @else {
            <div class="data-table">
              <table>
                <thead>
                  <tr>
                    <th>Accion</th>
                    <th>Tabla</th>
                    <th>Usuario afectado</th>
                    <th>Ejecutado por</th>
                    <th>Fecha</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  @for (auditLog of auditLogs; track auditLog.auditLogId) {
                    <tr>
                      <td><strong>{{ auditLog.actionType }}</strong></td>
                      <td>{{ auditLog.affectedTableName || '-' }}</td>
                      <td>{{ auditLog.affectedUserId || '-' }}</td>
                      <td>{{ auditLog.executedByUserId || '-' }}</td>
                      <td>{{ auditLog.executedAt | date:'short' }}</td>
                      <td class="actions">
                        <ion-button size="small" fill="outline" (click)="openAuditDetail(auditLog)">Ver</ion-button>
                      </td>
                    </tr>
                  } @empty {
                    <tr>
                      <td colspan="6" class="empty-state">No hay eventos para mostrar.</td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          }
        </section>
      }
    </div>
  </section>

  <ion-modal
    class="entity-modal"
    [backdropDismiss]="false"
    [isOpen]="userFormOpen"
    (didDismiss)="closeUserModal()">
    <ng-template>
      <ion-header>
        <ion-toolbar>
          <ion-title>{{ userModalTitle }}</ion-title>
          <ion-buttons slot="end">
            <ion-button (click)="closeUserModal()">Cerrar</ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>

      <ion-content class="modal-content">
        <div class="modal-intro">
          <span class="mode-pill">{{ userFormMode === 'create' ? 'Alta de usuario' : 'Edicion de usuario' }}</span>
          <h2>{{ userModalTitle }}</h2>
          <p>{{ userModalDescription }}</p>
        </div>

        @if (userFormMode === 'edit') {
          <div class="selected-user-banner">
            <div>
              <strong>{{ userForm.fullName }}</strong>
              <span>{{ userForm.email }}</span>
            </div>
            <ion-badge color="primary">ID {{ userForm.userId }}</ion-badge>
          </div>
        }

        @if (formErrorMessage) {
          <ion-text color="danger">
            <p class="form-feedback">{{ formErrorMessage }}</p>
          </ion-text>
        }

        <div class="form-grid">
          <div class="field-block">
            <span>Usuario *</span>
            <ion-item>
              <ion-input
                [(ngModel)]="userForm.username"
                placeholder="admin.operaciones"
                (ionBlur)="markUserFieldAsTouched('username')"
                (ionInput)="markUserFieldAsTouched('username')">
              </ion-input>
            </ion-item>
            @if (shouldShowUserFieldError('username')) {
              <small>{{ getUserFieldError('username') }}</small>
            }
          </div>

          <div class="field-block">
            <span>Correo *</span>
            <ion-item>
              <ion-input
                [(ngModel)]="userForm.email"
                placeholder="usuario@empresa.com"
                type="email"
                (ionBlur)="markUserFieldAsTouched('email')"
                (ionInput)="markUserFieldAsTouched('email')">
              </ion-input>
            </ion-item>
            @if (shouldShowUserFieldError('email')) {
              <small>{{ getUserFieldError('email') }}</small>
            }
          </div>

          @if (userFormMode === 'create') {
            <div class="field-block">
              <span>Contrasena *</span>
              <ion-item>
                <ion-input
                  [(ngModel)]="userForm.password"
                  placeholder="Minimo 6 caracteres"
                  type="password"
                  (ionBlur)="markUserFieldAsTouched('password')"
                  (ionInput)="markUserFieldAsTouched('password')">
                </ion-input>
              </ion-item>
              @if (shouldShowUserFieldError('password')) {
                <small>{{ getUserFieldError('password') }}</small>
              }
            </div>

            <div class="field-block">
              <span>Rol inicial *</span>
              @if (getRoleOptions().length) {
                <div class="choice-grid">
                  @for (role of getRoleOptions(); track role.roleId) {
                    <button
                      type="button"
                      class="choice-card"
                      [class.active]="userForm.roleCode === role.roleCode"
                      (click)="selectRole(role.roleCode)">
                      <strong>{{ role.roleName }}</strong>
                      <span>{{ role.roleCode }}</span>
                    </button>
                  }
                </div>
              } @else {
                <ion-item>
                  <ion-input
                    [(ngModel)]="userForm.roleCode"
                    placeholder="ADMIN, SUPERVISOR u OPERATOR"
                    (ionBlur)="markUserFieldAsTouched('roleCode')"
                    (ionInput)="markUserFieldAsTouched('roleCode')">
                  </ion-input>
                </ion-item>
              }
              @if (shouldShowUserFieldError('roleCode')) {
                <small>{{ getUserFieldError('roleCode') }}</small>
              }
            </div>
          }

          <div class="field-block wide-field">
            <span>Nombre completo *</span>
            <ion-item>
              <ion-input
                [(ngModel)]="userForm.fullName"
                placeholder="Nombre y apellidos"
                (ionBlur)="markUserFieldAsTouched('fullName')"
                (ionInput)="markUserFieldAsTouched('fullName')">
              </ion-input>
            </ion-item>
            @if (shouldShowUserFieldError('fullName')) {
              <small>{{ getUserFieldError('fullName') }}</small>
            }
          </div>

          <div class="field-block">
            <span>Telefono</span>
            <ion-item>
              <ion-input
                [(ngModel)]="userForm.phoneNumber"
                maxlength="9"
                placeholder="999999999"
                (ionBlur)="markUserFieldAsTouched('phoneNumber')"
                (ionInput)="markUserFieldAsTouched('phoneNumber')">
              </ion-input>
            </ion-item>
            @if (shouldShowUserFieldError('phoneNumber')) {
              <small>{{ getUserFieldError('phoneNumber') }}</small>
            }
          </div>

          <div class="field-block">
            <span>Tipo de documento</span>
            <div class="choice-row">
              <button type="button" [class.active]="userForm.documentType === ''" (click)="selectDocumentType('')">Sin documento</button>
              <button type="button" [class.active]="userForm.documentType === 'DNI'" (click)="selectDocumentType('DNI')">DNI</button>
            </div>
          </div>

          <div class="field-block">
            <span>Numero documento</span>
            <ion-item>
              <ion-input
                [(ngModel)]="userForm.documentNumber"
                maxlength="8"
                placeholder="00000000"
                (ionBlur)="markUserFieldAsTouched('documentNumber')"
                (ionInput)="markUserFieldAsTouched('documentNumber')">
              </ion-input>
            </ion-item>
            @if (shouldShowUserFieldError('documentNumber')) {
              <small>{{ getUserFieldError('documentNumber') }}</small>
            }
          </div>
        </div>

        <div class="modal-actions">
          <ion-button fill="outline" (click)="closeUserModal()">Cancelar</ion-button>
          <ion-button [disabled]="savingUser || !isUserFormValid()" (click)="saveUser()">
            @if (savingUser) {
              <ion-spinner name="crescent"></ion-spinner>
            } @else {
              {{ userPrimaryActionLabel }}
            }
          </ion-button>
        </div>
      </ion-content>
    </ng-template>
  </ion-modal>

  <ion-modal
    class="success-modal"
    [isOpen]="successModalOpen"
    (didDismiss)="closeSuccessModal()">
    <ng-template>
      <ion-content class="success-modal-content">
        <div class="success-card">
          <div class="success-mark">OK</div>
          <span class="mode-pill">Operacion completada</span>
          <h2>{{ successModalTitle }}</h2>
          <p>{{ successModalMessage }}</p>

          <div class="success-actions">
            <ion-button (click)="closeSuccessModal()">Volver a usuarios</ion-button>
          </div>
        </div>
      </ion-content>
    </ng-template>
  </ion-modal>

  <ion-modal [isOpen]="auditDetailOpen" (didDismiss)="closeAuditDetail()">
    <ng-template>
      <ion-header>
        <ion-toolbar>
          <ion-title>Detalle de auditoria</ion-title>
          <ion-buttons slot="end">
            <ion-button (click)="closeAuditDetail()">Cerrar</ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>

      <ion-content class="modal-content">
        @if (selectedAuditLog) {
          <dl class="detail-list">
            <dt>Accion</dt>
            <dd>{{ selectedAuditLog.actionType }}</dd>
            <dt>Descripcion</dt>
            <dd>{{ selectedAuditLog.actionDescription || '-' }}</dd>
            <dt>Tabla / registro</dt>
            <dd>{{ selectedAuditLog.affectedTableName || '-' }} #{{ selectedAuditLog.affectedRecordId || '-' }}</dd>
            <dt>IP</dt>
            <dd>{{ selectedAuditLog.ipAddress || '-' }}</dd>
            <dt>User agent</dt>
            <dd>{{ selectedAuditLog.userAgent || '-' }}</dd>
            <dt>Datos anteriores</dt>
            <dd><pre>{{ selectedAuditLog.oldData || '-' }}</pre></dd>
            <dt>Datos nuevos</dt>
            <dd><pre>{{ selectedAuditLog.newData || '-' }}</pre></dd>
          </dl>
        }
      </ion-content>
    </ng-template>
  </ion-modal>
</ion-content>
` }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AdminPanelPage, { className: "AdminPanelPage", filePath: "src/app/features/admin/pages/admin-panel/admin-panel.page.ts", lineNumber: 72 });
})();
export {
  AdminPanelPage
};
//# sourceMappingURL=admin-panel.page-3KFTYCZF.js.map
