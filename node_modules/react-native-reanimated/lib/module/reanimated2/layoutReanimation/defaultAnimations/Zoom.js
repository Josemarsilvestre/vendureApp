function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import { ComplexAnimationBuilder } from '../animationBuilder';
export class ZoomIn extends ComplexAnimationBuilder {
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
              scale: delayFunction(delay, animation(1, config))
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
    return new ZoomIn();
  }
}
export class ZoomInRotate extends ComplexAnimationBuilder {
  constructor() {
    super(...arguments);
    _defineProperty(this, "build", () => {
      const delayFunction = this.getDelayFunction();
      const [animation, config] = this.getAnimationAndConfig();
      const delay = this.getDelay();
      const rotate = this.rotateV ? this.rotateV : '0.3';
      const callback = this.callbackV;
      const initialValues = this.initialValues;
      return () => {
        'worklet';

        return {
          animations: {
            transform: [{
              scale: delayFunction(delay, animation(1, config))
            }, {
              rotate: delayFunction(delay, animation(0, config))
            }]
          },
          initialValues: {
            transform: [{
              scale: 0
            }, {
              rotate: rotate
            }],
            ...initialValues
          },
          callback: callback
        };
      };
    });
  }
  static createInstance() {
    return new ZoomInRotate();
  }
}
export class ZoomInLeft extends ComplexAnimationBuilder {
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
              scale: delayFunction(delay, animation(1, config))
            }]
          },
          initialValues: {
            transform: [{
              translateX: -values.windowWidth
            }, {
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
    return new ZoomInLeft();
  }
}
export class ZoomInRight extends ComplexAnimationBuilder {
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
              scale: delayFunction(delay, animation(1, config))
            }]
          },
          initialValues: {
            transform: [{
              translateX: values.windowWidth
            }, {
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
    return new ZoomInRight();
  }
}
export class ZoomInUp extends ComplexAnimationBuilder {
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
              translateY: delayFunction(delay, animation(0, config))
            }, {
              scale: delayFunction(delay, animation(1, config))
            }]
          },
          initialValues: {
            transform: [{
              translateY: -values.windowHeight
            }, {
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
    return new ZoomInUp();
  }
}
export class ZoomInDown extends ComplexAnimationBuilder {
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
              translateY: delayFunction(delay, animation(0, config))
            }, {
              scale: delayFunction(delay, animation(1, config))
            }]
          },
          initialValues: {
            transform: [{
              translateY: values.windowHeight
            }, {
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
    return new ZoomInDown();
  }
}
export class ZoomInEasyUp extends ComplexAnimationBuilder {
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
              translateY: delayFunction(delay, animation(0, config))
            }, {
              scale: delayFunction(delay, animation(1, config))
            }]
          },
          initialValues: {
            transform: [{
              translateY: -values.targetHeight
            }, {
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
    return new ZoomInEasyUp();
  }
}
export class ZoomInEasyDown extends ComplexAnimationBuilder {
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
              translateY: delayFunction(delay, animation(0, config))
            }, {
              scale: delayFunction(delay, animation(1, config))
            }]
          },
          initialValues: {
            transform: [{
              translateY: values.targetHeight
            }, {
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
    return new ZoomInEasyDown();
  }
}
export class ZoomOut extends ComplexAnimationBuilder {
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
              scale: delayFunction(delay, animation(0, config))
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
    return new ZoomOut();
  }
}
export class ZoomOutRotate extends ComplexAnimationBuilder {
  constructor() {
    super(...arguments);
    _defineProperty(this, "build", () => {
      const delayFunction = this.getDelayFunction();
      const [animation, config] = this.getAnimationAndConfig();
      const delay = this.getDelay();
      const rotate = this.rotateV ? this.rotateV : '0.3';
      const callback = this.callbackV;
      const initialValues = this.initialValues;
      return () => {
        'worklet';

        return {
          animations: {
            transform: [{
              scale: delayFunction(delay, animation(0, config))
            }, {
              rotate: delayFunction(delay, animation(rotate, config))
            }]
          },
          initialValues: {
            transform: [{
              scale: 1
            }, {
              rotate: '0'
            }],
            ...initialValues
          },
          callback: callback
        };
      };
    });
  }
  static createInstance() {
    return new ZoomOutRotate();
  }
}
export class ZoomOutLeft extends ComplexAnimationBuilder {
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
              scale: delayFunction(delay, animation(0, config))
            }]
          },
          initialValues: {
            transform: [{
              translateX: 0
            }, {
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
    return new ZoomOutLeft();
  }
}
export class ZoomOutRight extends ComplexAnimationBuilder {
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
              scale: delayFunction(delay, animation(0, config))
            }]
          },
          initialValues: {
            transform: [{
              translateX: 0
            }, {
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
    return new ZoomOutRight();
  }
}
export class ZoomOutUp extends ComplexAnimationBuilder {
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
              translateY: delayFunction(delay, animation(-values.windowHeight, config))
            }, {
              scale: delayFunction(delay, animation(0, config))
            }]
          },
          initialValues: {
            transform: [{
              translateY: 0
            }, {
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
    return new ZoomOutUp();
  }
}
export class ZoomOutDown extends ComplexAnimationBuilder {
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
              translateY: delayFunction(delay, animation(values.windowHeight, config))
            }, {
              scale: delayFunction(delay, animation(0, config))
            }]
          },
          initialValues: {
            transform: [{
              translateY: 0
            }, {
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
    return new ZoomOutDown();
  }
}
export class ZoomOutEasyUp extends ComplexAnimationBuilder {
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
              translateY: delayFunction(delay, animation(-values.currentHeight, config))
            }, {
              scale: delayFunction(delay, animation(0, config))
            }]
          },
          initialValues: {
            transform: [{
              translateY: 0
            }, {
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
    return new ZoomOutEasyUp();
  }
}
export class ZoomOutEasyDown extends ComplexAnimationBuilder {
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
              translateY: delayFunction(delay, animation(values.currentHeight, config))
            }, {
              scale: delayFunction(delay, animation(0, config))
            }]
          },
          initialValues: {
            transform: [{
              translateY: 0
            }, {
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
    return new ZoomOutEasyDown();
  }
}
//# sourceMappingURL=Zoom.js.map