/**
 * Forma del objeto de entorno. Garantiza que dev y prod tengan las mismas propiedades.
 */
export interface Environment {
  production: boolean;
  /** auth-service (emite los JWT). */
  apiUrl: string;
  /** customer-service. */
  customerApiUrl: string;
  /** location-service. */
  locationApiUrl: string;
  /** machine-service. */
  machineApiUrl: string;
  /** API key de Google Maps (Maps JavaScript + Places + Geocoding). Restríngela por referrer. */
  googleMapsApiKey: string;
}
