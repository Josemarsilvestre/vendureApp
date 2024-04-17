function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import { ComplexAnimationBuilder } from '../animationBuilder';
export class StretchInX extends ComplexAnimationBuilder {
  constructor() {
    super(...arguments);
    _defineProperty(this, "build", () => {
      const delayFunction = this.getDelayFunction();
      const [animation, config] = this.getAnimationAndConfig();
      const delay = this.getDelay();
      const callback = this.callbackV;
      const initialValues = this.initialValues;
      return () => {
        'worklet';

        return {
          animations: {
            transform: [{
              scaleX: delayFunction(delay, animation(1, config))
            }]
          },
          initialValues: {
            transform: [{
              scaleX: 0
            }],
            ...initialValues
          },
          callback: callback
        };
      };
    });
  }
  static createInstance() {
    return new StretchInX();
  }
}
export class StretchInY extends ComplexAnimationBuilder {
  constructor() {
    super(...arguments);
    _defineProperty(this, "build", () => {
      const delayFunction = this.getDelayFunction();
      const [animation, config] = this.getAnimationAndConfig();
      const delay = this.getDelay();
      const callback = this.callbackV;
      const initialValues = this.initialValues;
      return () => {
        'worklet';

        return {
          animations: {
            transform: [{
              scaleY: delayFunction(delay, animation(1, config))
            }]
          },
          initialValues: {
            transform: [{
              scaleY: 0
            }],
            ...initialValues
          },
          callback: callback
        };
      };
    });
  }
  static createInstance() {
    return new StretchInY();
  }
}
export class StretchOutX extends ComplexAnimationBuilder {
  constructor() {
    super(...arguments);
    _defineProperty(this, "build", () => {
      const delayFunction = this.getDelayFunction();
      const [animation, config] = this.getAnimationAndConfig();
      const delay = this.getDelay();
      const callback = this.callbackV;
      const initialValues = this.initialValues;
      return () => {
        'worklet';

        return {
          animations: {
            transform: [{
              scaleX: delayFunction(delay, animation(0, config))
            }]
          },
          initialValues: {
            transform: [{
              scaleX: 1
            }],
            ...initialValues
          },
          callback: callback
        };
      };
    });
  }
  static createInstance() {
    return new StretchOutX();
  }
}
export class StretchOutY extends ComplexAnimationBuilder {
  constructor() {
    super(...arguments);
    _defineProperty(this, "build", () => {
      const delayFunction = this.getDelayFunction();
      const [animation, config] = this.getAnimationAndConfig();
      const delay = this.getDelay();
      const callback = this.callbackV;
      const initialValues = this.initialValues;
      return () => {
        'worklet';

        return {
          animations: {
            transform: [{
              scaleY: delayFunction(delay, animation(0, config))
            }]
          },
          initialValues: {
            transform: [{
              scaleY: 1
            }],
            ...initialValues
          },
          callback: callback
        };
      };
    });
  }
  static createInstance() {
    return new StretchOutY();
  }
}
//# sourceMappingURL=Stretch.js.map