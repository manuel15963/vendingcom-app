/*
 * Genera src/environments/environment.ts y environment.prod.ts inyectando
 * la API key de Google Maps desde la variable de entorno GOOGLE_MAPS_API_KEY:
 *   - Deploy (Render): variable de entorno del servicio.
 *   - Local: archivo .env en la raíz del front (GOOGLE_MAPS_API_KEY=...).
 *
 * Así la API key NO se versiona en git (el repositorio es público).
 * Estos dos archivos están en .gitignore y se regeneran en cada
 * `npm start` / `npm run build`.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const ENV_DIR = path.join(ROOT, 'src', 'environments');

const URLS = {
  apiUrl: 'https://vendingcom-auth-service.onrender.com/api/v1',
  customerApiUrl: 'https://vendingcom-customer-service.onrender.com/api/v1',
  locationApiUrl: 'https://location-service-bzms.onrender.com/api/v1',
  machineApiUrl: 'https://vendingcom-machine-service.onrender.com/api/v1',
};

function readVar(name) {
  if (process.env[name]) {
    return process.env[name].trim();
  }
  const dotenv = path.join(ROOT, '.env');
  if (fs.existsSync(dotenv)) {
    const line = fs
      .readFileSync(dotenv, 'utf8')
      .split('\n')
      .find((l) => l.trim().startsWith(name + '='));
    if (line) {
      return line.slice(line.indexOf('=') + 1).trim().replace(/^["']|["']$/g, '');
    }
  }
  return '';
}

const key = readVar('GOOGLE_MAPS_API_KEY');
const supabaseUrl = readVar('SUPABASE_URL');
const supabaseAnonKey = readVar('SUPABASE_ANON_KEY');

function render(production) {
  return `import { Environment } from './environment.model';

// ARCHIVO GENERADO por scripts/set-env.js — no lo edites a mano (está en .gitignore).
// La API key de Google Maps se inyecta desde la variable GOOGLE_MAPS_API_KEY.
export const environment: Environment = {
  production: ${production},
  apiUrl: '${URLS.apiUrl}',
  customerApiUrl: '${URLS.customerApiUrl}',
  locationApiUrl: '${URLS.locationApiUrl}',
  machineApiUrl: '${URLS.machineApiUrl}',
  googleMapsApiKey: '${key}',
  supabaseUrl: '${supabaseUrl}',
  supabaseAnonKey: '${supabaseAnonKey}'
};
`;
}

fs.writeFileSync(path.join(ENV_DIR, 'environment.ts'), render(false));
fs.writeFileSync(path.join(ENV_DIR, 'environment.prod.ts'), render(true));

console.log(
  key
    ? '✓ environments: API key de Google Maps inyectada.'
    : '⚠ environments SIN Google Maps API key (define GOOGLE_MAPS_API_KEY).',
);
console.log(
  supabaseUrl && supabaseAnonKey
    ? '✓ environments: Supabase Storage configurado.'
    : '⚠ environments SIN Supabase Storage (define SUPABASE_URL y SUPABASE_ANON_KEY para subir documentos).',
);
