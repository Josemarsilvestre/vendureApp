function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import { ComplexAnimationBuilder } from '../animationBuilder';
export class RotateInDownLeft extends ComplexAnimationBuilder {
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
            opacity: delayFunction(delay, animation(1, config)),
            transform: [{
              rotate: delayFunction(delay, animation('0deg', config))
            }, {
              translateX: delayFunction(delay, animation(0, config))
            }, {
              translateY: delayFunction(delay, animation(0, config))
            }]
          },
          initialValues: {
            opacity: 0,
            transform: [{
              rotate: '-90deg'
            }, {
              translateX: values.targetWidth / 2 - values.targetHeight / 2
            }, {
              translateY: -(values.targetWidth / 2 - values.targetHeight / 2)
            }],
            ...initialValues
          },
          callback: callback
        };
      };
    });
  }
  static createInstance() {
    return new RotateInDownLeft();
  }
}
export class RotateInDownRight extends ComplexAnimationBuilder {
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
            opacity: delayFunction(delay, animation(1, config)),
            transform: [{
              rotate: delayFunction(delay, animation('0deg', config))
            }, {
              translateX: delayFunction(delay, animation(0, config))
            }, {
              translateY: delayFunction(delay, animation(0, config))
            }]
          },
          initialValues: {
            opacity: 0,
            transform: [{
              rotate: '90deg'
            }, {
              translateX: -(values.targetWidth / 2 - values.targetHeight / 2)
            }, {
              translateY: -(values.targetWidth / 2 - values.targetHeight / 2)
            }],
            ...initialValues
          },
          callback: callback
        };
      };
    });
  }
  static createInstance() {
    return new RotateInDownRight();
  }
}
export class RotateInUpLeft extends ComplexAnimationBuilder {
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
            opacity: delayFunction(delay, animation(1, config)),
            transform: [{
              rotate: delayFunction(delay, animation('0deg', config))
            }, {
              translateX: delayFunction(delay, animation(0, config))
            }, {
              translateY: delayFunction(delay, animation(0, config))
            }]
          },
          initialValues: {
            opacity: 0,
            transform: [{
              rotate: '90deg'
            }, {
              translateX: values.targetWidth / 2 - values.targetHeight / 2
            }, {
              translateY: values.targetWidth / 2 - values.targetHeight / 2
            }],
            ...initialValues
          },
          callback: callback
        };
      };
    });
  }
  static createInstance() {
    return new RotateInUpLeft();
  }
}
export class RotateInUpRight extends ComplexAnimationBuilder {
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
            opacity: delayFunction(delay, animation(1, config)),
            transform: [{
              rotate: delayFunction(delay, animation('0deg', config))
            }, {
              translateX: delayFunction(delay, animation(0, config))
            }, {
              translateY: delayFunction(delay, animation(0, config))
            }]
          },
          initialValues: {
            opacity: 0,
            transform: [{
              rotate: '-90deg'
            }, {
              translateX: -(values.targetWidth / 2 - values.targetHeight / 2)
            }, {
              translateY: values.targetWidth / 2 - values.targetHeight / 2
            }],
            ...initialValues
          },
          callback: callback
        };
      };
    });
  }
  static createInstance() {
    return new RotateInUpRight();
  }
}
export class RotateOutDownLeft extends ComplexAnimationBuilder {
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
            opacity: delayFunction(delay, animation(0, config)),
            transform: [{
              rotate: delayFunction(delay, animation('90deg', config))
            }, {
              translateX: delayFunction(delay, animation(values.currentWidth / 2 - values.currentHeight / 2, config))
            }, {
              translateY: delayFunction(delay, animation(values.currentWidth / 2 - values.currentHeight / 2, config))
            }]
          },
          initialValues: {
            opacity: 1,
            transform: [{
              rotate: '0deg'
            }, {
              translateX: 0
            }, {
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
    return new RotateOutDownLeft();
  }
}
export class RotateOutDownRight extends ComplexAnimationBuilder {
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
            opacity: delayFunction(delay, animation(0, config)),
            transform: [{
              rotate: delayFunction(delay, animation('-90deg', config))
            }, {
              translateX: delayFunction(delay, animation(-(values.currentWidth / 2 - values.currentHeight / 2), config))
            }, {
              translateY: delayFunction(delay, animation(values.currentWidth / 2 - values.currentHeight / 2, config))
            }]
          },
          initialValues: {
            opacity: 1,
            transform: [{
              rotate: '0deg'
            }, {
              translateX: 0
            }, {
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
    return new RotateOutDownRight();
  }
}
export class RotateOutUpLeft extends ComplexAnimationBuilder {
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
            opacity: delayFunction(delay, animation(0, config)),
            transform: [{
              rotate: delayFunction(delay, animation('-90deg', config))
            }, {
              translateX: delayFunction(delay, animation(values.currentWidth / 2 - values.currentHeight / 2, config))
            }, {
              translateY: delayFunction(delay, animation(-(values.currentWidth / 2 - values.currentHeight / 2), config))
            }]
          },
          initialValues: {
            opacity: 1,
            transform: [{
              rotate: '0deg'
            }, {
              translateX: 0
            }, {
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
    return new RotateOutUpLeft();
  }
}
export class RotateOutUpRight extends ComplexAnimationBuilder {
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
            opacity: delayFunction(delay, animation(0, config)),
            transform: [{
              rotate: delayFunction(delay, animation('90deg', config))
            }, {
              translateX: delayFunction(delay, animation(-(values.currentWidth / 2 - values.currentHeight / 2), config))
            }, {
              translateY: delayFunction(delay, animation(-(values.currentWidth / 2 - values.currentHeight / 2), config))
            }]
          },
          initialValues: {
            opacity: 1,
            transform: [{
              rotate: '0deg'
            }, {
              translateX: 0
            }, {
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
    return new RotateOutUpRight();
  }
}
//# sourceMappingURL=Rotate.js.map