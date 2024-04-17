/* eslint-disable camelcase */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const findHostInstance_DEPRECATED = _ref => null;
export function getShadowNodeWrapperFromHostInstance(hostInstance) {
  // @ts-ignore Fabric
  return hostInstance._internalInstanceHandle.stateNode.node;
}
export function getShadowNodeWrapperFromRef(ref) {
  return getShadowNodeWrapperFromHostInstance(findHostInstance_DEPRECATED(ref));
}
//# sourceMappingURL=fabricUtils.web.js.map