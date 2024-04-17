import { useEffect, useRef } from 'react';
import { findNodeHandle } from 'react-native';
import { useEvent } from './utils';
import { useSharedValue } from './useSharedValue';
const scrollEventNames = ['onScroll', 'onScrollBeginDrag', 'onScrollEndDrag', 'onMomentumScrollBegin', 'onMomentumScrollEnd'];
export function useScrollViewOffset(aref, initialRef) {
  const offsetRef = useRef(initialRef !== undefined ? initialRef : useSharedValue(0));
  const event = useEvent(event => {
    'worklet';

    offsetRef.current.value = event.contentOffset.x === 0 ? event.contentOffset.y : event.contentOffset.x;
  }, scrollEventNames);
  useEffect(() => {
    var _event$current;
    const viewTag = findNodeHandle(aref.current);
    (_event$current = event.current) === null || _event$current === void 0 ? void 0 : _event$current.registerForEvents(viewTag);
  }, [aref.current]);
  return offsetRef.current;
}
//# sourceMappingURL=useScrollViewOffset.js.map