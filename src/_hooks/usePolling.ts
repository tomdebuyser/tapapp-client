import { useEffect } from 'react';

const usePolling = (interval: number, callback: () => void): void => {
  useEffect(() => {
    const polling = setInterval(callback, interval);
    return () => clearInterval(polling);
  });
};

export default usePolling;
