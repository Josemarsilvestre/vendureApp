import NativeReanimatedModule from './NativeReanimated';
import { makeShareableCloneOnUIRecursive, makeShareableCloneRecursive, registerShareableMapping } from './shareables';
import { runOnUI } from './threads';
import { valueSetter } from './valueSetter';
export { stopMapper } from './mappers';
export function makeUIMutable(initial, syncDataHolder) {
  'worklet';

  const listeners = new Map();
  let value = initial;
  const self = {
    set value(newValue) {
      valueSetter(self, newValue);
    },
    get value() {
      return value;
    },
    /**
     * _value prop should only be accessed by the valueSetter implementation
     * which may make the decision about updating the mutable value depending
     * on the provided new value. All other places should only attempt to modify
     * the mutable by assigning to value prop directly.
     */
    set _value(newValue) {
      value = newValue;
      if (syncDataHolder) {
        _updateDataSynchronously(syncDataHolder, makeShareableCloneOnUIRecursive(newValue));
      }
      listeners.forEach(listener => {
        listener(newValue);
      });
    },
    get _value() {
      return value;
    },
    addListener: (id, listener) => {
      listeners.set(id, listener);
    },
    removeListener: id => {
      listeners.delete(id);
    },
    _animation: null,
    _isReanimatedSharedValue: true
  };
  return self;
}
export function makeMutable(initial) {
  let oneWayReadsOnly = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  let value = initial;
  let syncDataHolder;
  if (!oneWayReadsOnly && NativeReanimatedModule.native) {
    // updates are always synchronous when running on web or in Jest environment
    syncDataHolder = NativeReanimatedModule.makeSynchronizedDataHolder(makeShareableCloneRecursive(value));
    registerShareableMapping(syncDataHolder);
  }
  const handle = makeShareableCloneRecursive({
    __init: () => {
      'worklet';

      return makeUIMutable(initial, syncDataHolder);
    }
  });
  // listeners can only work on JS thread on Web and jest environments
  const listeners = NativeReanimatedModule.native ? undefined : new Map();
  const mutable = {
    set value(newValue) {
      if (NativeReanimatedModule.native) {
        runOnUI(() => {
          mutable.value = newValue;
        })();
      } else {
        valueSetter(mutable, newValue);
      }
    },
    get value() {
      if (syncDataHolder) {
        return NativeReanimatedModule.getDataSynchronously(syncDataHolder);
      }
      return value;
    },
    set _value(newValue) {
      if (NativeReanimatedModule.native) {
        throw new Error('Setting `_value` directly is only possible on the UI runtime');
      }
      value = newValue;
      listeners.forEach(listener => {
        listener(newValue);
      });
    },
    get _value() {
      if (NativeReanimatedModule.native) {
        throw new Error('Reading from `_value` directly is only possible on the UI runtime');
      }
      return value;
    },
    modify: modifier => {
      runOnUI(() => {
        mutable.value = modifier(mutable.value);
      })();
    },
    addListener: (id, listener) => {
      if (NativeReanimatedModule.native) {
        throw new Error('adding listeners is only possible on the UI runtime');
      }
      listeners.set(id, listener);
    },
    removeListener: id => {
      if (NativeReanimatedModule.native) {
        throw new Error('removing listeners is only possible on the UI runtime');
      }
      listeners.delete(id);
    },
    _isReanimatedSharedValue: true
  };
  registerShareableMapping(mutable, handle);
  return mutable;
}
export function makeRemote() {
  let initial = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const handle = makeShareableCloneRecursive({
    __init: () => {
      'worklet';

      return initial;
    }
  });
  registerShareableMapping(initial, handle);
  return initial;
}
//# sourceMappingURL=mutables.js.map