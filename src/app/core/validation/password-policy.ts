// Politica de contrasena alineada con el backend (auth-service):
// minimo 8 caracteres, con al menos una letra y un numero.
export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_MAX_LENGTH = 100;
export const PASSWORD_PATTERN = /^(?=.*[A-Za-z])(?=.*\d).{8,100}$/;
export const PASSWORD_HINT = 'Minimo 8 caracteres, con al menos una letra y un numero.';

/**
 * Devuelve el mensaje de error de la contrasena, o null si es valida.
 */
export function getPasswordError(value: string): string | null {
  const password = (value ?? '').trim();

  if (!password) {
    return 'La contrasena es obligatoria.';
  }
  if (password.length < PASSWORD_MIN_LENGTH) {
    return `Debe tener al menos ${PASSWORD_MIN_LENGTH} caracteres.`;
  }
  if (password.length > PASSWORD_MAX_LENGTH) {
    return `No debe superar ${PASSWORD_MAX_LENGTH} caracteres.`;
  }
  if (!PASSWORD_PATTERN.test(password)) {
    return 'Debe incluir al menos una letra y un numero.';
  }

  return null;
}

export function isPasswordValid(value: string): boolean {
  return getPasswordError(value) === null;
}
