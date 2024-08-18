import { useEffect, useState } from 'react';

export function useSubscribe<G>(
  subscribeFunction: (callback: (arg: G) => void) => UnsubscribeFunction
): G | undefined {
  const [value, setValue] = useState<G>();

  useEffect(() => {
    return subscribeFunction(setValue);
  }, []);

  return value;
}
