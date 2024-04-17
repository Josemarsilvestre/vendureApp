function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import React from 'react';
import { findNodeHandle, Platform, StyleSheet } from 'react-native';
import WorkletEventHandler from './reanimated2/WorkletEventHandler';
import setAndForwardRef from './setAndForwardRef';
import './reanimated2/layoutReanimation/animationsManager';
import invariant from 'invariant';
import { adaptViewConfig } from './ConfigHelper';
import { RNRenderer } from './reanimated2/platform-specific/RNRenderer';
import { configureLayoutAnimations, enableLayoutAnimations, runOnUI, startMapper, stopMapper } from './reanimated2/core';
import { isJest, isChromeDebugger, shouldBeUseWeb } from './reanimated2/PlatformChecker';
import { initialUpdaterRun } from './reanimated2/animation';
import { DefaultSharedTransition, LayoutAnimationType } from './reanimated2/layoutReanimation';
import { makeViewDescriptorsSet } from './reanimated2/ViewDescriptorsSet';
import { getShadowNodeWrapperFromRef } from './reanimated2/fabricUtils';
import updateProps from './reanimated2/UpdateProps';
import NativeReanimatedModule from './reanimated2/NativeReanimated';
import { isSharedValue } from './reanimated2';
function dummyListener() {
  // empty listener we use to assign to listener properties for which animated
  // event is used.
}
function maybeBuild(layoutAnimationOrBuilder) {
  const isAnimationBuilder = value => 'build' in layoutAnimationOrBuilder && typeof layoutAnimationOrBuilder.build === 'function';
  if (isAnimationBuilder(layoutAnimationOrBuilder)) {
    return layoutAnimationOrBuilder.build();
  } else {
    return layoutAnimationOrBuilder;
  }
}
function flattenArray(array) {
  if (!Array.isArray(array)) {
    return [array];
  }
  const resultArr = [];
  const _flattenArray = arr => {
    arr.forEach(item => {
      if (Array.isArray(item)) {
        _flattenArray(item);
      } else {
        resultArr.push(item);
      }
    });
  };
  _flattenArray(array);
  return resultArr;
}
function onlyAnimatedStyles(styles) {
  return styles.filter(style => style === null || style === void 0 ? void 0 : style.viewDescriptors);
}
function isSameAnimatedStyle(style1, style2) {
  // We cannot use equality check to compare useAnimatedStyle outputs directly.
  // Instead, we can compare its viewsRefs.
  return (style1 === null || style1 === void 0 ? void 0 : style1.viewsRef) === (style2 === null || style2 === void 0 ? void 0 : style2.viewsRef);
}
const isSameAnimatedProps = isSameAnimatedStyle;
const has = (key, x) => {
  if (typeof x === 'function' || typeof x === 'object') {
    if (x === null || x === undefined) {
      return false;
    } else {
      return key in x;
    }
  }
  return false;
};
function isInlineStyleTransform(transform) {
  if (!transform) {
    return false;
  }
  return transform.some(t => hasInlineStyles(t));
}
function hasInlineStyles(style) {
  if (!style) {
    return false;
  }
  return Object.keys(style).some(key => {
    const styleValue = style[key];
    return isSharedValue(styleValue) || key === 'transform' && isInlineStyleTransform(styleValue);
  });
}
function extractSharedValuesMapFromProps(props) {
  const inlineProps = {};
  for (const key in props) {
    const value = props[key];
    if (key === 'style') {
      const styles = flattenArray(props.style ?? []);
      styles.forEach(style => {
        if (!style) {
          return;
        }
        for (const [key, styleValue] of Object.entries(style)) {
          if (isSharedValue(styleValue)) {
            inlineProps[key] = styleValue;
          } else if (key === 'transform' && isInlineStyleTransform(styleValue)) {
            inlineProps[key] = styleValue;
          }
        }
      });
    } else if (isSharedValue(value)) {
      inlineProps[key] = value;
    }
  }
  return inlineProps;
}
function inlinePropsHasChanged(styles1, styles2) {
  if (Object.keys(styles1).length !== Object.keys(styles2).length) {
    return true;
  }
  for (const key of Object.keys(styles1)) {
    if (styles1[key] !== styles2[key]) return true;
  }
  return false;
}
function getInlinePropsUpdate(inlineProps) {
  'worklet';

  const update = {};
  for (const [key, styleValue] of Object.entries(inlineProps)) {
    if (key === 'transform') {
      update[key] = styleValue.map(transform => {
        return getInlinePropsUpdate(transform);
      });
    } else if (isSharedValue(styleValue)) {
      update[key] = styleValue.value;
    } else {
      update[key] = styleValue;
    }
  }
  return update;
}
export default function createAnimatedComponent(Component, options) {
  invariant(typeof Component !== 'function' || Component.prototype && Component.prototype.isReactComponent, `Looks like you're passing a function component \`${Component.name}\` to \`createAnimatedComponent\` function which supports only class components. Please wrap your function component with \`React.forwardRef()\` or use a class component instead.`);
  class AnimatedComponent extends React.Component {
    constructor(props) {
      super(props);
      _defineProperty(this, "_styles", null);
      _defineProperty(this, "_animatedProps", void 0);
      _defineProperty(this, "_viewTag", -1);
      _defineProperty(this, "_isFirstRender", true);
      _defineProperty(this, "animatedStyle", {
        value: {}
      });
      _defineProperty(this, "initialStyle", {});
      _defineProperty(this, "_component", null);
      _defineProperty(this, "_inlinePropsViewDescriptors", null);
      _defineProperty(this, "_inlinePropsMapperId", null);
      _defineProperty(this, "_inlineProps", {});
      _defineProperty(this, "_setComponentRef", setAndForwardRef({
        getForwardedRef: () => this.props.forwardedRef,
        setLocalRef: ref => {
          // TODO update config
          const tag = findNodeHandle(ref);
          const {
            layout,
            entering,
            exiting,
            sharedTransitionTag
          } = this.props;
          if ((layout || entering || exiting || sharedTransitionTag) && tag != null) {
            if (!shouldBeUseWeb()) {
              enableLayoutAnimations(true, false);
            }
            if (layout) {
              configureLayoutAnimations(tag, LayoutAnimationType.LAYOUT, maybeBuild(layout));
            }
            if (entering) {
              configureLayoutAnimations(tag, LayoutAnimationType.ENTERING, maybeBuild(entering));
            }
            if (exiting) {
              configureLayoutAnimations(tag, LayoutAnimationType.EXITING, maybeBuild(exiting));
            }
            if (sharedTransitionTag) {
              const sharedElementTransition = this.props.sharedTransitionStyle ?? DefaultSharedTransition;
              configureLayoutAnimations(tag, LayoutAnimationType.SHARED_ELEMENT_TRANSITION, maybeBuild(sharedElementTransition), sharedTransitionTag);
            }
          }
          if (ref !== this._component) {
            this._component = ref;
          }
        }
      }));
      if (isJest()) {
        this.animatedStyle = {
          value: {}
        };
      }
    }
    componentWillUnmount() {
      this._detachNativeEvents();
      this._detachStyles();
      this._detachInlineProps();
    }
    componentDidMount() {
      this._attachNativeEvents();
      this._attachAnimatedStyles();
      this._attachInlineProps();
    }
    _getEventViewRef() {
      var _this$_component;
      // Make sure to get the scrollable node for components that implement
      // `ScrollResponder.Mixin`.
      return (_this$_component = this._component) !== null && _this$_component !== void 0 && _this$_component.getScrollableNode ? this._component.getScrollableNode() : this._component;
    }
    _attachNativeEvents() {
      const node = this._getEventViewRef();
      let viewTag = null; // We set it only if needed

      for (const key in this.props) {
        const prop = this.props[key];
        if (has('current', prop) && prop.current instanceof WorkletEventHandler) {
          if (viewTag === null) {
            viewTag = findNodeHandle(options !== null && options !== void 0 && options.setNativeProps ? this : node);
          }
          prop.current.registerForEvents(viewTag, key);
        }
      }
    }
    _detachNativeEvents() {
      for (const key in this.props) {
        const prop = this.props[key];
        if (has('current', prop) && prop.current instanceof WorkletEventHandler) {
          prop.current.unregisterFromEvents();
        }
      }
    }
    _detachStyles() {
      if (Platform.OS === 'web' && this._styles !== null) {
        for (const style of this._styles) {
          if (style !== null && style !== void 0 && style.viewsRef) {
            style.viewsRef.remove(this);
          }
        }
      } else if (this._viewTag !== -1 && this._styles !== null) {
        var _this$props$animatedP;
        for (const style of this._styles) {
          style.viewDescriptors.remove(this._viewTag);
        }
        if ((_this$props$animatedP = this.props.animatedProps) !== null && _this$props$animatedP !== void 0 && _this$props$animatedP.viewDescriptors) {
          this.props.animatedProps.viewDescriptors.remove(this._viewTag);
        }
        if (global._IS_FABRIC) {
          const viewTag = this._viewTag;
          runOnUI(() => {
            _removeShadowNodeFromRegistry(viewTag);
          })();
        }
      }
    }
    _reattachNativeEvents(prevProps) {
      for (const key in prevProps) {
        const prop = this.props[key];
        if (has('current', prop) && prop.current instanceof WorkletEventHandler && prop.current.reattachNeeded) {
          prop.current.unregisterFromEvents();
        }
      }
      let viewTag = null;
      for (const key in this.props) {
        const prop = this.props[key];
        if (has('current', prop) && prop.current instanceof WorkletEventHandler && prop.current.reattachNeeded) {
          if (viewTag === null) {
            const node = this._getEventViewRef();
            viewTag = findNodeHandle(options !== null && options !== void 0 && options.setNativeProps ? this : node);
          }
          prop.current.registerForEvents(viewTag, key);
          prop.current.reattachNeeded = false;
        }
      }
    }
    _updateFromNative(props) {
      if (options !== null && options !== void 0 && options.setNativeProps) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        options.setNativeProps(this._component, props);
      } else {
        var _this$_component2, _this$_component2$set;
        // eslint-disable-next-line no-unused-expressions
        (_this$_component2 = this._component) === null || _this$_component2 === void 0 ? void 0 : (_this$_component2$set = _this$_component2.setNativeProps) === null || _this$_component2$set === void 0 ? void 0 : _this$_component2$set.call(_this$_component2, props);
      }
    }
    _getViewInfo() {
      var _this$_component3;
      let viewTag;
      let viewName;
      let shadowNodeWrapper = null;
      let viewConfig;
      // Component can specify ref which should be animated when animated version of the component is created.
      // Otherwise, we animate the component itself.
      const component = (_this$_component3 = this._component) !== null && _this$_component3 !== void 0 && _this$_component3.getAnimatableRef ? this._component.getAnimatableRef() : this;
      if (Platform.OS === 'web') {
        viewTag = findNodeHandle(component);
        viewName = null;
        shadowNodeWrapper = null;
        viewConfig = null;
      } else {
        var _hostInstance$viewCon;
        // hostInstance can be null for a component that doesn't render anything (render function returns null). Example: svg Stop: https://github.com/react-native-svg/react-native-svg/blob/develop/src/elements/Stop.tsx
        const hostInstance = RNRenderer.findHostInstance_DEPRECATED(component);
        if (!hostInstance) {
          throw new Error('Cannot find host instance for this component. Maybe it renders nothing?');
        }
        // we can access view tag in the same way it's accessed here https://github.com/facebook/react/blob/e3f4eb7272d4ca0ee49f27577156b57eeb07cf73/packages/react-native-renderer/src/ReactFabric.js#L146
        viewTag = hostInstance === null || hostInstance === void 0 ? void 0 : hostInstance._nativeTag;
        /**
         * RN uses viewConfig for components for storing different properties of the component(example: https://github.com/facebook/react-native/blob/master/Libraries/Components/ScrollView/ScrollViewViewConfig.js#L16).
         * The name we're looking for is in the field named uiViewClassName.
         */
        viewName = hostInstance === null || hostInstance === void 0 ? void 0 : (_hostInstance$viewCon = hostInstance.viewConfig) === null || _hostInstance$viewCon === void 0 ? void 0 : _hostInstance$viewCon.uiViewClassName;
        viewConfig = hostInstance === null || hostInstance === void 0 ? void 0 : hostInstance.viewConfig;
        if (global._IS_FABRIC) {
          shadowNodeWrapper = getShadowNodeWrapperFromRef(this);
        }
      }
      return {
        viewTag,
        viewName,
        shadowNodeWrapper,
        viewConfig
      };
    }
    _attachAnimatedStyles() {
      var _this$props$animatedP2, _this$props$animatedP3;
      const styles = this.props.style ? onlyAnimatedStyles(flattenArray(this.props.style)) : [];
      const prevStyles = this._styles;
      this._styles = styles;
      const prevAnimatedProps = this._animatedProps;
      this._animatedProps = this.props.animatedProps;
      const {
        viewTag,
        viewName,
        shadowNodeWrapper,
        viewConfig
      } = this._getViewInfo();

      // update UI props whitelist for this view
      const hasReanimated2Props = ((_this$props$animatedP2 = this.props.animatedProps) === null || _this$props$animatedP2 === void 0 ? void 0 : _this$props$animatedP2.viewDescriptors) || styles.length;
      if (hasReanimated2Props && viewConfig) {
        adaptViewConfig(viewConfig);
      }
      this._viewTag = viewTag;

      // remove old styles
      if (prevStyles) {
        // in most of the cases, views have only a single animated style and it remains unchanged
        const hasOneSameStyle = styles.length === 1 && prevStyles.length === 1 && isSameAnimatedStyle(styles[0], prevStyles[0]);
        if (!hasOneSameStyle) {
          // otherwise, remove each style that is not present in new styles
          for (const prevStyle of prevStyles) {
            const isPresent = styles.some(style => isSameAnimatedStyle(style, prevStyle));
            if (!isPresent) {
              prevStyle.viewDescriptors.remove(viewTag);
            }
          }
        }
      }
      styles.forEach(style => {
        style.viewDescriptors.add({
          tag: viewTag,
          name: viewName,
          shadowNodeWrapper
        });
        if (isJest()) {
          /**
           * We need to connect Jest's TestObject instance whose contains just props object
           * with the updateProps() function where we update the properties of the component.
           * We can't update props object directly because TestObject contains a copy of props - look at render function:
           * const props = this._filterNonAnimatedProps(this.props);
           */
          this.animatedStyle.value = {
            ...this.animatedStyle.value,
            ...style.initial.value
          };
          style.animatedStyle.current = this.animatedStyle;
        }
      });

      // detach old animatedProps
      if (prevAnimatedProps && !isSameAnimatedProps(prevAnimatedProps, this.props.animatedProps)) {
        prevAnimatedProps.viewDescriptors.remove(viewTag);
      }

      // attach animatedProps property
      if ((_this$props$animatedP3 = this.props.animatedProps) !== null && _this$props$animatedP3 !== void 0 && _this$props$animatedP3.viewDescriptors) {
        this.props.animatedProps.viewDescriptors.add({
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          tag: viewTag,
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          name: viewName,
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          shadowNodeWrapper: shadowNodeWrapper
        });
      }
    }
    _attachInlineProps() {
      const newInlineProps = extractSharedValuesMapFromProps(this.props);
      const hasChanged = inlinePropsHasChanged(newInlineProps, this._inlineProps);
      if (hasChanged) {
        if (!this._inlinePropsViewDescriptors) {
          this._inlinePropsViewDescriptors = makeViewDescriptorsSet();
          const {
            viewTag,
            viewName,
            shadowNodeWrapper,
            viewConfig
          } = this._getViewInfo();
          if (Object.keys(newInlineProps).length && viewConfig) {
            adaptViewConfig(viewConfig);
          }
          this._inlinePropsViewDescriptors.add({
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            tag: viewTag,
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            name: viewName,
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            shadowNodeWrapper: shadowNodeWrapper
          });
        }
        const sharableViewDescriptors = this._inlinePropsViewDescriptors.sharableViewDescriptors;
        const maybeViewRef = NativeReanimatedModule.native ? undefined : {
          items: new Set([this])
        }; // see makeViewsRefSet

        const updaterFunction = () => {
          'worklet';

          const update = getInlinePropsUpdate(newInlineProps);
          updateProps(sharableViewDescriptors, update, maybeViewRef);
        };
        this._inlineProps = newInlineProps;
        if (this._inlinePropsMapperId) {
          stopMapper(this._inlinePropsMapperId);
        }
        this._inlinePropsMapperId = null;
        if (Object.keys(newInlineProps).length) {
          this._inlinePropsMapperId = startMapper(updaterFunction, Object.values(newInlineProps));
        }
      }
    }
    _detachInlineProps() {
      if (this._inlinePropsMapperId) {
        stopMapper(this._inlinePropsMapperId);
      }
    }
    componentDidUpdate(prevProps) {
      this._reattachNativeEvents(prevProps);
      this._attachAnimatedStyles();
      this._attachInlineProps();
    }
    _filterNonAnimatedProps(inputProps) {
      const props = {};
      for (const key in inputProps) {
        const value = inputProps[key];
        if (key === 'style') {
          const styleProp = inputProps.style;
          const styles = flattenArray(styleProp ?? []);
          const processedStyle = styles.map(style => {
            if (style && style.viewDescriptors) {
              // this is how we recognize styles returned by useAnimatedStyle
              style.viewsRef.add(this);
              if (this._isFirstRender) {
                this.initialStyle = {
                  ...style.initial.value,
                  ...initialUpdaterRun(style.initial.updater)
                };
              }
              return this.initialStyle;
            } else if (hasInlineStyles(style)) {
              if (this._isFirstRender) {
                return getInlinePropsUpdate(style);
              }
              const newStyle = {};
              for (const [key, styleValue] of Object.entries(style)) {
                if (!isSharedValue(styleValue) && !(key === 'transform' && isInlineStyleTransform(styleValue))) {
                  newStyle[key] = styleValue;
                }
              }
              return newStyle;
            } else {
              return style;
            }
          });
          props[key] = StyleSheet.flatten(processedStyle);
        } else if (key === 'animatedProps') {
          const animatedProp = inputProps.animatedProps;
          if (animatedProp.initial !== undefined) {
            Object.keys(animatedProp.initial.value).forEach(key => {
              var _animatedProp$initial, _animatedProp$viewsRe;
              props[key] = (_animatedProp$initial = animatedProp.initial) === null || _animatedProp$initial === void 0 ? void 0 : _animatedProp$initial.value[key];
              (_animatedProp$viewsRe = animatedProp.viewsRef) === null || _animatedProp$viewsRe === void 0 ? void 0 : _animatedProp$viewsRe.add(this);
            });
          }
        } else if (has('current', value) && value.current instanceof WorkletEventHandler) {
          if (value.current.eventNames.length > 0) {
            value.current.eventNames.forEach(eventName => {
              props[eventName] = has('listeners', value.current) ? value.current.listeners[eventName] : dummyListener;
            });
          } else {
            props[key] = dummyListener;
          }
        } else if (isSharedValue(value)) {
          if (this._isFirstRender) {
            props[key] = value.value;
          }
        } else if (key !== 'onGestureHandlerStateChange' || !isChromeDebugger()) {
          props[key] = value;
        }
      }
      return props;
    }
    render() {
      const props = this._filterNonAnimatedProps(this.props);
      if (isJest()) {
        props.animatedStyle = this.animatedStyle;
      }
      if (this._isFirstRender) {
        this._isFirstRender = false;
      }
      const platformProps = Platform.select({
        web: {},
        default: {
          collapsable: false
        }
      });
      return /*#__PURE__*/React.createElement(Component, _extends({}, props, {
        ref: this._setComponentRef
      }, platformProps));
    }
  }
  _defineProperty(AnimatedComponent, "displayName", void 0);
  AnimatedComponent.displayName = `AnimatedComponent(${Component.displayName || Component.name || 'Component'})`;
  return /*#__PURE__*/React.forwardRef((props, ref) => {
    return /*#__PURE__*/React.createElement(AnimatedComponent, _extends({}, props, ref === null ? null : {
      forwardedRef: ref
    }));
  });
}
//# sourceMappingURL=createAnimatedComponent.js.map