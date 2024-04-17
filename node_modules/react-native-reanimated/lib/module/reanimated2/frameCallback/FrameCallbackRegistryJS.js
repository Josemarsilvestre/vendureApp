function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import { runOnUI } from '../core';
import { prepareUIRegistry } from './FrameCallbackRegistryUI';
export default class FrameCallbackRegistryJS {
  constructor() {
    _defineProperty(this, "nextCallbackId", 0);
    prepareUIRegistry();
  }
  registerFrameCallback(callback) {
    if (!callback) {
      return -1;
    }
    const callbackId = this.nextCallbackId;
    this.nextCallbackId++;
    runOnUI(() => {
      global._frameCallbackRegistry.registerFrameCallback(callback, callbackId);
    })();
    return callbackId;
  }
  unregisterFrameCallback(callbackId) {
    runOnUI(() => {
      global._frameCallbackRegistry.unregisterFrameCallback(callbackId);
    })();
  }
  manageStateFrameCallback(callbackId, state) {
    runOnUI(() => {
      global._frameCallbackRegistry.manageStateFrameCallback(callbackId, state);
    })();
  }
}
//# sourceMappingURL=FrameCallbackRegistryJS.js.map