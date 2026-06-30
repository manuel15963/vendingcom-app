import { Environment } from './environment.model';

/*
 * PLANTILLA de referencia (esta SÍ se versiona).
 * Los archivos reales environment.ts y environment.prod.ts se GENERAN con
 * `node scripts/set-env.js` (lo corren npm start / npm run build) y están en .gitignore.
 *
 * Las llaves salen de variables de entorno (.env local o Render):
 *   - GOOGLE_MAPS_API_KEY  -> Google Maps
 *   - SUPABASE_URL         -> https://xxxx.supabase.co  (subida de documentos)
 *   - SUPABASE_ANON_KEY    -> anon key del proyecto Supabase (pública)
 */
export const environment: Environment = {
  production: false,
  apiUrl: 'https://vendingcom-auth-service.onrender.com/api/v1',
  customerApiUrl: 'https://vendingcom-customer-service.onrender.com/api/v1',
  locationApiUrl: 'https://location-service-bzms.onrender.com/api/v1',
  machineApiUrl: 'https://vendingcom-machine-service.onrender.com/api/v1',
  googleMapsApiKey: 'TU_API_KEY_DE_GOOGLE_MAPS',
  supabaseUrl: 'https://TU_PROYECTO.supabase.co',
  supabaseAnonKey: 'TU_SUPABASE_ANON_KEY'
};
