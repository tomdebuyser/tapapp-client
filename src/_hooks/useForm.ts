import { useState, useEffect } from 'react';
import { ApiError, ValidationError } from '../_http';
import { translations } from '../_translations';
import { deepCopy, isEmptyObject } from '../_utils/objectHelpers';
import { IValidatorResponse } from '../_utils/formValidation';
import useToggle from './useToggle';

/**
 * FormValidationErrors type explanation:
 * 1. We check to see if the value of property Key is a primitive, if it is, we just require a validator response (IValidatorResponse).
 * 2. We check if the value of property Key is an array, if it is, we proceed to 3, else to 5
 * 3. We check if the Type of the element of the array, using infer, is a Primitive.
 *    If the value is not a Primitive, proceed to 4, otherwise, we just require a list of validator responses (IValidatorResponse[]).
 * 4. If the Array is not a primitive, we use the type we extracted with infer and require an array of FormValidationErrors<InferredArrayType>.
 * 5. If the array is not a primitive, and not an array, it's an object, so we just recursively use FormValidationErrors with the given type.
 */
type Primitive = string | number | boolean;
export type FormValidationErrors<TForm = Record<string, unknown>> = {
  [Key in keyof TForm]?: TForm[Key] extends Primitive // 1.
    ? IValidatorResponse
    : TForm[Key] extends Array<infer TArray> // 2.
    ? TArray extends Primitive // 3.
      ? IValidatorResponse[]
      : Array<FormValidationErrors<TArray>> // 4
    : FormValidationErrors<TForm[Key]>; // 5
};

export type SubmitFormFunction<TForm> = (values: TForm, setFormValues: (values: TForm) => void) => void;
type ValidateFormFunction<TForm, TFormErrors> = (values: TForm) => FormValidationErrors<TFormErrors>;

interface Params<TForm, TFormErrors> {
  error?: ApiError;
  initialForm: TForm;
  submitForm: SubmitFormFunction<TForm>;
  validateForm: ValidateFormFunction<TForm, TFormErrors>;
}

interface Response<TForm, TFormErrors> {
  hasValidationErrors: boolean;
  isDirty: boolean;
  setAttribute: (value: unknown, name: string) => void;
  setValues: (setter: (values: TForm) => void) => void;
  submit: (event: React.FormEvent) => void;
  submitWithParams: (event: React.FormEvent, params: Partial<Params<TForm, TFormErrors>>) => void;
  validationErrors: FormValidationErrors<TFormErrors>;
  values: TForm;
}

export type IFormHook<TForm, TFormErrors = TForm> = Response<TForm, TFormErrors>;

function mapToFormValidationErrors<TForm>(error: ApiError): FormValidationErrors<TForm> {
  const mapError = (validationError: ValidationError) => {
    if (validationError.children.length > 0) {
      return validationError.children.reduce((acc, child) => ({ ...acc, [child.property]: { ...mapError(child) } }), {});
    }
    let message = translations.getLabel('ERRORS.VALIDATION.INVALID');
    if (validationError.constraints?.isNotEmpty) message = translations.getLabel('ERRORS.VALIDATION.REQUIRED');
    return { isValid: false, message };
  };
  return Object.keys(error.validationErrors).reduce((acc, key) => {
    return { ...acc, [key]: { ...mapError(error.validationErrors[key]) } };
  }, {});
}

function isValidatorResponse(object: unknown): object is IValidatorResponse {
  return Object.keys(object).includes('isValid');
}

export function hasValidationErrors(errors: FormValidationErrors): boolean {
  if (isEmptyObject(errors)) return false;
  if (Array.isArray(errors)) return errors.some(hasValidationErrors);
  if (typeof errors === 'object') {
    if (isValidatorResponse(errors)) return !errors.isValid;
    return Object.keys(errors).some(key => hasValidationErrors(errors[key]));
  }
  return false;
}

function useForm<TForm, TFormErrors = TForm>(params: Params<TForm, TFormErrors>): Response<TForm, TFormErrors> {
  const { error, initialForm, submitForm, validateForm } = params;
  const [values, setFormValues] = useState<TForm>(initialForm);
  const [validationErrors, setValidationErrors] = useState<FormValidationErrors<TFormErrors>>({});
  const [isDirty, setIsDirty] = useToggle(false);

  const submit = (
    event: React.FormEvent,
    sumbitFunction: SubmitFormFunction<TForm> = submitForm,
    validateFunction: ValidateFormFunction<TForm, TFormErrors> = validateForm,
  ): void => {
    event.preventDefault();
    const errors = validateFunction(values);
    if (!hasValidationErrors(errors)) {
      sumbitFunction(values, setFormValues);
      setIsDirty(false);
    }
    setValidationErrors(errors);
  };

  /**
   * In some cases, you want to use a different submit / validate function than the default one.
   */
  const submitWithParams = (event: React.FormEvent, params: Partial<Params<TForm, TFormErrors>>): void =>
    submit(event, params.submitForm, params.validateForm);

  /**
   * Use this function if the (simple) name of the field matches the name within the form.
   * Do not use it when the field is an array or (part of) a nested object. Use 'setValues' instead.
   *
   * The name of the input field should be equal to the simple property name within the form.
   * E.g. By using this function with '<Input name='title' />', the new value will be set on 'values.title'.
   */
  const setAttribute = (value: unknown, name: string) => {
    setFormValues({ ...values, [name]: value });
    setIsDirty(true);
  };

  /**
   * Use this function if you cannot change the value with 'setAttribute' because it is (part of) a nested object or an array.
   * If it is a simple value, we recommend to use 'setAttribute' for performance reasons.
   *
   * The name of the input field is not used to set any value here, as the value is set directly in the values
   */
  const setValues = (setter: (values: TForm) => void) => {
    const newValues = deepCopy(values);
    setter(newValues);
    setFormValues(newValues);
    setIsDirty(true);
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
    setIsDirty(false);
    // Clear all if the component unmounts
    return () => {
      clearValues();
      setValidationErrors({});
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    hasValidationErrors: hasValidationErrors(validationErrors),
    isDirty,
    setAttribute,
    setValues,
    submit,
    submitWithParams,
    validationErrors,
    values,
  };
}

export default useForm;
