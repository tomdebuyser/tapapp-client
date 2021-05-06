import { I18n } from '../_translations';
import { isAfterDate, isBeforeDate, formatDate, DEFAULT_DATE_STRING_FORMAT, DEFAULT_TIME_STRING_FORMAT } from './dateHelpers';

export function trim(value: string): string {
  return value.replace(/\s/g, '');
}

export function isEmptyString(value: string): boolean {
  return !value || trim(value) === '';
}

export type IValidatorResponse = {
  isValid: boolean;
  message?: string;
};

export const formValidator = {
  afterDate: function (value: Date, minDate: Date): IValidatorResponse {
    const isValid = isAfterDate(value, minDate);
    return {
      isValid,
      message: isValid
        ? null
        : I18n.insert(I18n.labels.ERRORS.VALIDATION.AFTER_DATE, {
            date: formatDate(minDate, `${DEFAULT_DATE_STRING_FORMAT} ${DEFAULT_TIME_STRING_FORMAT}`),
          }),
    };
  },
  beforeDate: function (value: Date, maxDate: Date): IValidatorResponse {
    const isValid = isBeforeDate(value, maxDate);
    return {
      isValid,
      message: isValid
        ? null
        : I18n.insert(I18n.labels.ERRORS.VALIDATION.BEFORE_DATE, {
            date: formatDate(maxDate, `${DEFAULT_DATE_STRING_FORMAT} ${DEFAULT_TIME_STRING_FORMAT}`),
          }),
    };
  },
  email: function (email: string): IValidatorResponse {
    const isValid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
    return {
      isValid,
      message: isValid ? null : I18n.labels.ERRORS.VALIDATION.INVALID,
    };
  },
  enumValue: function <T>(value: string, enumeration: T): IValidatorResponse {
    const isValid = Object.values(enumeration).includes(value);
    return {
      isValid,
      message: isValid ? null : I18n.labels.ERRORS.VALIDATION.INVALID,
    };
  },
  matchingPasswords: function (newPassword: string, repeatNewPassword: string): IValidatorResponse {
    const isNewPasswordValid = formValidator.password(newPassword).isValid;
    const isRepeatNewPasswordValid = formValidator.password(repeatNewPassword).isValid;

    const isValid = isNewPasswordValid && isRepeatNewPasswordValid && newPassword === repeatNewPassword;
    return {
      isValid,
      message: isValid ? null : I18n.labels.ERRORS.VALIDATION.INVALID_NEW_AND_REPEATED_PASSWORD,
    };
  },
  maxLength: function (value: string, max: number): IValidatorResponse {
    const isValid = `${value}`.length <= max;
    return {
      isValid,
      message: isValid ? null : I18n.insert(I18n.labels.ERRORS.VALIDATION.MAX_LENGTH, { length: max }),
    };
  },
  minLength: function (value: string, min: number): IValidatorResponse {
    const isValid = `${value}`.length >= min;
    return {
      isValid,
      message: isValid ? null : I18n.insert(I18n.labels.ERRORS.VALIDATION.MIN_LENGTH, { length: min }),
    };
  },
  notEmptyArray: function (array: unknown[]): IValidatorResponse {
    const isValid = array?.length > 0;
    return {
      isValid,
      message: isValid ? null : I18n.labels.ERRORS.VALIDATION.EMPTY_ARRAY,
    };
  },
  number: function (value: string): IValidatorResponse {
    const isValid = !Number.isNaN(parseFloat(value));
    return {
      isValid,
      message: isValid ? null : I18n.labels.ERRORS.VALIDATION.NOT_A_NUMBER,
    };
  },
  password: function (password: string): IValidatorResponse {
    // Password requirements: min. 8 characters, at least one uppercase letter, one lowercase letter, and one number.
    const length = 8;
    let isValid = formValidator.minLength(password, length).isValid;
    if (!isValid) {
      return {
        isValid,
        message: I18n.labels.ERRORS.VALIDATION.PASSWORD_TOO_SHORT,
      };
    }
    isValid = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/.test(password);
    return {
      isValid,
      message: isValid ? null : I18n.labels.ERRORS.VALIDATION.PASSWORD_UNSAFE,
    };
  },
  required: function (value: unknown): IValidatorResponse {
    const isValid = !isEmptyString(`${value}`) && !!value;
    return {
      isValid,
      message: isValid ? null : I18n.labels.ERRORS.VALIDATION.REQUIRED,
    };
  },
  url: function (value: string): IValidatorResponse {
    const isValid = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/i.test(
      value,
    );
    return {
      isValid,
      message: isValid ? null : I18n.labels.ERRORS.VALIDATION.INVALID,
    };
  },
};
