import { useEffect } from 'react';

import useToggle from './useToggle';

interface Response {
  showError: boolean;
  setDirty: () => void;
}

export default function useInputError(error: boolean): Response {
  const [isDirty, setIsDirty] = useToggle(false);

  useEffect(() => setIsDirty(false), [error, setIsDirty]);

  return { showError: error && !isDirty, setDirty: () => setIsDirty(true) };
}
