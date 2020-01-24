import { useState, useEffect, useCallback } from 'react';
import { ApiError } from '../_http';
import { translations } from '../_translations';

export type FormValidationErrors<T> = {
  [K in keyof T]?: string;
};

interface Params<T> {
  error?: ApiError;
  initialForm: T;
  submitForm: (values: T) => void;
  validateForm: (values: T) => FormValidationErrors<T>;
}

interface Response<T> {
  setAttribute: (value: unknown, name: string) => void;
  submit: (event: React.FormEvent) => void;
  validationErrors: FormValidationErrors<T>;
  values: T;
}

function mapToFormValidationErrors<T>(error: ApiError): FormValidationErrors<T> {
  return Object.keys(error.validationErrors).reduce((acc, key) => {
    let message = translations.getLabel('ERRORS.VALIDATION.INVALID');
    if (error.validationErrors[key].constraints?.isNotEmpty) message = translations.getLabel('ERRORS.VALIDATION.REQUIRED');
    return { ...acc, [key]: message };
  }, {});
}

function useForm<T>(params: Params<T>): Response<T> {
  const { error, initialForm, submitForm, validateForm } = params;
  const [values, setValues] = useState<T>(initialForm);
  const [validationErrors, setValidationErrors] = useState<FormValidationErrors<T>>({});

  const submit = (event: React.FormEvent): void => {
    event.preventDefault();
    const errors = validateForm(values);
    const hasError = Object.keys(errors || {}).some(key => !!errors[key]);
    if (!hasError) {
      submitForm(values);
    }
    setValidationErrors(errors);
  };

  const setAttribute = useCallback(
    (value: unknown, name: string) => {
      setValues({ ...values, [name]: value });
    },
    [values],
  );

  // Map server errors to form validation errors
  useEffect(() => {
    if (error?.validationErrors) {
      setValidationErrors(mapToFormValidationErrors(error));
    }
  }, [error]);

  const clearValues = useCallback(() => {
    setValues(initialForm);
  }, [initialForm]);

  useEffect(() => {
    // Clear all if the component unmounts
    return () => {
      clearValues();
      setValidationErrors({});
    };
  }, [clearValues]);

  useEffect(() => setValues(initialForm), [initialForm]);

  return {
    values,
    setAttribute,
    submit,
    validationErrors,
  };
}

export default useForm;
