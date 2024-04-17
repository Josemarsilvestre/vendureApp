function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import { withDelay } from '../../animation';
export class BaseAnimationBuilder {
  constructor() {
    _defineProperty(this, "durationV", void 0);
    _defineProperty(this, "delayV", void 0);
    _defineProperty(this, "randomizeDelay", false);
    _defineProperty(this, "callbackV", void 0);
    _defineProperty(this, "build", () => {
      throw Error('Unimplemented method in child class.');
    });
  }
  static duration(durationMs) {
    const instance = this.createInstance();
    return instance.duration(durationMs);
  }
  duration(durationMs) {
    this.durationV = durationMs;
    return this;
  }
  static delay(delayMs) {
    const instance = this.createInstance();
    return instance.delay(delayMs);
  }
  delay(delayMs) {
    this.delayV = delayMs;
    return this;
  }
  static withCallback(callback) {
    const instance = this.createInstance();
    return instance.withCallback(callback);
  }
  withCallback(callback) {
    this.callbackV = callback;
    return this;
  }

  // 300ms is the default animation duration. If any animation has different default has to override this method.
  static getDuration() {
    return 300;
  }
  getDuration() {
    return this.durationV ?? 300;
  }
  static randomDelay() {
    const instance = this.createInstance();
    return instance.randomDelay();
  }
  randomDelay() {
    this.randomizeDelay = true;
    return this;
  }

  // when randomizeDelay is set to true, randomize delay between 0 and provided value (or 1000ms if delay is not provided)
  getDelay() {
    return this.randomizeDelay ? Math.random() * (this.delayV ?? 1000) : this.delayV ?? 0;
  }
  getDelayFunction() {
    const isDelayProvided = this.randomizeDelay || this.delayV;
    return isDelayProvided ? withDelay : (_, animation) => {
      'worklet';

      return animation;
    };
  }
  static build() {
    const instance = this.createInstance();
    return instance.build();
  }
}
_defineProperty(BaseAnimationBuilder, "createInstance", void 0);
//# sourceMappingURL=BaseAnimationBuilder.js.map