import { translations } from '../_translations';
import { FormValidationErrors } from '../_hooks/useForm';

/**
 * All form validators return an error message if they validated to false.
 * When it returns nothing, it validated to true.
 */

function trim(value: string): string {
  return value.replace(/\s/g, '');
}

function isEmptyString(value: string): boolean {
  return !value || trim(value) === '';
}

function isRequired(value: unknown): string {
  const isValid = !isEmptyString(`${value}`) && !!value;
  return isValid ? null : translations.getLabel('ERRORS.VALIDATION.REQUIRED');
}

function hasMaxLength(value: string, max: number): string {
  const isValid = `${value}`.length <= max;
  return isValid ? null : translations.getLabel('ERRORS.VALIDATION.MAX_LENGTH', { length: max });
}

function hasMinLength(value: string, min: number): string {
  const isValid = `${value}`.length >= min;
  return isValid ? null : translations.getLabel('ERRORS.VALIDATION.MIN_LENGTH', { length: min });
}

function isNumber(value: string): string {
  const isValid = !Number.isNaN(parseFloat(value));
  return isValid ? null : translations.getLabel('ERRORS.VALIDATION.NOT_A_NUMBER');
}

function isEmail(email: string): string {
  const isValid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
  return isValid ? null : translations.getLabel('ERRORS.VALIDATION.INVALID');
}

function isPassword(password: string): string {
  // Password requirements: min. 8 characters, at least one uppercase letter, one lowercase letter, and one number.
  const length = 8;
  if (!hasMaxLength(password, length)) return translations.getLabel('ERRORS.VALIDATION.PASSWORD_TOO_SHORT');
  const isValid = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/.test(password);
  return isValid ? null : translations.getLabel('ERRORS.VALIDATION.PASSWORD_UNSAFE');
}

function isNotEmptyArray(array: unknown[]): string {
  const isValid = array?.length;
  return isValid ? null : translations.getLabel('ERRORS.VALIDATION.EMPTY_ARRAY');
}

function getValidationErrorMessage(errors: FormValidationErrors, labelMapper?: (name: string) => string): string {
  const errorKeys = Object.keys(errors).filter(name => !!errors[name]);
  if (errorKeys.length === 0) return null;
  return translations.getLabel('ERRORS.VALIDATION.FORM', {
    fields: errorKeys.map(name => (labelMapper ? labelMapper(name) : name)).join(', '),
  });
}

export const formValidator = {
  getValidationErrorMessage,
  hasMaxLength,
  hasMinLength,
  isEmail,
  isNotEmptyArray,
  isNumber,
  isPassword,
  isRequired,
};
