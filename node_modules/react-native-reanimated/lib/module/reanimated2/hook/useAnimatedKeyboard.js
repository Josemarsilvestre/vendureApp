import { useEffect, useRef } from 'react';
import { makeMutable, subscribeForKeyboardEvents, unsubscribeFromKeyboardEvents } from '../core';
import { KeyboardState } from '../commonTypes';
export function useAnimatedKeyboard() {
  let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    isStatusBarTranslucentAndroid: false
  };
  const ref = useRef(null);
  const listenerId = useRef(-1);
  const isSubscribed = useRef(false);
  if (ref.current === null) {
    const keyboardEventData = {
      state: makeMutable(KeyboardState.UNKNOWN),
      height: makeMutable(0)
    };
    listenerId.current = subscribeForKeyboardEvents((state, height) => {
      'worklet';

      keyboardEventData.state.value = state;
      keyboardEventData.height.value = height;
    }, options);
    ref.current = keyboardEventData;
    isSubscribed.current = true;
  }
  useEffect(() => {
    if (isSubscribed.current === false && ref.current !== null) {
      const keyboardEventData = ref.current;
      // subscribe again after Fast Refresh
      listenerId.current = subscribeForKeyboardEvents((state, height) => {
        'worklet';

        keyboardEventData.state.value = state;
        keyboardEventData.height.value = height;
      }, options);
      isSubscribed.current = true;
    }
    return () => {
      unsubscribeFromKeyboardEvents(listenerId.current);
      isSubscribed.current = false;
    };
  }, []);
  return ref.current;
}
//# sourceMappingURL=useAnimatedKeyboard.js.map