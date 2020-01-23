import { useState, useEffect, useCallback } from 'react';

export type FormValidationErrors<T> = {
  [K in keyof T]?: string;
};

interface Params<T> {
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

function useForm<T>(params: Params<T>): { Form: Response<T> } {
  const { initialForm, submitForm, validateForm } = params;
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
    Form: {
      values,
      setAttribute,
      submit,
      validationErrors,
    },
  };
}

export default useForm;
