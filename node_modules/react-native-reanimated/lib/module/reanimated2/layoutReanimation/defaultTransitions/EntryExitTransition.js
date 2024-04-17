function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import { BaseAnimationBuilder } from '../animationBuilder';
import { withSequence, withTiming } from '../../animation';
import { FadeIn, FadeOut } from '../defaultAnimations/Fade';
export class EntryExitTransition extends BaseAnimationBuilder {
  constructor() {
    super(...arguments);
    _defineProperty(this, "enteringV", FadeIn);
    _defineProperty(this, "exitingV", FadeOut);
    _defineProperty(this, "build", () => {
      const delayFunction = this.getDelayFunction();
      const callback = this.callbackV;
      const delay = this.getDelay();
      const enteringAnimation = this.enteringV.build();
      const exitingAnimation = this.exitingV.build();
      const exitingDuration = this.exitingV.getDuration();
      return values => {
        'worklet';

        const enteringValues = enteringAnimation(values);
        const exitingValues = exitingAnimation(values);
        const animations = {
          transform: []
        };
        for (const prop of Object.keys(exitingValues.animations)) {
          if (prop === 'transform') {
            var _exitingValues$animat;
            (_exitingValues$animat = exitingValues.animations[prop]) === null || _exitingValues$animat === void 0 ? void 0 : _exitingValues$animat.forEach((value, index) => {
              for (const transformProp of Object.keys(value)) {
                var _animations$transform;
                (_animations$transform = animations.transform) === null || _animations$transform === void 0 ? void 0 : _animations$transform.push({
                  [transformProp]: delayFunction(delay, withSequence(value[transformProp], withTiming(exitingValues.initialValues.transform ? exitingValues.initialValues.transform[index][transformProp] : 0, {
                    duration: 0
                  })))
                });
              }
            });
          } else {
            const sequence = enteringValues.animations[prop] !== undefined ? [exitingValues.animations[prop], withTiming(enteringValues.initialValues[prop], {
              duration: 0
            }), enteringValues.animations[prop]] : [exitingValues.animations[prop], withTiming(Object.keys(values).includes(prop) ? values[prop] : exitingValues.initialValues[prop], {
              duration: 0
            })];
            animations[prop] = delayFunction(delay, withSequence(...sequence));
          }
        }
        for (const prop of Object.keys(enteringValues.animations)) {
          if (prop === 'transform') {
            var _enteringValues$anima;
            (_enteringValues$anima = enteringValues.animations[prop]) === null || _enteringValues$anima === void 0 ? void 0 : _enteringValues$anima.forEach((value, index) => {
              for (const transformProp of Object.keys(value)) {
                var _animations$transform2;
                (_animations$transform2 = animations.transform) === null || _animations$transform2 === void 0 ? void 0 : _animations$transform2.push({
                  [transformProp]: delayFunction(delay + exitingDuration, withSequence(withTiming(enteringValues.initialValues.transform ? enteringValues.initialValues.transform[index][transformProp] : 0, {
                    duration: exitingDuration
                  }), value[transformProp]))
                });
              }
            });
          } else if (animations[prop] !== undefined) {
            // it was already added in the previous loop
            continue;
          } else {
            animations[prop] = delayFunction(delay, withSequence(withTiming(enteringValues.initialValues[prop], {
              duration: 0
            }), enteringValues.animations[prop]));
          }
        }
        const mergedTransform = (exitingValues.initialValues.transform ?? []).concat((enteringValues.animations.transform ?? []).map(value => {
          const objectKeys = Object.keys(value);
          if ((objectKeys === null || objectKeys === void 0 ? void 0 : objectKeys.length) < 1) {
            console.error(`[Reanimated]: \${value} is not a valid Transform object`);
            return value;
          }
          const transformProp = objectKeys[0];
          const current = value[transformProp].current;
          if (typeof current === 'string') {
            if (current.includes('deg')) return {
              [transformProp]: '0deg'
            };else return {
              [transformProp]: '0'
            };
          } else if (transformProp.includes('translate')) {
            return {
              [transformProp]: 0
            };
          } else {
            return {
              [transformProp]: 1
            };
          }
          return value;
        }));
        return {
          initialValues: {
            ...exitingValues.initialValues,
            originX: values.currentOriginX,
            originY: values.currentOriginY,
            width: values.currentWidth,
            height: values.currentHeight,
            transform: mergedTransform
          },
          animations: {
            originX: delayFunction(delay + exitingDuration, withTiming(values.targetOriginX, {
              duration: exitingDuration
            })),
            originY: delayFunction(delay + exitingDuration, withTiming(values.targetOriginY, {
              duration: exitingDuration
            })),
            width: delayFunction(delay + exitingDuration, withTiming(values.targetWidth, {
              duration: exitingDuration
            })),
            height: delayFunction(delay + exitingDuration, withTiming(values.targetHeight, {
              duration: exitingDuration
            })),
            ...animations
          },
          callback: callback
        };
      };
    });
  }
  static createInstance() {
    return new EntryExitTransition();
  }
  static entering(animation) {
    const instance = this.createInstance();
    return instance.entering(animation);
  }
  entering(animation) {
    this.enteringV = animation;
    return this;
  }
  static exiting(animation) {
    const instance = this.createInstance();
    return instance.exiting(animation);
  }
  exiting(animation) {
    this.exitingV = animation;
    return this;
  }
}
export function combineTransition(exiting, entering) {
  return EntryExitTransition.entering(entering).exiting(exiting);
}
//# sourceMappingURL=EntryExitTransition.js.map