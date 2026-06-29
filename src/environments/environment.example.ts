import { Environment } from './environment.model';

/*
 * PLANTILLA de referencia (esta SÍ se versiona).
 * Los archivos reales environment.ts y environment.prod.ts se GENERAN con
 * `node scripts/set-env.js` (lo corren npm start / npm run build) y están en .gitignore.
 *
 * La API key de Google Maps sale de la variable GOOGLE_MAPS_API_KEY:
 *   - Local:  crea un archivo .env en la raíz del front con  GOOGLE_MAPS_API_KEY=tu_key
 *   - Render: agrégala en Environment del sitio del frontend
 */
export const environment: Environment = {
  production: false,
  apiUrl: 'https://vendingcom-auth-service.onrender.com/api/v1',
  customerApiUrl: 'https://vendingcom-customer-service.onrender.com/api/v1',
  locationApiUrl: 'https://location-service-bzms.onrender.com/api/v1',
  googleMapsApiKey: 'TU_API_KEY_DE_GOOGLE_MAPS'
};
