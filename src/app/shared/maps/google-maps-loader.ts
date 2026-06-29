import { importLibrary, setOptions } from '@googlemaps/js-api-loader';

import { environment } from '@env/environment';

/** Bibliotecas de Google Maps que usamos en la app. */
type MapsLibrary = 'maps' | 'places' | 'geocoding' | 'marker';

let configured = false;

/** ¿Hay una API key real configurada (no el placeholder)? */
export function hasGoogleMapsKey(): boolean {
  const key = environment.googleMapsApiKey;
  return !!key && !key.startsWith('TU_');
}

/**
 * Carga (una sola vez) Google Maps con las bibliotecas pedidas.
 * setOptions se llama una única vez para no reconfigurar tras cargar.
 */
export async function loadGoogleMaps(libraries: MapsLibrary[]): Promise<void> {
  if (!configured) {
    setOptions({ key: environment.googleMapsApiKey, v: 'weekly', region: 'PE', language: 'es' });
    configured = true;
  }
  await Promise.all(libraries.map((library) => importLibrary(library)));
}
