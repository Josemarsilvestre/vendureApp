import { useEffect, useRef } from 'react';
import FrameCallbackRegistryJS from '../frameCallback/FrameCallbackRegistryJS';
const frameCallbackRegistry = new FrameCallbackRegistryJS();
export function useFrameCallback(callback) {
  let autostart = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  const ref = useRef({
    setActive: isActive => {
      frameCallbackRegistry.manageStateFrameCallback(ref.current.callbackId, isActive);
      ref.current.isActive = isActive;
    },
    isActive: autostart,
    callbackId: -1
  });
  useEffect(() => {
    ref.current.callbackId = frameCallbackRegistry.registerFrameCallback(callback);
    ref.current.setActive(ref.current.isActive);
    return () => {
      frameCallbackRegistry.unregisterFrameCallback(ref.current.callbackId);
      ref.current.callbackId = -1;
    };
  }, [callback, autostart]);
  return ref.current;
}
//# sourceMappingURL=useFrameCallback.js.map