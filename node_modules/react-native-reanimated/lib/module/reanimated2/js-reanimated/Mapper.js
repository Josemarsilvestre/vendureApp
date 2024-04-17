function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import { shouldBeUseWeb } from '../PlatformChecker';
import MutableValue from './MutableValue';
export default class Mapper {
  constructor(module, mapper) {
    let inputs = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    let outputs = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
    _defineProperty(this, "id", void 0);
    _defineProperty(this, "inputs", void 0);
    _defineProperty(this, "outputs", void 0);
    _defineProperty(this, "mapper", void 0);
    _defineProperty(this, "dirty", true);
    this.id = Mapper.MAPPER_ID++;
    this.inputs = this.extractMutablesFromArray(inputs);
    this.outputs = this.extractMutablesFromArray(outputs);
    this.mapper = mapper;
    const markDirty = () => {
      this.dirty = true;
      module.maybeRequestRender();
    };
    this.inputs.forEach(input => {
      input.addListener(markDirty);
    });
  }
  execute() {
    this.dirty = false;
    this.mapper();
  }
  extractMutablesFromArray(array) {
    const res = [];
    function extractMutables(value) {
      if (value == null) {
        // return;
      } else if (value instanceof MutableValue) {
        res.push(value);
      } else if (Array.isArray(value)) {
        value.forEach(v => extractMutables(v));
      } else if (isWebDomElement(value)) {
        // do nothing on dom elements
        // without this check, we get a "Maximum call size exceeded error"
      } else if (typeof value === 'object') {
        Object.keys(value).forEach(key => {
          extractMutables(value[key]);
        });
      }
    }
    extractMutables(array);
    return res;
  }
}
_defineProperty(Mapper, "MAPPER_ID", 1);
function isWebDomElement(value) {
  if (!shouldBeUseWeb()) {
    return false;
  }

  // https://stackoverflow.com/a/384380/7869175
  function isWebNode(o) {
    return typeof Node === 'object' ? o instanceof Node : o && typeof o === 'object' && typeof o.nodeType === 'number' && typeof o.nodeName === 'string';
  }
  function isWebElement(o) {
    return typeof HTMLElement === 'object' ? o instanceof HTMLElement // DOM2
    : o && typeof o === 'object' && o !== null && o.nodeType === 1 && typeof o.nodeName === 'string';
  }
  return isWebNode(value) || isWebElement(value);
}
//# sourceMappingURL=Mapper.js.map