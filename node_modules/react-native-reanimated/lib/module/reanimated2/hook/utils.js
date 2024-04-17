import { useEffect, useRef } from 'react';
import { processColor } from '../Colors';
import { makeRemote } from '../core';
import { isWeb, isJest } from '../PlatformChecker';
import { colorProps } from '../UpdateProps';
import WorkletEventHandler from '../WorkletEventHandler';
export function useEvent(handler) {
  let eventNames = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  let rebuild = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  const initRef = useRef(null);
  if (initRef.current === null) {
    initRef.current = new WorkletEventHandler(handler, eventNames);
  } else if (rebuild) {
    initRef.current.updateWorklet(handler);
  }
  return initRef;
}
export function useHandler(handlers, dependencies) {
  const initRef = useRef(null);
  if (initRef.current === null) {
    initRef.current = {
      context: makeRemote({}),
      savedDependencies: []
    };
  }
  useEffect(() => {
    return () => {
      initRef.current = null;
    };
  }, []);
  const {
    context,
    savedDependencies
  } = initRef.current;
  dependencies = buildDependencies(dependencies, handlers);
  const doDependenciesDiffer = !areDependenciesEqual(dependencies, savedDependencies);
  initRef.current.savedDependencies = dependencies;
  const useWeb = isWeb() || isJest();
  return {
    context,
    doDependenciesDiffer,
    useWeb
  };
}

// builds one big hash from multiple worklets' hashes
export function buildWorkletsHash(handlers) {
  return Object.values(handlers).reduce((acc, worklet) =>
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  acc + worklet.__workletHash.toString(), '');
}

// builds dependencies array for gesture handlers
export function buildDependencies(dependencies, handlers) {
  const handlersList = Object.values(handlers).filter(handler => handler !== undefined);
  if (!dependencies) {
    dependencies = handlersList.map(handler => {
      return {
        workletHash: handler.__workletHash,
        closure: handler._closure
      };
    });
  } else {
    dependencies.push(buildWorkletsHash(handlersList));
  }
  return dependencies;
}

// this is supposed to work as useEffect comparison
export function areDependenciesEqual(nextDeps, prevDeps) {
  function is(x, y) {
    /* eslint-disable no-self-compare */
    return x === y && (x !== 0 || 1 / x === 1 / y) || x !== x && y !== y;
    /* eslint-enable no-self-compare */
  }

  const objectIs = typeof Object.is === 'function' ? Object.is : is;
  function areHookInputsEqual(nextDeps, prevDeps) {
    if (!nextDeps || !prevDeps || prevDeps.length !== nextDeps.length) {
      return false;
    }
    for (let i = 0; i < prevDeps.length; ++i) {
      if (!objectIs(nextDeps[i], prevDeps[i])) {
        return false;
      }
    }
    return true;
  }
  return areHookInputsEqual(nextDeps, prevDeps);
}
export function hasColorProps(updates) {
  const colorPropsSet = new Set(colorProps);
  for (const key in updates) {
    if (colorPropsSet.has(key)) {
      return true;
    }
  }
  return false;
}
export function parseColors(updates) {
  'worklet';

  for (const key in updates) {
    if (colorProps.indexOf(key) !== -1) {
      // value could be an animation in which case processColor will recognize it and will return undefined
      // -> in such a case we don't want to override style of that key
      const processedColor = processColor(updates[key]);
      if (processedColor !== undefined) {
        updates[key] = processedColor;
      }
    }
  }
}
export function isAnimated(prop) {
  'worklet';

  if (Array.isArray(prop)) {
    return prop.some(isAnimated);
  } else if (typeof prop === 'object') {
    if (prop.onFrame !== undefined) {
      return true;
    } else {
      return Object.values(prop).some(isAnimated);
    }
  }
  return false;
}
export function shallowEqual(a, b) {
  'worklet';

  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) {
    return false;
  }
  for (let i = 0; i < aKeys.length; i++) {
    if (a[aKeys[i]] !== b[aKeys[i]]) {
      return false;
    }
  }
  return true;
}
export const validateAnimatedStyles = styles => {
  'worklet';

  if (typeof styles !== 'object') {
    throw new Error(`useAnimatedStyle has to return an object, found ${typeof styles} instead`);
  } else if (Array.isArray(styles)) {
    throw new Error('useAnimatedStyle has to return an object and cannot return static styles combined with dynamic ones. Please do merging where a component receives props.');
  }
};
//# sourceMappingURL=utils.js.map