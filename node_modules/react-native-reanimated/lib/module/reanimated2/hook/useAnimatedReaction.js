import { useEffect, useRef } from 'react';
import { startMapper, stopMapper } from '../core';
import { shouldBeUseWeb } from '../PlatformChecker';
/**
 * @param prepare - worklet used for data preparation for the second parameter
 * @param react - worklet which takes data prepared by the one in the first parameter and performs certain actions
 * the first worklet defines the inputs, in other words on which shared values change will it be called.
 * the second one can modify any shared values but those which are mentioned in the first worklet. Beware of that, because this may result in endless loop and high cpu usage.
 */
export function useAnimatedReaction(prepare, react, dependencies) {
  const previous = useRef({
    value: null
  }).current;
  let inputs = Object.values(prepare._closure ?? {});
  if (shouldBeUseWeb()) {
    var _dependencies;
    if (!inputs.length && (_dependencies = dependencies) !== null && _dependencies !== void 0 && _dependencies.length) {
      // let web work without a Babel/SWC plugin
      inputs = dependencies;
    }
  }
  if (dependencies === undefined) {
    dependencies = [...Object.values(prepare._closure ?? {}), ...Object.values(react._closure ?? {}), prepare.__workletHash, react.__workletHash];
  } else {
    dependencies.push(prepare.__workletHash, react.__workletHash);
  }
  useEffect(() => {
    const fun = () => {
      'worklet';

      const input = prepare();
      react(input, previous.value);
      previous.value = input;
    };
    const mapperId = startMapper(fun, inputs, []);
    return () => {
      stopMapper(mapperId);
    };
  }, dependencies);
}
//# sourceMappingURL=useAnimatedReaction.js.map