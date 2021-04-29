import { HttpStatus } from './HttpStatus';

export type ValidationError = {
  children: Array<ValidationError & { property: string }>;
  constraints: Record<string, unknown>;
  target?: Record<string, unknown>;
  value?: unknown;
};

export type ApiError = {
  error?: string;
  message?: string;
  statusCode: HttpStatus;
  validationErrors?: Record<string, ValidationError>;
};

export function getValidationError(error: ApiError, property: string): ValidationError {
  if (!error || !error.validationErrors) return null;
  return error.validationErrors[property];
}
