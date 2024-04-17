export { stopMapper } from './mappers';
export function valueSetter(sv, value) {
  'worklet';

  const previousAnimation = sv._animation;
  if (previousAnimation) {
    previousAnimation.cancelled = true;
    sv._animation = null;
  }
  if (typeof value === 'function' || value !== null && typeof value === 'object' && value.onFrame !== undefined) {
    const animation = typeof value === 'function' ? value() : value;
    // prevent setting again to the same value
    // and triggering the mappers that treat this value as an input
    // this happens when the animation's target value(stored in animation.current until animation.onStart is called) is set to the same value as a current one(this._value)
    // built in animations that are not higher order(withTiming, withSpring) hold target value in .current
    if (sv._value === animation.current && !animation.isHigherOrder) {
      animation.callback && animation.callback(true);
      return;
    }
    // animated set
    const initializeAnimation = timestamp => {
      animation.onStart(animation, sv.value, timestamp, previousAnimation);
    };
    const currentTimestamp = global.__frameTimestamp || performance.now();
    initializeAnimation(currentTimestamp);
    const step = timestamp => {
      if (animation.cancelled) {
        animation.callback && animation.callback(false /* finished */);
        return;
      }
      const finished = animation.onFrame(animation, timestamp);
      animation.finished = true;
      animation.timestamp = timestamp;
      sv._value = animation.current;
      if (finished) {
        animation.callback && animation.callback(true /* finished */);
      } else {
        requestAnimationFrame(step);
      }
    };
    sv._animation = animation;
    step(currentTimestamp);
  } else {
    // prevent setting again to the same value
    // and triggering the mappers that treat this value as an input
    if (sv._value === value) {
      return;
    }
    sv._value = value;
  }
}
//# sourceMappingURL=valueSetter.js.map