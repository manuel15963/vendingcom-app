import { isValidRuc, validateDocumentNumber } from './document-number.validator';

describe('document-number.validator', () => {
  describe('isValidRuc', () => {
    it('acepta RUCs reales con dígito verificador correcto', () => {
      expect(isValidRuc('20131312955')).toBe(true);
      expect(isValidRuc('20100070970')).toBe(true);
    });

    it('rechaza longitud incorrecta', () => {
      expect(isValidRuc('123')).toBe(false);
      expect(isValidRuc('201313129555')).toBe(false);
    });

    it('rechaza caracteres no numéricos', () => {
      expect(isValidRuc('2013131295A')).toBe(false);
    });

    it('rechaza prefijo inválido', () => {
      expect(isValidRuc('99131312955')).toBe(false);
    });

    it('rechaza dígito verificador incorrecto', () => {
      expect(isValidRuc('20131312956')).toBe(false);
    });
  });

  describe('validateDocumentNumber', () => {
    it('RUC: null si es válido, mensaje si no', () => {
      expect(validateDocumentNumber('RUC', '20131312955')).toBeNull();
      expect(validateDocumentNumber('RUC', '123')).toContain('RUC');
    });

    it('DNI: exactamente 8 dígitos', () => {
      expect(validateDocumentNumber('DNI', '12345678')).toBeNull();
      expect(validateDocumentNumber('DNI', '1234')).not.toBeNull();
    });

    it('CE: 9 a 12 alfanumérico (insensible a mayúsculas)', () => {
      expect(validateDocumentNumber('CE', 'ABC123456')).toBeNull();
      expect(validateDocumentNumber('CE', 'abc123456')).toBeNull();
      expect(validateDocumentNumber('CE', '123')).not.toBeNull();
    });

    it('Pasaporte: 6 a 15 alfanumérico', () => {
      expect(validateDocumentNumber('PASAPORTE', 'A1234567')).toBeNull();
      expect(validateDocumentNumber('PASAPORTE', '12')).not.toBeNull();
    });

    it('vacío o tipo desconocido => null (lo maneja "requerido")', () => {
      expect(validateDocumentNumber('RUC', '')).toBeNull();
      expect(validateDocumentNumber(undefined, '20131312955')).toBeNull();
    });
  });
});
