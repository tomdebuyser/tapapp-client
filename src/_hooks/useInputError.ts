import { useEffect } from 'react';
import { IValidatorResponse } from '../_utils/formValidation';
import useToggle from './useToggle';

type Response = {
  setDirty: () => void;
  showError: boolean;
};

export default function useInputError(validation?: IValidatorResponse): Response {
  const [isDirty, setIsDirty] = useToggle(false);

  useEffect(() => {
    setIsDirty(false);
  }, [validation, setIsDirty]);

  return {
    setDirty: () => setIsDirty(true),
    showError: !validation?.isValid && validation?.message && !isDirty,
  };
}
