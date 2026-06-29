/**
 * Códigos y etiquetas del dominio de ubicaciones.
 * Centralizados para no repetir 'magic strings' por el código.
 */

/** Grupos del catálogo (location_parameters). */
export const ParameterGroup = {
  LOCATION_TYPE: 'LOCATION_TYPE',
  LOCATION_ZONE: 'LOCATION_ZONE',
} as const;

/** Etiquetas de estado que devuelve el backend (status convertido a texto). */
export const StatusLabel = {
  ACTIVE: 'ACTIVO',
  INACTIVE: 'INACTIVO',
} as const;

/** Días de la semana (1 = lunes … 7 = domingo), tal como los espera el backend. */
export const DAYS_OF_WEEK: ReadonlyArray<{ value: number; label: string; short: string }> = [
  { value: 1, label: 'Lunes', short: 'Lun' },
  { value: 2, label: 'Martes', short: 'Mar' },
  { value: 3, label: 'Miércoles', short: 'Mié' },
  { value: 4, label: 'Jueves', short: 'Jue' },
  { value: 5, label: 'Viernes', short: 'Vie' },
  { value: 6, label: 'Sábado', short: 'Sáb' },
  { value: 7, label: 'Domingo', short: 'Dom' },
];

/** Nombre del día a partir de su número (1-7). */
export function dayLabel(day: number): string {
  return DAYS_OF_WEEK.find((d) => d.value === day)?.label ?? `Día ${day}`;
}
