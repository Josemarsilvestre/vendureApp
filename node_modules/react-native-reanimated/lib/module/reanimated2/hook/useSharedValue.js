import { useEffect, useRef } from 'react';
import { cancelAnimation } from '../animation';
import { makeMutable } from '../core';
export function useSharedValue(init) {
  let oneWayReadsOnly = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  const ref = useRef(makeMutable(init, oneWayReadsOnly));
  if (ref.current === null) {
    ref.current = makeMutable(init, oneWayReadsOnly);
  }
  useEffect(() => {
    return () => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      cancelAnimation(ref.current);
    };
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return ref.current;
}
//# sourceMappingURL=useSharedValue.js.map