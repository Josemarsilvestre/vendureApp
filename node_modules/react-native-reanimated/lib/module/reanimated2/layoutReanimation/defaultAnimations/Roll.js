function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import { ComplexAnimationBuilder } from '../animationBuilder';
export class RollInLeft extends ComplexAnimationBuilder {
  constructor() {
    super(...arguments);
    _defineProperty(this, "build", () => {
      const delayFunction = this.getDelayFunction();
      const [animation, config] = this.getAnimationAndConfig();
      const delay = this.getDelay();
      const callback = this.callbackV;
      const initialValues = this.initialValues;
      return values => {
        'worklet';

        return {
          animations: {
            transform: [{
              translateX: delayFunction(delay, animation(0), config)
            }, {
              rotate: delayFunction(delay, animation('0deg', config))
            }]
          },
          initialValues: {
            transform: [{
              translateX: -values.windowWidth
            }, {
              rotate: '-180deg'
            }],
            ...initialValues
          },
          callback: callback
        };
      };
    });
  }
  static createInstance() {
    return new RollInLeft();
  }
}
export class RollInRight extends ComplexAnimationBuilder {
  constructor() {
    super(...arguments);
    _defineProperty(this, "build", () => {
      const delayFunction = this.getDelayFunction();
      const [animation, config] = this.getAnimationAndConfig();
      const delay = this.getDelay();
      const callback = this.callbackV;
      const initialValues = this.initialValues;
      return values => {
        'worklet';

        return {
          animations: {
            transform: [{
              translateX: delayFunction(delay, animation(0, config))
            }, {
              rotate: delayFunction(delay, animation('0deg', config))
            }]
          },
          initialValues: {
            transform: [{
              translateX: values.windowWidth
            }, {
              rotate: '180deg'
            }],
            ...initialValues
          },
          callback: callback
        };
      };
    });
  }
  static createInstance() {
    return new RollInRight();
  }
}
export class RollOutLeft extends ComplexAnimationBuilder {
  constructor() {
    super(...arguments);
    _defineProperty(this, "build", () => {
      const delayFunction = this.getDelayFunction();
      const [animation, config] = this.getAnimationAndConfig();
      const delay = this.getDelay();
      const callback = this.callbackV;
      const initialValues = this.initialValues;
      return values => {
        'worklet';

        return {
          animations: {
            transform: [{
              translateX: delayFunction(delay, animation(-values.windowWidth, config))
            }, {
              rotate: delayFunction(delay, animation('-180deg', config))
            }]
          },
          initialValues: {
            transform: [{
              translateX: 0
            }, {
              rotate: '0deg'
            }],
            ...initialValues
          },
          callback: callback
        };
      };
    });
  }
  static createInstance() {
    return new RollOutLeft();
  }
}
export class RollOutRight extends ComplexAnimationBuilder {
  constructor() {
    super(...arguments);
    _defineProperty(this, "build", () => {
      const delayFunction = this.getDelayFunction();
      const [animation, config] = this.getAnimationAndConfig();
      const delay = this.getDelay();
      const callback = this.callbackV;
      const initialValues = this.initialValues;
      return values => {
        'worklet';

        return {
          animations: {
            transform: [{
              translateX: delayFunction(delay, animation(values.windowWidth, config))
            }, {
              rotate: delayFunction(delay, animation('180deg', config))
            }]
          },
          initialValues: {
            transform: [{
              translateX: 0
            }, {
              rotate: '0deg'
            }],
            ...initialValues
          },
          callback: callback
        };
      };
    });
  }
  static createInstance() {
    return new RollOutRight();
  }
}
//# sourceMappingURL=Roll.js.map