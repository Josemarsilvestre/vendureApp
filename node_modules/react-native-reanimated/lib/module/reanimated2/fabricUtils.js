/* eslint-disable camelcase */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let findHostInstance_DEPRECATED = _ref => null;
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  findHostInstance_DEPRECATED = require('react-native/Libraries/Renderer/shims/ReactFabric').findHostInstance_DEPRECATED;
} catch (e) {
  // do nothing
}
export function getShadowNodeWrapperFromHostInstance(hostInstance) {
  // @ts-ignore Fabric
  return hostInstance._internalInstanceHandle.stateNode.node;
}
export function getShadowNodeWrapperFromRef(ref) {
  return getShadowNodeWrapperFromHostInstance(findHostInstance_DEPRECATED(ref));
}
//# sourceMappingURL=fabricUtils.js.map