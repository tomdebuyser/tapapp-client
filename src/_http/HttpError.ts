/* eslint-disable @typescript-eslint/no-explicit-any */
import { translations } from '../_translations';
import { HttpStatus } from './HttpStatus';

export interface ApiError {
  error?: string;
  message?: string;
  statusCode: HttpStatus;
  validationErrors?: Record<string, ValidationError>;
}

export interface ValidationError {
  constraints: Record<string, any>;
  target?: Record<string, any>;
  value?: any;
}

export function getValidationError(error: ApiError, property: string): ValidationError {
  if (!error || !error.validationErrors) return null;
  return error.validationErrors[property];
}

export function getValidationErrorMessage(error: ApiError, labelMapper?: (name: string) => string): string {
  return translations.getLabel('FORM_ERROR', {
    fields: Object.keys(error.validationErrors)
      .map((name: string) => (labelMapper ? labelMapper(name) : name))
      .join(', '),
  });
}