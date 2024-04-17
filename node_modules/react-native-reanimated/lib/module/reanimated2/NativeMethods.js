/* global _WORKLET _measure _scrollTo _dispatchCommand _setGestureState */

import { findNodeHandle } from 'react-native';
import { isChromeDebugger, isWeb, shouldBeUseWeb } from './PlatformChecker';
export function getTag(view) {
  return findNodeHandle(view);
}
const isNative = !shouldBeUseWeb();
export let measure;
if (isWeb()) {
  measure = animatedRef => {
    const element = animatedRef(); // TODO: fix typing of animated refs on web
    const viewportOffset = element.getBoundingClientRect();
    return {
      width: element.offsetWidth,
      height: element.offsetHeight,
      x: element.offsetLeft,
      y: element.offsetTop,
      pageX: viewportOffset.left,
      pageY: viewportOffset.top
    };
  };
} else if (isChromeDebugger()) {
  measure = _animatedRef => {
    console.warn('[Reanimated] measure() cannot be used with Chrome Debugger.');
    return null;
  };
} else {
  measure = animatedRef => {
    'worklet';

    if (!_WORKLET) {
      return null;
    }
    const viewTag = animatedRef();
    if (viewTag === -1) {
      console.warn(`[Reanimated] The view with tag ${viewTag} is not a valid argument for measure(). This may be because the view is not currently rendered, which may not be a bug (e.g. an off-screen FlatList item).`);
      return null;
    }
    const measured = _measure(viewTag);
    if (measured === null) {
      console.warn(`[Reanimated] The view with tag ${viewTag} has some undefined, not-yet-computed or meaningless value of \`LayoutMetrics\` type. This may be because the view is not currently rendered, which may not be a bug (e.g. an off-screen FlatList item).`);
      return null;
    } else if (measured.x === -1234567) {
      console.warn(`[Reanimated] The view with tag ${viewTag} returned an invalid measurement response.`);
      return null;
    } else if (isNaN(measured.x)) {
      console.warn(`[Reanimated] The view with tag ${viewTag} gets view-flattened on Android. To disable view-flattening, set \`collapsable={false}\` on this component.`);
      return null;
    } else {
      return measured;
    }
  };
}
export function dispatchCommand(animatedRef, commandName, args) {
  'worklet';

  if (!_WORKLET || !isNative) {
    return;
  }

  // dispatchCommand works only on Fabric where animatedRef returns
  // an object (ShadowNodeWrapper) and not a number
  const shadowNodeWrapper = animatedRef();
  _dispatchCommand(shadowNodeWrapper, commandName, args);
}
export let scrollTo;
if (isWeb()) {
  scrollTo = (animatedRef, x, y, animated) => {
    'worklet';

    const element = animatedRef();
    // @ts-ignore same call as in react-native-web
    element.scrollTo({
      x,
      y,
      animated
    });
  };
} else if (isNative && global._IS_FABRIC) {
  scrollTo = (animatedRef, x, y, animated) => {
    'worklet';

    dispatchCommand(animatedRef, 'scrollTo', [x, y, animated]);
  };
} else if (isNative) {
  scrollTo = (animatedRef, x, y, animated) => {
    'worklet';

    if (!_WORKLET) {
      return;
    }

    // Calling animatedRef on Paper returns a number (nativeTag)
    const viewTag = animatedRef();
    _scrollTo(viewTag, x, y, animated);
  };
} else {
  scrollTo = (_animatedRef, _x, _y) => {
    // no-op
  };
}
export function setGestureState(handlerTag, newState) {
  'worklet';

  if (!_WORKLET || !isNative) {
    console.warn('[Reanimated] You can not use setGestureState in non-worklet function.');
    return;
  }
  _setGestureState(handlerTag, newState);
}
//# sourceMappingURL=NativeMethods.js.map