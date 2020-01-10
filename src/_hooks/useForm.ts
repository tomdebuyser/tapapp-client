import { useState, useEffect, useCallback } from 'react';
import { ApiError } from '../_http';

function useForm<T>(initial: T, shouldClear?: boolean) {
  const [form, setForm] = useState<T>(initial);
  const [error, setError] = useState<ApiError>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function setFormAttribute(value: any, name: string) {
    setForm({ ...form, [name]: value });
  }
  const clearForm = useCallback(() => {
    setForm(initial);
  }, [initial]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  useEffect(() => {
    return () => {
      clearForm();
      clearError();
    };
  }, [shouldClear, clearForm, clearError]);

  return {
    form,
    setForm,
    setFormAttribute,
    error,
    setError,
    clearForm,
  };
}

export default useForm;
