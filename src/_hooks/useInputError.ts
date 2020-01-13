import { useEffect } from 'react';

import useToggle from './useToggle';

interface Response {
  setDirty: () => void;
  showError: boolean;
}

export default function useInputError(error: boolean): Response {
  const [isDirty, setIsDirty] = useToggle(false);

  useEffect(() => setIsDirty(false), [error, setIsDirty]);

  return { showError: error && !isDirty, setDirty: () => setIsDirty(true) };
}
