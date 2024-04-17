function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
export default class MutableValue {
  constructor(value, setter) {
    _defineProperty(this, "_id", void 0);
    _defineProperty(this, "_value", void 0);
    _defineProperty(this, "_setter", void 0);
    _defineProperty(this, "_animation", null);
    _defineProperty(this, "_listeners", []);
    this._id = MutableValue.MUTABLE_ID++;
    this._value = value;
    this._setter = setter;
  }
  get value() {
    return this._value;
  }
  set value(nextValue) {
    this._setter(nextValue);
  }

  // this changes the value finally and is supposed to be called from this._setter
  _setValue(newValue) {
    this._value = newValue;
    this._triggerListener();
  }
  addListener(listener) {
    this._listeners.push(listener);
  }
  _triggerListener() {
    for (let i = 0, len = this._listeners.length; i < len; ++i) {
      this._listeners[i]();
    }
  }
}
_defineProperty(MutableValue, "MUTABLE_ID", 1);
//# sourceMappingURL=MutableValue.js.map