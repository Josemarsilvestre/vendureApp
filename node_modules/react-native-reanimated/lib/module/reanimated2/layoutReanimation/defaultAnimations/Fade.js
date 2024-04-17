function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import { ComplexAnimationBuilder } from '../animationBuilder';
export class FadeIn extends ComplexAnimationBuilder {
  constructor() {
    super(...arguments);
    _defineProperty(this, "build", () => {
      const delayFunction = this.getDelayFunction();
      const [animation, config] = this.getAnimationAndConfig();
      const callback = this.callbackV;
      const initialValues = this.initialValues;
      const delay = this.getDelay();
      return _ => {
        'worklet';

        return {
          animations: {
            opacity: delayFunction(delay, animation(1, config))
          },
          initialValues: {
            opacity: 0,
            ...initialValues
          },
          callback: callback
        };
      };
    });
  }
  static createInstance() {
    return new FadeIn();
  }
}
export class FadeInRight extends ComplexAnimationBuilder {
  constructor() {
    super(...arguments);
    _defineProperty(this, "build", () => {
      const delayFunction = this.getDelayFunction();
      const [animation, config] = this.getAnimationAndConfig();
      const callback = this.callbackV;
      const initialValues = this.initialValues;
      const delay = this.getDelay();
      return () => {
        'worklet';

        return {
          animations: {
            opacity: delayFunction(delay, animation(1, config)),
            transform: [{
              translateX: delayFunction(delay, animation(0, config))
            }]
          },
          initialValues: {
            opacity: 0,
            transform: [{
              translateX: 25
            }],
            ...initialValues
          },
          callback: callback
        };
      };
    });
  }
  static createInstance() {
    return new FadeInRight();
  }
}
export class FadeInLeft extends ComplexAnimationBuilder {
  constructor() {
    super(...arguments);
    _defineProperty(this, "build", () => {
      const delayFunction = this.getDelayFunction();
      const [animation, config] = this.getAnimationAndConfig();
      const callback = this.callbackV;
      const initialValues = this.initialValues;
      const delay = this.getDelay();
      return () => {
        'worklet';

        return {
          animations: {
            opacity: delayFunction(delay, animation(1, config)),
            transform: [{
              translateX: delayFunction(delay, animation(0, config))
            }]
          },
          initialValues: {
            opacity: 0,
            transform: [{
              translateX: -25
            }],
            ...initialValues
          },
          callback: callback
        };
      };
    });
  }
  static createInstance() {
    return new FadeInLeft();
  }
}
export class FadeInUp extends ComplexAnimationBuilder {
  constructor() {
    super(...arguments);
    _defineProperty(this, "build", () => {
      const delayFunction = this.getDelayFunction();
      const [animation, config] = this.getAnimationAndConfig();
      const callback = this.callbackV;
      const initialValues = this.initialValues;
      const delay = this.getDelay();
      return () => {
        'worklet';

        return {
          animations: {
            opacity: delayFunction(delay, animation(1, config)),
            transform: [{
              translateY: delayFunction(delay, animation(0, config))
            }]
          },
          initialValues: {
            opacity: 0,
            transform: [{
              translateY: -25
            }],
            ...initialValues
          },
          callback: callback
        };
      };
    });
  }
  static createInstance() {
    return new FadeInUp();
  }
}
export class FadeInDown extends ComplexAnimationBuilder {
  constructor() {
    super(...arguments);
    _defineProperty(this, "build", () => {
      const delayFunction = this.getDelayFunction();
      const [animation, config] = this.getAnimationAndConfig();
      const callback = this.callbackV;
      const initialValues = this.initialValues;
      const delay = this.getDelay();
      return () => {
        'worklet';

        return {
          animations: {
            opacity: delayFunction(delay, animation(1, config)),
            transform: [{
              translateY: delayFunction(delay, animation(0, config))
            }]
          },
          initialValues: {
            opacity: 0,
            transform: [{
              translateY: 25
            }],
            ...initialValues
          },
          callback: callback
        };
      };
    });
  }
  static createInstance() {
    return new FadeInDown();
  }
}
export class FadeOut extends ComplexAnimationBuilder {
  constructor() {
    super(...arguments);
    _defineProperty(this, "build", () => {
      const delayFunction = this.getDelayFunction();
      const [animation, config] = this.getAnimationAndConfig();
      const callback = this.callbackV;
      const initialValues = this.initialValues;
      const delay = this.getDelay();
      return _ => {
        'worklet';

        return {
          animations: {
            opacity: delayFunction(delay, animation(0, config))
          },
          initialValues: {
            opacity: 1,
            ...initialValues
          },
          callback: callback
        };
      };
    });
  }
  static createInstance() {
    return new FadeOut();
  }
}
export class FadeOutRight extends ComplexAnimationBuilder {
  constructor() {
    super(...arguments);
    _defineProperty(this, "build", () => {
      const delayFunction = this.getDelayFunction();
      const [animation, config] = this.getAnimationAndConfig();
      const callback = this.callbackV;
      const initialValues = this.initialValues;
      const delay = this.getDelay();
      return () => {
        'worklet';

        return {
          animations: {
            opacity: delayFunction(delay, animation(0, config)),
            transform: [{
              translateX: delayFunction(delay, animation(25, config))
            }]
          },
          initialValues: {
            opacity: 1,
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
    return new FadeOutRight();
  }
}
export class FadeOutLeft extends ComplexAnimationBuilder {
  constructor() {
    super(...arguments);
    _defineProperty(this, "build", () => {
      const delayFunction = this.getDelayFunction();
      const [animation, config] = this.getAnimationAndConfig();
      const callback = this.callbackV;
      const initialValues = this.initialValues;
      const delay = this.getDelay();
      return () => {
        'worklet';

        return {
          animations: {
            opacity: delayFunction(delay, animation(0, config)),
            transform: [{
              translateX: delayFunction(delay, animation(-25, config))
            }]
          },
          initialValues: {
            opacity: 1,
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
    return new FadeOutLeft();
  }
}
export class FadeOutUp extends ComplexAnimationBuilder {
  constructor() {
    super(...arguments);
    _defineProperty(this, "build", () => {
      const delayFunction = this.getDelayFunction();
      const [animation, config] = this.getAnimationAndConfig();
      const callback = this.callbackV;
      const initialValues = this.initialValues;
      const delay = this.getDelay();
      return () => {
        'worklet';

        return {
          animations: {
            opacity: delayFunction(delay, animation(0, config)),
            transform: [{
              translateY: delayFunction(delay, animation(-25, config))
            }]
          },
          initialValues: {
            opacity: 1,
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
    return new FadeOutUp();
  }
}
export class FadeOutDown extends ComplexAnimationBuilder {
  constructor() {
    super(...arguments);
    _defineProperty(this, "build", () => {
      const delayFunction = this.getDelayFunction();
      const [animation, config] = this.getAnimationAndConfig();
      const callback = this.callbackV;
      const initialValues = this.initialValues;
      const delay = this.getDelay();
      return () => {
        'worklet';

        return {
          animations: {
            opacity: delayFunction(delay, animation(0, config)),
            transform: [{
              translateY: delayFunction(delay, animation(25, config))
            }]
          },
          initialValues: {
            opacity: 1,
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
    return new FadeOutDown();
  }
}
//# sourceMappingURL=Fade.js.map