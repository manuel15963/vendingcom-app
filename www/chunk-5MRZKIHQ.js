import {
  HttpClient,
  Injectable,
  apiEndpoints,
  inject,
  setClassMetadata,
  ɵɵdefineInjectable
} from "./chunk-GVVL6FWI.js";

// src/app/features/password/data-access/password-api.service.ts
var _PasswordApiService = class _PasswordApiService {
  constructor() {
    this.http = inject(HttpClient);
  }
  changeMyPassword(request) {
    return this.http.patch(apiEndpoints.password.changeMyPassword, request);
  }
  requestRecovery(request) {
    return this.http.post(apiEndpoints.password.requestRecovery, request);
  }
  confirmRecovery(request) {
    return this.http.post(apiEndpoints.password.confirmRecovery, request);
  }
};
_PasswordApiService.\u0275fac = function PasswordApiService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _PasswordApiService)();
};
_PasswordApiService.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _PasswordApiService, factory: _PasswordApiService.\u0275fac, providedIn: "root" });
var PasswordApiService = _PasswordApiService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PasswordApiService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

export {
  PasswordApiService
};
//# sourceMappingURL=chunk-5MRZKIHQ.js.map
