import { useRef } from 'react';
import { useSharedValue } from './useSharedValue';
import { getTag } from '../NativeMethods';
import { getShadowNodeWrapperFromHostInstance } from '../fabricUtils';
import { makeShareableCloneRecursive, registerShareableMapping } from '../shareables';
function getShareableShadowNodeFromComponent(component) {
  return getShadowNodeWrapperFromHostInstance(component);
}
function getComponentOrScrollableRef(component) {
  if (global._IS_FABRIC && component.getNativeScrollRef) {
    return component.getNativeScrollRef();
  } else if (!global._IS_FABRIC && component.getScrollableNode) {
    return component.getScrollableNode();
  }
  return component;
}
const getTagValueFunction = global._IS_FABRIC ? getShareableShadowNodeFromComponent : getTag;
export function useAnimatedRef() {
  const tag = useSharedValue(-1);
  const ref = useRef();
  if (!ref.current) {
    const fun = component => {
      // enters when ref is set by attaching to a component
      if (component) {
        tag.value = getTagValueFunction(getComponentOrScrollableRef(component));
        fun.current = component;
      }
      return tag.value;
    };
    fun.current = null;
    const remoteRef = makeShareableCloneRecursive({
      __init: () => {
        'worklet';

        return () => tag.value;
      }
    });
    registerShareableMapping(fun, remoteRef);
    ref.current = fun;
  }
  return ref.current;
}
//# sourceMappingURL=useAnimatedRef.js.map