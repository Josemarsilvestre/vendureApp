import { useEffect, useRef } from 'react';
import { initialUpdaterRun } from '../animation';
import { makeMutable, startMapper, stopMapper } from '../core';
import { shouldBeUseWeb } from '../PlatformChecker';
export function useDerivedValue(processor, dependencies) {
  const initRef = useRef(null);
  let inputs = Object.values(processor._closure ?? {});
  if (shouldBeUseWeb()) {
    var _dependencies;
    if (!inputs.length && (_dependencies = dependencies) !== null && _dependencies !== void 0 && _dependencies.length) {
      // let web work without a Babel/SWC plugin
      inputs = dependencies;
    }
  }

  // build dependencies
  if (dependencies === undefined) {
    dependencies = [...inputs, processor.__workletHash];
  } else {
    dependencies.push(processor.__workletHash);
  }
  if (initRef.current === null) {
    initRef.current = makeMutable(initialUpdaterRun(processor));
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const sharedValue = initRef.current;
  useEffect(() => {
    const fun = () => {
      'worklet';

      sharedValue.value = processor();
    };
    const mapperId = startMapper(fun, inputs, [sharedValue]);
    return () => {
      stopMapper(mapperId);
    };
  }, dependencies);
  useEffect(() => {
    return () => {
      initRef.current = null;
    };
  }, []);
  return sharedValue;
}
//# sourceMappingURL=useDerivedValue.js.map