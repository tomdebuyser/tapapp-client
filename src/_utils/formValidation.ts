import { translations } from '../_translations';

function trim(value: string): string {
  return value.replace(/\s/g, '');
}

function isEmptyString(value: string): boolean {
  return !value || trim(value) === '';
}

interface IValidatorResponse {
  error: string;
  isValid: boolean;
}

export const formValidator = {
  email: function(email: string): IValidatorResponse {
    const isValid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
    return {
      error: isValid ? null : translations.getLabel('ERRORS.VALIDATION.INVALID'),
      isValid,
    };
  },
  enumValue: function<T>(value: string, enumeration: T): IValidatorResponse {
    const isValid = Object.values(enumeration).includes(value);
    return {
      error: isValid ? null : translations.getLabel('ERRORS.VALIDATION.INVALID'),
      isValid,
    };
  },
  maxLength: function(value: string, max: number): IValidatorResponse {
    const isValid = `${value}`.length <= max;
    return {
      error: isValid ? null : translations.getLabel('ERRORS.VALIDATION.MAX_LENGTH', { length: max }),
      isValid,
    };
  },
  minLength: function(value: string, min: number): IValidatorResponse {
    const isValid = `${value}`.length >= min;
    return {
      error: isValid ? null : translations.getLabel('ERRORS.VALIDATION.MIN_LENGTH', { length: min }),
      isValid,
    };
  },
  notEmptyArray: function(array: unknown[]): IValidatorResponse {
    const isValid = array?.length > 0;
    return {
      error: isValid ? null : translations.getLabel('ERRORS.VALIDATION.EMPTY_ARRAY'),
      isValid,
    };
  },
  number: function(value: string): IValidatorResponse {
    const isValid = !Number.isNaN(parseFloat(value));
    return {
      error: isValid ? null : translations.getLabel('ERRORS.VALIDATION.NOT_A_NUMBER'),
      isValid,
    };
  },
  password: function(password: string): IValidatorResponse {
    // Password requirements: min. 8 characters, at least one uppercase letter, one lowercase letter, and one number.
    const length = 8;
    let isValid = formValidator.minLength(password, length).isValid;
    if (!isValid) {
      return {
        error: translations.getLabel('ERRORS.VALIDATION.PASSWORD_TOO_SHORT'),
        isValid,
      };
    }
    isValid = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/.test(password);
    return {
      error: isValid ? null : translations.getLabel('ERRORS.VALIDATION.PASSWORD_UNSAFE'),
      isValid,
    };
  },
  required: function(value: unknown): IValidatorResponse {
    const isValid = !isEmptyString(`${value}`) && !!value;
    return {
      error: isValid ? null : translations.getLabel('ERRORS.VALIDATION.REQUIRED'),
      isValid,
    };
  },
};
