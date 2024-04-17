function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import { withSequence, withTiming } from '../../animation';
import { ComplexAnimationBuilder } from '../animationBuilder/ComplexAnimationBuilder';
export class BounceIn extends ComplexAnimationBuilder {
  constructor() {
    super(...arguments);
    _defineProperty(this, "build", () => {
      const delayFunction = this.getDelayFunction();
      const delay = this.getDelay();
      const duration = this.getDuration();
      const callback = this.callbackV;
      const initialValues = this.initialValues;
      return () => {
        'worklet';

        return {
          animations: {
            transform: [{
              scale: delayFunction(delay, withSequence(withTiming(1.2, {
                duration: duration * 0.55
              }), withTiming(0.9, {
                duration: duration * 0.15
              }), withTiming(1.1, {
                duration: duration * 0.15
              }), withTiming(1, {
                duration: duration * 0.15
              })))
            }]
          },
          initialValues: {
            transform: [{
              scale: 0
            }],
            ...initialValues
          },
          callback: callback
        };
      };
    });
  }
  static createInstance() {
    return new BounceIn();
  }
  static getDuration() {
    return 600;
  }
  getDuration() {
    return this.durationV ?? 600;
  }
}
export class BounceInDown extends ComplexAnimationBuilder {
  constructor() {
    super(...arguments);
    _defineProperty(this, "build", () => {
      const delayFunction = this.getDelayFunction();
      const delay = this.getDelay();
      const duration = this.getDuration();
      const callback = this.callbackV;
      const initialValues = this.initialValues;
      return values => {
        'worklet';

        return {
          animations: {
            transform: [{
              translateY: delayFunction(delay, withSequence(withTiming(-20, {
                duration: duration * 0.55
              }), withTiming(10, {
                duration: duration * 0.15
              }), withTiming(-10, {
                duration: duration * 0.15
              }), withTiming(0, {
                duration: duration * 0.15
              })))
            }]
          },
          initialValues: {
            transform: [{
              translateY: values.windowHeight
            }],
            ...initialValues
          },
          callback: callback
        };
      };
    });
  }
  static createInstance() {
    return new BounceInDown();
  }
  static getDuration() {
    return 600;
  }
  getDuration() {
    return this.durationV ?? 600;
  }
}
export class BounceInUp extends ComplexAnimationBuilder {
  constructor() {
    super(...arguments);
    _defineProperty(this, "build", () => {
      const delayFunction = this.getDelayFunction();
      const delay = this.getDelay();
      const duration = this.getDuration();
      const callback = this.callbackV;
      const initialValues = this.initialValues;
      return values => {
        'worklet';

        return {
          animations: {
            transform: [{
              translateY: delayFunction(delay, withSequence(withTiming(20, {
                duration: duration * 0.55
              }), withTiming(-10, {
                duration: duration * 0.15
              }), withTiming(10, {
                duration: duration * 0.15
              }), withTiming(0, {
                duration: duration * 0.15
              })))
            }]
          },
          initialValues: {
            transform: [{
              translateY: -values.windowHeight
            }],
            ...initialValues
          },
          callback: callback
        };
      };
    });
  }
  static createInstance() {
    return new BounceInUp();
  }
  static getDuration() {
    return 600;
  }
  getDuration() {
    return this.durationV ?? 600;
  }
}
export class BounceInLeft extends ComplexAnimationBuilder {
  constructor() {
    super(...arguments);
    _defineProperty(this, "build", () => {
      const delayFunction = this.getDelayFunction();
      const delay = this.getDelay();
      const duration = this.getDuration();
      const callback = this.callbackV;
      const initialValues = this.initialValues;
      return values => {
        'worklet';

        return {
          animations: {
            transform: [{
              translateX: delayFunction(delay, withSequence(withTiming(20, {
                duration: duration * 0.55
              }), withTiming(-10, {
                duration: duration * 0.15
              }), withTiming(10, {
                duration: duration * 0.15
              }), withTiming(0, {
                duration: duration * 0.15
              })))
            }]
          },
          initialValues: {
            transform: [{
              translateX: -values.windowWidth
            }],
            ...initialValues
          },
          callback: callback
        };
      };
    });
  }
  static createInstance() {
    return new BounceInLeft();
  }
  static getDuration() {
    return 600;
  }
  getDuration() {
    return this.durationV ?? 600;
  }
}
export class BounceInRight extends ComplexAnimationBuilder {
  constructor() {
    super(...arguments);
    _defineProperty(this, "build", () => {
      const delayFunction = this.getDelayFunction();
      const delay = this.getDelay();
      const duration = this.getDuration();
      const callback = this.callbackV;
      const initialValues = this.initialValues;
      return values => {
        'worklet';

        return {
          animations: {
            transform: [{
              translateX: delayFunction(delay, withSequence(withTiming(-20, {
                duration: duration * 0.55
              }), withTiming(10, {
                duration: duration * 0.15
              }), withTiming(-10, {
                duration: duration * 0.15
              }), withTiming(0, {
                duration: duration * 0.15
              })))
            }]
          },
          initialValues: {
            transform: [{
              translateX: values.windowWidth
            }],
            ...initialValues
          },
          callback: callback
        };
      };
    });
  }
  static createInstance() {
    return new BounceInRight();
  }
  static getDuration() {
    return 600;
  }
  getDuration() {
    return this.durationV ?? 600;
  }
}
export class BounceOut extends ComplexAnimationBuilder {
  constructor() {
    super(...arguments);
    _defineProperty(this, "build", () => {
      const delayFunction = this.getDelayFunction();
      const delay = this.getDelay();
      const duration = this.getDuration();
      const callback = this.callbackV;
      const initialValues = this.initialValues;
      return () => {
        'worklet';

        return {
          animations: {
            transform: [{
              scale: delayFunction(delay, withSequence(withTiming(1.1, {
                duration: duration * 0.15
              }), withTiming(0.9, {
                duration: duration * 0.15
              }), withTiming(1.2, {
                duration: duration * 0.15
              }), withTiming(0, {
                duration: duration * 0.55
              })))
            }]
          },
          initialValues: {
            transform: [{
              scale: 1
            }],
            ...initialValues
          },
          callback: callback
        };
      };
    });
  }
  static createInstance() {
    return new BounceOut();
  }
  static getDuration() {
    return 600;
  }
  getDuration() {
    return this.durationV ?? 600;
  }
}
export class BounceOutDown extends ComplexAnimationBuilder {
  constructor() {
    super(...arguments);
    _defineProperty(this, "build", () => {
      const delayFunction = this.getDelayFunction();
      const delay = this.getDelay();
      const duration = this.getDuration();
      const callback = this.callbackV;
      const initialValues = this.initialValues;
      return values => {
        'worklet';

        return {
          animations: {
            transform: [{
              translateY: delayFunction(delay, withSequence(withTiming(-10, {
                duration: duration * 0.15
              }), withTiming(10, {
                duration: duration * 0.15
              }), withTiming(-20, {
                duration: duration * 0.15
              }), withTiming(values.windowHeight, {
                duration: duration * 0.55
              })))
            }]
          },
          initialValues: {
            transform: [{
              translateY: 0
            }],
            ...initialValues
          },
          callback: callback
        };
      };
    });
  }
  static createInstance() {
    return new BounceOutDown();
  }
  static getDuration() {
    return 600;
  }
  getDuration() {
    return this.durationV ?? 600;
  }
}
export class BounceOutUp extends ComplexAnimationBuilder {
  constructor() {
    super(...arguments);
    _defineProperty(this, "build", () => {
      const delayFunction = this.getDelayFunction();
      const delay = this.getDelay();
      const duration = this.getDuration();
      const callback = this.callbackV;
      const initialValues = this.initialValues;
      return values => {
        'worklet';

        return {
          animations: {
            transform: [{
              translateY: delayFunction(delay, withSequence(withTiming(10, {
                duration: duration * 0.15
              }), withTiming(-10, {
                duration: duration * 0.15
              }), withTiming(20, {
                duration: duration * 0.15
              }), withTiming(-values.windowHeight, {
                duration: duration * 0.55
              })))
            }]
          },
          initialValues: {
            transform: [{
              translateY: 0
            }],
            ...initialValues
          },
          callback: callback
        };
      };
    });
  }
  static createInstance() {
    return new BounceOutUp();
  }
  static getDuration() {
    return 600;
  }
  getDuration() {
    return this.durationV ?? 600;
  }
}
export class BounceOutLeft extends ComplexAnimationBuilder {
  constructor() {
    super(...arguments);
    _defineProperty(this, "build", () => {
      const delayFunction = this.getDelayFunction();
      const delay = this.getDelay();
      const duration = this.getDuration();
      const callback = this.callbackV;
      const initialValues = this.initialValues;
      return values => {
        'worklet';

        return {
          animations: {
            transform: [{
              translateX: delayFunction(delay, withSequence(withTiming(10, {
                duration: duration * 0.15
              }), withTiming(-10, {
                duration: duration * 0.15
              }), withTiming(20, {
                duration: duration * 0.15
              }), withTiming(-values.windowWidth, {
                duration: duration * 0.55
              })))
            }]
          },
          initialValues: {
            transform: [{
              translateX: 0
            }],
            ...initialValues
          },
          callback: callback
        };
      };
    });
  }
  static createInstance() {
    return new BounceOutLeft();
  }
  static getDuration() {
    return 600;
  }
  getDuration() {
    return this.durationV ?? 600;
  }
}
export class BounceOutRight extends ComplexAnimationBuilder {
  constructor() {
    super(...arguments);
    _defineProperty(this, "build", () => {
      const delayFunction = this.getDelayFunction();
      const delay = this.getDelay();
      const duration = this.getDuration();
      const callback = this.callbackV;
      const initialValues = this.initialValues;
      return values => {
        'worklet';

        return {
          animations: {
            transform: [{
              translateX: delayFunction(delay, withSequence(withTiming(-10, {
                duration: duration * 0.15
              }), withTiming(10, {
                duration: duration * 0.15
              }), withTiming(-20, {
                duration: duration * 0.15
              }), withTiming(values.windowWidth, {
                duration: duration * 0.55
              })))
            }]
          },
          initialValues: {
            transform: [{
              translateX: 0
            }],
            ...initialValues
          },
          callback: callback
        };
      };
    });
  }
  static createInstance() {
    return new BounceOutRight();
  }
  static getDuration() {
    return 600;
  }
  getDuration() {
    return this.durationV ?? 600;
  }
}
//# sourceMappingURL=Bounce.js.map