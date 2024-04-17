function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import { withTiming, withSpring } from '../../animation';
import { BaseAnimationBuilder } from './BaseAnimationBuilder';
export class ComplexAnimationBuilder extends BaseAnimationBuilder {
  constructor() {
    super(...arguments);
    _defineProperty(this, "easingV", void 0);
    _defineProperty(this, "rotateV", void 0);
    _defineProperty(this, "type", void 0);
    _defineProperty(this, "dampingV", void 0);
    _defineProperty(this, "massV", void 0);
    _defineProperty(this, "stiffnessV", void 0);
    _defineProperty(this, "overshootClampingV", void 0);
    _defineProperty(this, "restDisplacementThresholdV", void 0);
    _defineProperty(this, "restSpeedThresholdV", void 0);
    _defineProperty(this, "initialValues", void 0);
  }
  static easing(easingFunction) {
    const instance = this.createInstance();
    return instance.easing(easingFunction);
  }
  easing(easingFunction) {
    this.easingV = easingFunction;
    return this;
  }
  static rotate(degree) {
    const instance = this.createInstance();
    return instance.rotate(degree);
  }
  rotate(degree) {
    this.rotateV = degree;
    return this;
  }
  static springify() {
    const instance = this.createInstance();
    return instance.springify();
  }
  springify() {
    this.type = withSpring;
    return this;
  }
  static damping(damping) {
    const instance = this.createInstance();
    return instance.damping(damping);
  }
  damping(damping) {
    this.dampingV = damping;
    return this;
  }
  static mass(mass) {
    const instance = this.createInstance();
    return instance.mass(mass);
  }
  mass(mass) {
    this.massV = mass;
    return this;
  }
  static stiffness(stiffness) {
    const instance = this.createInstance();
    return instance.stiffness(stiffness);
  }
  stiffness(stiffness) {
    this.stiffnessV = stiffness;
    return this;
  }
  static overshootClamping(overshootClamping) {
    const instance = this.createInstance();
    return instance.overshootClamping(overshootClamping);
  }
  overshootClamping(overshootClamping) {
    this.overshootClampingV = overshootClamping;
    return this;
  }
  static restDisplacementThreshold(restDisplacementThreshold) {
    const instance = this.createInstance();
    return instance.restDisplacementThreshold(restDisplacementThreshold);
  }
  restDisplacementThreshold(restDisplacementThreshold) {
    this.restDisplacementThresholdV = restDisplacementThreshold;
    return this;
  }
  static restSpeedThreshold(restSpeedThreshold) {
    const instance = this.createInstance();
    return instance.restSpeedThreshold(restSpeedThreshold);
  }
  restSpeedThreshold(restSpeedThreshold) {
    this.restSpeedThresholdV = restSpeedThreshold;
    return this;
  }
  static withInitialValues(values) {
    const instance = this.createInstance();
    return instance.withInitialValues(values);
  }
  withInitialValues(values) {
    this.initialValues = values;
    return this;
  }
  getAnimationAndConfig() {
    const duration = this.durationV;
    const easing = this.easingV;
    const rotate = this.rotateV;
    const type = this.type ? this.type : withTiming;
    const damping = this.dampingV;
    const mass = this.massV;
    const stiffness = this.stiffnessV;
    const overshootClamping = this.overshootClampingV;
    const restDisplacementThreshold = this.restDisplacementThresholdV;
    const restSpeedThreshold = this.restSpeedThresholdV;
    const animation = type;
    const config = {};
    if (type === withTiming) {
      if (easing) {
        config.easing = easing;
      }
      if (duration) {
        config.duration = duration;
      }
      if (rotate) {
        config.rotate = rotate;
      }
    } else {
      if (damping) {
        config.damping = damping;
      }
      if (mass) {
        config.mass = mass;
      }
      if (stiffness) {
        config.stiffness = stiffness;
      }
      if (overshootClamping) {
        config.overshootClamping = overshootClamping;
      }
      if (restDisplacementThreshold) {
        config.restDisplacementThreshold = restDisplacementThreshold;
      }
      if (restSpeedThreshold) {
        config.restSpeedThreshold = restSpeedThreshold;
      }
      if (rotate) {
        config.rotate = rotate;
      }
    }
    return [animation, config];
  }
}
_defineProperty(ComplexAnimationBuilder, "createInstance", void 0);
//# sourceMappingURL=ComplexAnimationBuilder.js.map