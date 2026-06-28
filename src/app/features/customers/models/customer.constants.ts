/**
 * Códigos y etiquetas del dominio de clientes.
 * Centralizados para no repetir 'magic strings' por el código.
 */

/** Grupos del catálogo (customer_parameters). */
export const ParameterGroup = {
  CUSTOMER_TYPE: 'CUSTOMER_TYPE',
  DOCUMENT_TYPE: 'DOCUMENT_TYPE',
  ADDRESS_TYPE: 'ADDRESS_TYPE',
} as const;

/** Códigos de tipo de cliente. */
export const CustomerTypeCode = {
  EMPRESA: 'EMPRESA',
  INSTITUCION: 'INSTITUCION',
  PERSONA: 'PERSONA',
} as const;

/** Códigos de tipo de documento. */
export const DocumentTypeCode = {
  RUC: 'RUC',
  DNI: 'DNI',
  CE: 'CE',
  PASAPORTE: 'PASAPORTE',
} as const;

/** Etiquetas de estado que devuelve el backend (status convertido a texto). */
export const StatusLabel = {
  ACTIVE: 'ACTIVO',
  INACTIVE: 'INACTIVO',
} as const;
