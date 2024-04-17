import { measure } from './NativeMethods';
/**
 * Given an absolute position and a component ref, returns the relative
 * position in the component's local coordinate space.
 */
export function getRelativeCoords(parentRef, absoluteX, absoluteY) {
  'worklet';

  const parentCoords = measure(parentRef);
  if (parentCoords === null) {
    return null;
  }
  return {
    x: absoluteX - parentCoords.x,
    y: absoluteY - parentCoords.y
  };
}
export function isSharedValue(value) {
  'worklet';

  return (value === null || value === void 0 ? void 0 : value._isReanimatedSharedValue) === true;
}
//# sourceMappingURL=utils.js.map