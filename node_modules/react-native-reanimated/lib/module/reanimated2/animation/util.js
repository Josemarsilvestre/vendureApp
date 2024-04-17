/* global _WORKLET */
import { isColor, convertToRGBA, rgbaArrayToRGBAColor, toGammaSpace, toLinearSpace } from '../Colors';
import NativeReanimatedModule from '../NativeReanimated';
let IN_STYLE_UPDATER = false;
export function initialUpdaterRun(updater) {
  IN_STYLE_UPDATER = true;
  const result = updater();
  IN_STYLE_UPDATER = false;
  return result;
}
function recognizePrefixSuffix(value) {
  'worklet';

  if (typeof value === 'string') {
    const match = value.match(/([A-Za-z]*)(-?\d*\.?\d*)([eE][-+]?[0-9]+)?([A-Za-z%]*)/);
    if (!match) {
      throw Error("Couldn't parse animation value. Check if there isn't any typo.");
    }
    const prefix = match[1];
    const suffix = match[4];
    // number with scientific notation
    const number = match[2] + (match[3] ?? '');
    return {
      prefix,
      suffix,
      strippedValue: parseFloat(number)
    };
  } else {
    return {
      strippedValue: value
    };
  }
}
function decorateAnimation(animation) {
  'worklet';

  if (animation.isHigherOrder) {
    return;
  }
  const baseOnStart = animation.onStart;
  const baseOnFrame = animation.onFrame;
  const animationCopy = Object.assign({}, animation);
  delete animationCopy.callback;
  const prefNumberSuffOnStart = (animation, value, timestamp, previousAnimation) => {
    // recognize prefix, suffix, and updates stripped value on animation start
    const {
      prefix,
      suffix,
      strippedValue
    } = recognizePrefixSuffix(value);
    animation.__prefix = prefix;
    animation.__suffix = suffix;
    animation.strippedCurrent = strippedValue;
    const {
      strippedValue: strippedToValue
    } = recognizePrefixSuffix(animation.toValue);
    animation.current = strippedValue;
    animation.startValue = strippedValue;
    animation.toValue = strippedToValue;
    if (previousAnimation && previousAnimation !== animation) {
      const {
        prefix: paPrefix,
        suffix: paSuffix,
        strippedValue: paStrippedValue
      } = recognizePrefixSuffix(previousAnimation.current);
      previousAnimation.current = paStrippedValue;
      previousAnimation.__prefix = paPrefix;
      previousAnimation.__suffix = paSuffix;
    }
    baseOnStart(animation, strippedValue, timestamp, previousAnimation);
    animation.current = (animation.__prefix ?? '') + animation.current + (animation.__suffix ?? '');
    if (previousAnimation && previousAnimation !== animation) {
      previousAnimation.current = (previousAnimation.__prefix ?? '') + previousAnimation.current + (previousAnimation.__suffix ?? '');
    }
  };
  const prefNumberSuffOnFrame = (animation, timestamp) => {
    animation.current = animation.strippedCurrent;
    const res = baseOnFrame(animation, timestamp);
    animation.strippedCurrent = animation.current;
    animation.current = (animation.__prefix ?? '') + animation.current + (animation.__suffix ?? '');
    return res;
  };
  const tab = ['R', 'G', 'B', 'A'];
  const colorOnStart = (animation, value, timestamp, previousAnimation) => {
    let RGBAValue;
    let RGBACurrent;
    let RGBAToValue;
    const res = [];
    if (isColor(value)) {
      RGBACurrent = toLinearSpace(convertToRGBA(animation.current));
      RGBAValue = toLinearSpace(convertToRGBA(value));
      if (animation.toValue) {
        RGBAToValue = toLinearSpace(convertToRGBA(animation.toValue));
      }
    }
    tab.forEach((i, index) => {
      animation[i] = Object.assign({}, animationCopy);
      animation[i].current = RGBACurrent[index];
      animation[i].toValue = RGBAToValue ? RGBAToValue[index] : undefined;
      animation[i].onStart(animation[i], RGBAValue[index], timestamp, previousAnimation ? previousAnimation[i] : undefined);
      res.push(animation[i].current);
    });
    animation.current = rgbaArrayToRGBAColor(toGammaSpace(res));
  };
  const colorOnFrame = (animation, timestamp) => {
    const RGBACurrent = toLinearSpace(convertToRGBA(animation.current));
    const res = [];
    let finished = true;
    tab.forEach((i, index) => {
      animation[i].current = RGBACurrent[index];
      // @ts-ignore: disable-next-line
      finished &= animation[i].onFrame(animation[i], timestamp);
      res.push(animation[i].current);
    });
    animation.current = rgbaArrayToRGBAColor(toGammaSpace(res));
    return finished;
  };
  const arrayOnStart = (animation, value, timestamp, previousAnimation) => {
    value.forEach((v, i) => {
      animation[i] = Object.assign({}, animationCopy);
      animation[i].current = v;
      animation[i].toValue = animation.toValue[i];
      animation[i].onStart(animation[i], v, timestamp, previousAnimation ? previousAnimation[i] : undefined);
    });
    animation.current = value;
  };
  const arrayOnFrame = (animation, timestamp) => {
    let finished = true;
    animation.current.forEach((v, i) => {
      // @ts-ignore: disable-next-line
      finished &= animation[i].onFrame(animation[i], timestamp);
      animation.current[i] = animation[i].current;
    });
    return finished;
  };
  const objectOnStart = (animation, value, timestamp, previousAnimation) => {
    for (const key in value) {
      animation[key] = Object.assign({}, animationCopy);
      animation[key].onStart = animation.onStart;
      animation[key].current = value[key];
      animation[key].toValue = animation.toValue[key];
      animation[key].onStart(animation[key], value[key], timestamp, previousAnimation ? previousAnimation[key] : undefined);
    }
    animation.current = value;
  };
  const objectOnFrame = (animation, timestamp) => {
    let finished = true;
    const newObject = {};
    for (const key in animation.current) {
      // @ts-ignore: disable-next-line
      finished &= animation[key].onFrame(animation[key], timestamp);
      newObject[key] = animation[key].current;
    }
    animation.current = newObject;
    return finished;
  };
  animation.onStart = (animation, value, timestamp, previousAnimation) => {
    if (isColor(value)) {
      colorOnStart(animation, value, timestamp, previousAnimation);
      animation.onFrame = colorOnFrame;
      return;
    } else if (Array.isArray(value)) {
      arrayOnStart(animation, value, timestamp, previousAnimation);
      animation.onFrame = arrayOnFrame;
      return;
    } else if (typeof value === 'string') {
      prefNumberSuffOnStart(animation, value, timestamp, previousAnimation);
      animation.onFrame = prefNumberSuffOnFrame;
      return;
    } else if (typeof value === 'object' && value !== null) {
      objectOnStart(animation, value, timestamp, previousAnimation);
      animation.onFrame = objectOnFrame;
      return;
    }
    baseOnStart(animation, value, timestamp, previousAnimation);
  };
}
const IS_NATIVE = NativeReanimatedModule.native;
export function defineAnimation(starting, factory) {
  'worklet';

  if (IN_STYLE_UPDATER) {
    return starting;
  }
  const create = () => {
    'worklet';

    const animation = factory();
    decorateAnimation(animation);
    return animation;
  };
  if (_WORKLET || !IS_NATIVE) {
    return create();
  }
  // @ts-ignore: eslint-disable-line
  return create;
}
export function cancelAnimation(sharedValue) {
  'worklet';

  // setting the current value cancels the animation if one is currently running
  sharedValue.value = sharedValue.value; // eslint-disable-line no-self-assign
}

// TODO it should work only if there was no animation before.
export function withStartValue(startValue, animation) {
  'worklet';

  return defineAnimation(startValue, () => {
    'worklet';

    if (!_WORKLET && typeof animation === 'function') {
      animation = animation();
    }
    animation.current = startValue;
    return animation;
  });
}
//# sourceMappingURL=util.js.map