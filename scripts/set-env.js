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
};

function readKey() {
  if (process.env.GOOGLE_MAPS_API_KEY) {
    return process.env.GOOGLE_MAPS_API_KEY.trim();
  }
  const dotenv = path.join(ROOT, '.env');
  if (fs.existsSync(dotenv)) {
    const line = fs
      .readFileSync(dotenv, 'utf8')
      .split('\n')
      .find((l) => l.trim().startsWith('GOOGLE_MAPS_API_KEY='));
    if (line) {
      return line.slice(line.indexOf('=') + 1).trim().replace(/^["']|["']$/g, '');
    }
  }
  return '';
}

const key = readKey();

function render(production) {
  return `import { Environment } from './environment.model';

// ARCHIVO GENERADO por scripts/set-env.js — no lo edites a mano (está en .gitignore).
// La API key de Google Maps se inyecta desde la variable GOOGLE_MAPS_API_KEY.
export const environment: Environment = {
  production: ${production},
  apiUrl: '${URLS.apiUrl}',
  customerApiUrl: '${URLS.customerApiUrl}',
  locationApiUrl: '${URLS.locationApiUrl}',
  googleMapsApiKey: '${key}'
};
`;
}

fs.writeFileSync(path.join(ENV_DIR, 'environment.ts'), render(false));
fs.writeFileSync(path.join(ENV_DIR, 'environment.prod.ts'), render(true));

console.log(
  key
    ? '✓ environments generados con la API key de Google Maps.'
    : '⚠ environments generados SIN API key. Define GOOGLE_MAPS_API_KEY en .env (local) o en Render (deploy).',
);
