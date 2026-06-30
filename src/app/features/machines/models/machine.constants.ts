/**
 * Códigos y etiquetas del dominio de máquinas.
 */

/** Grupos del catálogo (machine_parameters). */
export const ParameterGroup = {
  MACHINE_STATUS: 'MACHINE_STATUS',
  MACHINE_TYPE: 'MACHINE_TYPE',
  EVENT_TYPE: 'EVENT_TYPE',
  DOCUMENT_TYPE: 'DOCUMENT_TYPE',
} as const;

/** Códigos de estado (los que entiende PATCH /status). */
export const StatusCode = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  MAINTENANCE: 'MAINTENANCE',
  OUT_OF_SERVICE: 'OUT_OF_SERVICE',
} as const;

/** Etiquetas visibles que devuelve el backend (machineStatusName = parameter_value). */
export const StatusLabel = {
  ACTIVE: 'Activa',
  INACTIVE: 'Inactiva',
  MAINTENANCE: 'En mantenimiento',
  OUT_OF_SERVICE: 'Fuera de servicio',
} as const;

/** Estados para el selector "cambiar estado" (código + etiqueta). */
export const MACHINE_STATUSES: ReadonlyArray<{ code: string; label: string }> = [
  { code: StatusCode.ACTIVE, label: StatusLabel.ACTIVE },
  { code: StatusCode.MAINTENANCE, label: StatusLabel.MAINTENANCE },
  { code: StatusCode.OUT_OF_SERVICE, label: StatusLabel.OUT_OF_SERVICE },
  { code: StatusCode.INACTIVE, label: StatusLabel.INACTIVE },
];
