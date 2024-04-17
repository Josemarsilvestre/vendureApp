import { hsvToColor, RGBtoHSV, rgbaColor, processColor, red, green, blue, opacity } from './Colors';
import { makeMutable } from './core';
import { interpolate } from './interpolation';
import { useSharedValue } from './hook/useSharedValue';
export const Extrapolate = {
  EXTEND: 'extend',
  CLAMP: 'clamp',
  IDENTITY: 'identity'
};
const interpolateColorsHSV = (value, inputRange, colors, options) => {
  'worklet';

  let h = 0;
  const {
    useCorrectedHSVInterpolation = true
  } = options;
  if (useCorrectedHSVInterpolation) {
    // if the difference between hues in a range is > 180 deg
    // then move the hue at the right end of the range +/- 360 deg
    // and add the next point in the original place + 0.00001 with original hue
    // to not break the next range
    const correctedInputRange = [inputRange[0]];
    const originalH = colors.h;
    const correctedH = [originalH[0]];
    for (let i = 1; i < originalH.length; ++i) {
      const d = originalH[i] - originalH[i - 1];
      if (originalH[i] > originalH[i - 1] && d > 0.5) {
        correctedInputRange.push(inputRange[i]);
        correctedInputRange.push(inputRange[i] + 0.00001);
        correctedH.push(originalH[i] - 1);
        correctedH.push(originalH[i]);
      } else if (originalH[i] < originalH[i - 1] && d < -0.5) {
        correctedInputRange.push(inputRange[i]);
        correctedInputRange.push(inputRange[i] + 0.00001);
        correctedH.push(originalH[i] + 1);
        correctedH.push(originalH[i]);
      } else {
        correctedInputRange.push(inputRange[i]);
        correctedH.push(originalH[i]);
      }
    }
    h = (interpolate(value, correctedInputRange, correctedH, Extrapolate.CLAMP) + 1) % 1;
  } else {
    h = interpolate(value, inputRange, colors.h, Extrapolate.CLAMP);
  }
  const s = interpolate(value, inputRange, colors.s, Extrapolate.CLAMP);
  const v = interpolate(value, inputRange, colors.v, Extrapolate.CLAMP);
  const a = interpolate(value, inputRange, colors.a, Extrapolate.CLAMP);
  return hsvToColor(h, s, v, a);
};
const toLinearSpace = (x, gamma) => {
  'worklet';

  return x.map(v => Math.pow(v / 255, gamma));
};
const toGammaSpace = (x, gamma) => {
  'worklet';

  return Math.round(Math.pow(x, 1 / gamma) * 255);
};
const interpolateColorsRGB = (value, inputRange, colors, options) => {
  'worklet';

  const {
    gamma = 2.2
  } = options;
  let {
    r: outputR,
    g: outputG,
    b: outputB
  } = colors;
  if (gamma !== 1) {
    outputR = toLinearSpace(outputR, gamma);
    outputG = toLinearSpace(outputG, gamma);
    outputB = toLinearSpace(outputB, gamma);
  }
  const r = interpolate(value, inputRange, outputR, Extrapolate.CLAMP);
  const g = interpolate(value, inputRange, outputG, Extrapolate.CLAMP);
  const b = interpolate(value, inputRange, outputB, Extrapolate.CLAMP);
  const a = interpolate(value, inputRange, colors.a, Extrapolate.CLAMP);
  if (gamma === 1) {
    return rgbaColor(r, g, b, a);
  }
  return rgbaColor(toGammaSpace(r, gamma), toGammaSpace(g, gamma), toGammaSpace(b, gamma), a);
};
const getInterpolateRGB = colors => {
  'worklet';

  const r = [];
  const g = [];
  const b = [];
  const a = [];
  for (let i = 0; i < colors.length; ++i) {
    const color = colors[i];
    const processedColor = processColor(color);
    // explicit check in case if processedColor is 0
    if (processedColor !== null && processedColor !== undefined) {
      r.push(red(processedColor));
      g.push(green(processedColor));
      b.push(blue(processedColor));
      a.push(opacity(processedColor));
    }
  }
  return {
    r,
    g,
    b,
    a
  };
};
const getInterpolateHSV = colors => {
  'worklet';

  const h = [];
  const s = [];
  const v = [];
  const a = [];
  for (let i = 0; i < colors.length; ++i) {
    const color = colors[i];
    const processedColor = processColor(color);
    if (typeof processedColor === 'number') {
      const processedHSVColor = RGBtoHSV(red(processedColor), green(processedColor), blue(processedColor));
      h.push(processedHSVColor.h);
      s.push(processedHSVColor.s);
      v.push(processedHSVColor.v);
      a.push(opacity(processedColor));
    }
  }
  return {
    h,
    s,
    v,
    a
  };
};
export const interpolateColor = function (value, inputRange, outputRange) {
  'worklet';

  let colorSpace = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'RGB';
  let options = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
  if (colorSpace === 'HSV') {
    return interpolateColorsHSV(value, inputRange, getInterpolateHSV(outputRange), options);
  } else if (colorSpace === 'RGB') {
    return interpolateColorsRGB(value, inputRange, getInterpolateRGB(outputRange), options);
  }
  throw new Error(`Invalid color space provided: ${colorSpace}. Supported values are: ['RGB', 'HSV']`);
};
export let ColorSpace = /*#__PURE__*/function (ColorSpace) {
  ColorSpace[ColorSpace["RGB"] = 0] = "RGB";
  ColorSpace[ColorSpace["HSV"] = 1] = "HSV";
  return ColorSpace;
}({});
export function useInterpolateConfig(inputRange, outputRange) {
  let colorSpace = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ColorSpace.RGB;
  let options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  return useSharedValue({
    inputRange,
    outputRange,
    colorSpace,
    cache: makeMutable(null),
    options
  });
}
export const interpolateSharableColor = (value, interpolateConfig) => {
  'worklet';

  let colors = interpolateConfig.value.cache.value;
  if (interpolateConfig.value.colorSpace === ColorSpace.RGB) {
    if (!colors) {
      colors = getInterpolateRGB(interpolateConfig.value.outputRange);
      interpolateConfig.value.cache.value = colors;
    }
    return interpolateColorsRGB(value, interpolateConfig.value.inputRange, colors, interpolateConfig.value.options);
  } else if (interpolateConfig.value.colorSpace === ColorSpace.HSV) {
    if (!colors) {
      colors = getInterpolateHSV(interpolateConfig.value.outputRange);
      interpolateConfig.value.cache.value = colors;
    }
    return interpolateColorsHSV(value, interpolateConfig.value.inputRange, colors, interpolateConfig.value.options);
  }
  throw new Error(`Invalid color space provided: ${interpolateConfig.value.colorSpace}. Supported values are: ['RGB', 'HSV']`);
};
//# sourceMappingURL=interpolateColor.js.map