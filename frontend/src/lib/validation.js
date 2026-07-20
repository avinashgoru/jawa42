export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const PHONE_REGEX = /^\+?[0-9\s-]{10,15}$/;

export function isValidEmail(value) {
  return EMAIL_REGEX.test(String(value || '').trim());
}

export function isValidPhone(value) {
  return PHONE_REGEX.test(String(value || '').trim());
}

export function isNonEmpty(value) {
  return Boolean(String(value || '').trim());
}
