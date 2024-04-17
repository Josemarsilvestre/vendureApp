function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import { BaseAnimationBuilder } from '../animationBuilder';
import { Easing } from '../../Easing';
import { withTiming } from '../../animation';
export class CurvedTransition extends BaseAnimationBuilder {
  constructor() {
    super(...arguments);
    _defineProperty(this, "easingXV", Easing.in(Easing.ease));
    _defineProperty(this, "easingYV", Easing.out(Easing.ease));
    _defineProperty(this, "easingWidthV", Easing.in(Easing.exp));
    _defineProperty(this, "easingHeightV", Easing.out(Easing.exp));
    _defineProperty(this, "build", () => {
      const delayFunction = this.getDelayFunction();
      const callback = this.callbackV;
      const delay = this.getDelay();
      const duration = this.durationV ?? 300;
      const easing = {
        easingX: this.easingXV,
        easingY: this.easingYV,
        easingWidth: this.easingWidthV,
        easingHeight: this.easingHeightV
      };
      return values => {
        'worklet';

        return {
          initialValues: {
            originX: values.currentOriginX,
            originY: values.currentOriginY,
            width: values.currentWidth,
            height: values.currentHeight
          },
          animations: {
            originX: delayFunction(delay, withTiming(values.targetOriginX, {
              duration,
              easing: easing.easingX
            })),
            originY: delayFunction(delay, withTiming(values.targetOriginY, {
              duration,
              easing: easing.easingY
            })),
            width: delayFunction(delay, withTiming(values.targetWidth, {
              duration,
              easing: easing.easingWidth
            })),
            height: delayFunction(delay, withTiming(values.targetHeight, {
              duration,
              easing: easing.easingHeight
            }))
          },
          callback: callback
        };
      };
    });
  }
  static createInstance() {
    return new CurvedTransition();
  }
  static easingX(easing) {
    const instance = this.createInstance();
    return instance.easingX(easing);
  }
  easingX(easing) {
    this.easingXV = easing;
    return this;
  }
  static easingY(easing) {
    const instance = this.createInstance();
    return instance.easingY(easing);
  }
  easingY(easing) {
    this.easingYV = easing;
    return this;
  }
  static easingWidth(easing) {
    const instance = this.createInstance();
    return instance.easingWidth(easing);
  }
  easingWidth(easing) {
    this.easingWidthV = easing;
    return this;
  }
  static easingHeight(easing) {
    const instance = this.createInstance();
    return instance.easingHeight(easing);
  }
  easingHeight(easing) {
    this.easingHeightV = easing;
    return this;
  }
}
//# sourceMappingURL=CurvedTransition.js.map