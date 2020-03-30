import { useState, useEffect } from 'react';
import { ApiError } from '../_http';
import { translations } from '../_translations';
import { deepCopy, isEmptyObject } from '../_utils/objectHelpers';

/**
 * FormValidationErrors type explanation:
 * 1. We check to see if the value of property Key is a primitive, if it is, we just require an error message (string).
 * 2. We check if the value of property Key is an array, if it is, we proceed to 3, else to 5
 * 3. We check if the Type of the element of the array, using infer, is a Primitive.
 *    If the value is not a Primitive, proceed to 4, otherwise, we just require a list of error messages (string[]).
 * 4. If the Array is not a primitive, we use the type we extracted with infer and require an array of FormValidationErrors<InferredArrayType>.
 * 5. If the array is not a primitive, and not an array, it's an object, so we just recursively use FormValidationErrors with the given type.
 */
type Primitive = string | number | boolean;
export type FormValidationErrors<TForm = Record<string, unknown>> = {
  [Key in keyof TForm]?: TForm[Key] extends Primitive // 1.
    ? string
    : TForm[Key] extends Array<infer TArray> // 2.
    ? TArray extends Primitive // 3.
      ? string[]
      : Array<FormValidationErrors<TArray>> // 4
    : FormValidationErrors<TForm[Key]>; // 5
};

export type SubmitFormFunction<TForm> = (values: TForm, setFormValues: (values: TForm) => void) => void;

interface Params<TForm, TFormErrors> {
  error?: ApiError;
  initialForm: TForm;
  submitForm: SubmitFormFunction<TForm>;
  validateForm: (values: TForm) => FormValidationErrors<TFormErrors>;
}

interface Response<TForm, TFormErrors> {
  setSimpleAttribute: (value: unknown, name: string) => void;
  setValues: (setter: (values: TForm) => void) => void;
  submit: (event: React.FormEvent) => void;
  validationErrors: FormValidationErrors<TFormErrors>;
  values: TForm;
}

function mapToFormValidationErrors<TForm>(error: ApiError): FormValidationErrors<TForm> {
  return Object.keys(error.validationErrors).reduce((acc, key) => {
    let message = translations.getLabel('ERRORS.VALIDATION.INVALID');
    if (error.validationErrors[key].constraints?.isNotEmpty) message = translations.getLabel('ERRORS.VALIDATION.REQUIRED');
    return { ...acc, [key]: message };
  }, {});
}

function useForm<TForm, TFormErrors = TForm>(params: Params<TForm, TFormErrors>): Response<TForm, TFormErrors> {
  const { error, initialForm, submitForm, validateForm } = params;
  const [values, setFormValues] = useState<TForm>(initialForm);
  const [validationErrors, setValidationErrors] = useState<FormValidationErrors<TFormErrors>>({});

  const submit = (event: React.FormEvent): void => {
    event.preventDefault();
    const errors = validateForm(values);
    const hasError = !isEmptyObject(errors);
    if (!hasError) {
      submitForm(values, setFormValues);
    }
    setValidationErrors(errors);
  };

  /**
   * Use this function if the (simple) name of the field matches the name within the form.
   * Do not use it when the field is an array or (part of) a nested object. Use 'setValues' instead.
   */
  const setSimpleAttribute = (value: unknown, name: string) => setFormValues({ ...values, [name]: value });

  /**
   * Use this function if you cannot change the value with 'setSimpleAttribute' because it is (part of) a nested object or an array.
   * If it is a simple value, we recommend to use 'setSimpleAttribute' for performance reasons.
   */
  const setValues = (setter: (values: TForm) => void) => {
    const newValues = deepCopy(values) as TForm;
    setter(newValues);
    setFormValues(newValues);
  };

  const clearValues = () => setFormValues(initialForm);

  // Map server errors to form validation errors
  useEffect(() => {
    if (error?.validationErrors) {
      setValidationErrors(mapToFormValidationErrors(error));
    }
  }, [error]);

  useEffect(() => {
    setFormValues(initialForm);
    // Clear all if the component unmounts
    return () => {
      clearValues();
      setValidationErrors({});
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    setSimpleAttribute,
    setValues,
    submit,
    validationErrors,
    values,
  };
}

export default useForm;
