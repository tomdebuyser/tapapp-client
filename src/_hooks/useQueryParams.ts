import { useLocation } from 'react-router-dom';

function useQueryParams<T extends Record<string, string>>(): T {
  const query = new URLSearchParams(useLocation().search);
  return Array.from(query.keys()).reduce((acc: T, key) => ({ ...acc, [key]: query.get(key) }), {} as T);
}

export default useQueryParams;
