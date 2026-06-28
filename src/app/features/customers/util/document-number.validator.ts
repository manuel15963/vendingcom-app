import { DocumentTypeCode } from '../models/customer.constants';

/**
 * Validación del número de documento — espejo exacto del backend.
 * Funciones puras: fáciles de testear y reutilizar.
 */

/** RUC peruano válido: 11 dígitos, prefijo conocido y dígito verificador (módulo 11). */
export function isValidRuc(ruc: string): boolean {
  if (!/^\d{11}$/.test(ruc)) {
    return false;
  }
  if (!['10', '15', '16', '17', '20'].includes(ruc.substring(0, 2))) {
    return false;
  }
  const weights = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2];
  let sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(ruc.charAt(i), 10) * weights[i];
  }
  const remainder = 11 - (sum % 11);
  const checkDigit = remainder === 10 ? 0 : remainder === 11 ? 1 : remainder;
  return checkDigit === parseInt(ruc.charAt(10), 10);
}

/**
 * Devuelve el mensaje de error de formato según el tipo de documento.
 * null = válido (o vacío, que lo maneja "requerido").
 */
export function validateDocumentNumber(typeCode: string | undefined, rawNumber: string): string | null {
  const num = (rawNumber || '').trim().toUpperCase();
  if (!num) {
    return null;
  }
  switch (typeCode) {
    case DocumentTypeCode.RUC:
      return isValidRuc(num) ? null : 'RUC inválido: 11 dígitos y dígito verificador.';
    case DocumentTypeCode.DNI:
      return /^\d{8}$/.test(num) ? null : 'El DNI debe tener 8 dígitos.';
    case DocumentTypeCode.CE:
      return /^[A-Z0-9]{9,12}$/.test(num) ? null : 'Carnet de Extranjería: 9 a 12 caracteres.';
    case DocumentTypeCode.PASAPORTE:
      return /^[A-Z0-9]{6,15}$/.test(num) ? null : 'Pasaporte: 6 a 15 caracteres.';
    default:
      return null;
  }
}
