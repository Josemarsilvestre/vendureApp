import NativeReanimatedModule from './NativeReanimated';
import { nativeShouldBeMock, shouldBeUseWeb, isWeb } from './PlatformChecker';
import { makeShareableCloneRecursive, makeShareable as makeShareableUnwrapped } from './shareables';
import { startMapper as startMapperUnwrapped } from './mappers';
import { makeMutable as makeMutableUnwrapped, makeRemote as makeRemoteUnwrapped } from './mutables';
import { initializeUIRuntime } from './initializers';
import { SensorContainer } from './SensorContainer';
export { stopMapper } from './mappers';
export { runOnJS, runOnUI } from './threads';
const testWorklet = () => {
  'worklet';
};
const throwUninitializedReanimatedException = () => {
  throw new Error("Failed to initialize react-native-reanimated library, make sure you followed installation steps here: https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/installation/ \n1) Make sure reanimated's babel plugin is installed in your babel.config.js (you should have 'react-native-reanimated/plugin' listed there - also see the above link for details) \n2) Make sure you reset build cache after updating the config, run: yarn start --reset-cache");
};
export const checkPluginState = function () {
  let throwError = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  if (!testWorklet.__workletHash && !shouldBeUseWeb()) {
    if (throwError) {
      throwUninitializedReanimatedException();
    }
    return false;
  }
  return true;
};
export const isConfigured = function () {
  let throwError = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  return checkPluginState(throwError);
};
export const isConfiguredCheck = () => {
  checkPluginState(true);
};
const configurationCheckWrapper = __DEV__ ? fn => {
  return function () {
    isConfigured(true);
    return fn(...arguments);
  };
} : fn => fn;
export const startMapper = __DEV__ ? configurationCheckWrapper(startMapperUnwrapped) : startMapperUnwrapped;
export const makeShareable = __DEV__ ? configurationCheckWrapper(makeShareableUnwrapped) : makeShareableUnwrapped;
export const makeMutable = __DEV__ ? configurationCheckWrapper(makeMutableUnwrapped) : makeMutableUnwrapped;
export const makeRemote = __DEV__ ? configurationCheckWrapper(makeRemoteUnwrapped) : makeRemoteUnwrapped;
global._WORKLET = false;
global._log = function (s) {
  console.log(s);
};
export function getViewProp(viewTag, propName) {
  if (global._IS_FABRIC) {
    throw new Error('[react-native-reanimated] `getViewProp` is not supported on Fabric yet');
  }
  return new Promise((resolve, reject) => {
    return NativeReanimatedModule.getViewProp(viewTag, propName, result => {
      if (typeof result === 'string' && result.substr(0, 6) === 'error:') {
        reject(result);
      } else {
        resolve(result);
      }
    });
  });
}
export function getSensorContainer() {
  if (!global.__sensorContainer) {
    global.__sensorContainer = new SensorContainer();
  }
  return global.__sensorContainer;
}
export function registerEventHandler(eventHash, eventHandler) {
  function handleAndFlushAnimationFrame(eventTimestamp, event) {
    'worklet';

    global.__frameTimestamp = eventTimestamp;
    eventHandler(event);
    global.__flushAnimationFrame(eventTimestamp);
    global.__frameTimestamp = undefined;
  }
  return NativeReanimatedModule.registerEventHandler(eventHash, makeShareableCloneRecursive(handleAndFlushAnimationFrame));
}
export function unregisterEventHandler(id) {
  return NativeReanimatedModule.unregisterEventHandler(id);
}
export function subscribeForKeyboardEvents(eventHandler, options) {
  // TODO: this should really go with the same code path as other events, that is
  // via registerEventHandler. For now we are copying the code from there.
  function handleAndFlushAnimationFrame(state, height) {
    'worklet';

    const now = performance.now();
    global.__frameTimestamp = now;
    eventHandler(state, height);
    global.__flushAnimationFrame(now);
    global.__frameTimestamp = undefined;
  }
  return NativeReanimatedModule.subscribeForKeyboardEvents(makeShareableCloneRecursive(handleAndFlushAnimationFrame), options.isStatusBarTranslucentAndroid ?? false);
}
export function unsubscribeFromKeyboardEvents(listenerId) {
  return NativeReanimatedModule.unsubscribeFromKeyboardEvents(listenerId);
}
export function registerSensor(sensorType, config, eventHandler) {
  const sensorContainer = getSensorContainer();
  return sensorContainer.registerSensor(sensorType, config, makeShareableCloneRecursive(eventHandler));
}
export function initializeSensor(sensorType, config) {
  const sensorContainer = getSensorContainer();
  return sensorContainer.initializeSensor(sensorType, config);
}
export function unregisterSensor(sensorId) {
  const sensorContainer = getSensorContainer();
  return sensorContainer.unregisterSensor(sensorId);
}

// initialize UI runtime if applicable
if (!isWeb() && isConfigured()) {
  initializeUIRuntime();
}
let featuresConfig = {
  enableLayoutAnimations: false,
  setByUser: false
};
export function enableLayoutAnimations(flag) {
  let isCallByUser = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  if (isCallByUser) {
    featuresConfig = {
      enableLayoutAnimations: flag,
      setByUser: true
    };
    NativeReanimatedModule.enableLayoutAnimations(flag);
  } else if (!featuresConfig.setByUser && featuresConfig.enableLayoutAnimations !== flag) {
    featuresConfig.enableLayoutAnimations = flag;
    NativeReanimatedModule.enableLayoutAnimations(flag);
  }
}
export function configureLayoutAnimations(viewTag, type, config) {
  let sharedTransitionTag = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
  NativeReanimatedModule.configureLayoutAnimation(viewTag, type, sharedTransitionTag, makeShareableCloneRecursive(config));
}
export function configureProps(uiProps, nativeProps) {
  if (!nativeShouldBeMock()) {
    NativeReanimatedModule.configureProps(uiProps, nativeProps);
  }
}
//# sourceMappingURL=core.js.map