// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { Environment } from './environment.model';

export const environment: Environment = {
  production: false,
  // auth-service (desplegado en Render)
  apiUrl: 'https://vendingcom-auth-service.onrender.com/api/v1',
  // customer-service (desplegado en Render)
  customerApiUrl: 'https://vendingcom-customer-service.onrender.com/api/v1',
  // location-service (en desarrollo: se ejecuta en local en el puerto 8083)
  locationApiUrl: 'http://localhost:8083/api/v1'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
