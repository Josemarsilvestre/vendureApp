import JSReanimated from './JSReanimated';
import { isWeb } from '../PlatformChecker';
let createReactDOMStyle;
let createTransformValue;
if (isWeb()) {
  try {
    createReactDOMStyle = require('react-native-web/dist/exports/StyleSheet/compiler/createReactDOMStyle').default;
  } catch (e) {}
  try {
    // React Native Web 0.19+
    createTransformValue = require('react-native-web/dist/exports/StyleSheet/preprocess').createTransformValue;
  } catch (e) {}
}
const reanimatedJS = new JSReanimated();
global._makeShareableClone = c => c;
global._scheduleOnJS = queueMicrotask;
export const _updatePropsJS = (updates, viewRef) => {
  if (viewRef._component) {
    const component = viewRef._component;
    const [rawStyles] = Object.keys(updates).reduce((acc, key) => {
      const value = updates[key];
      const index = typeof value === 'function' ? 1 : 0;
      acc[index][key] = value;
      return acc;
    }, [{}, {}]);
    if (typeof component.setNativeProps === 'function') {
      // This is the legacy way to update props on React Native Web <= 0.18.
      // Also, some components (e.g. from react-native-svg) don't have styles
      // and always provide setNativeProps function instead (even on React Native Web 0.19+).
      setNativeProps(component, rawStyles);
    } else if (createReactDOMStyle !== undefined && component.style !== undefined) {
      // React Native Web 0.19+ no longer provides setNativeProps function,
      // so we need to update DOM nodes directly.
      updatePropsDOM(component, rawStyles);
    } else if (Object.keys(component.props).length > 0) {
      Object.keys(component.props).forEach(key => {
        if (!rawStyles[key]) {
          return;
        }
        const dashedKey = key.replace(/[A-Z]/g, m => '-' + m.toLowerCase());
        component._touchableNode.setAttribute(dashedKey, rawStyles[key]);
      });
    } else {
      console.warn('It is not possible to manipulate component');
    }
  }
};
const setNativeProps = (component, style) => {
  var _component$setNativeP;
  const previousStyle = component.previousStyle ? component.previousStyle : {};
  const currentStyle = {
    ...previousStyle,
    ...style
  };
  component.previousStyle = currentStyle;
  (_component$setNativeP = component.setNativeProps) === null || _component$setNativeP === void 0 ? void 0 : _component$setNativeP.call(component, {
    style: currentStyle
  });
};
const updatePropsDOM = (component, style) => {
  const previousStyle = component.previousStyle ? component.previousStyle : {};
  const currentStyle = {
    ...previousStyle,
    ...style
  };
  component.previousStyle = currentStyle;
  const domStyle = createReactDOMStyle(currentStyle);
  if (Array.isArray(domStyle.transform) && createTransformValue !== undefined) {
    domStyle.transform = createTransformValue(domStyle.transform);
  }
  for (const key in domStyle) {
    component.style[key] = domStyle[key];
  }
};
export default reanimatedJS;
//# sourceMappingURL=index.js.map