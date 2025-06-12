import { useEffect, useState } from 'react';

const LOADER_DELAY = 2000;

export const useDelayedLoader = (isLoading: boolean) => {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (!isLoading) {
      timeout = setTimeout(() => setShowLoader(false), LOADER_DELAY);
    } else {
      setShowLoader(true);
    }

    return () => clearTimeout(timeout);
  }, [isLoading]);

  return showLoader;
};
