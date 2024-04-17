import { useRef } from 'react';
import { makeMutable } from './core';
export function makeViewDescriptorsSet() {
  const sharableViewDescriptors = makeMutable([]);
  const data = {
    sharableViewDescriptors,
    add: item => {
      sharableViewDescriptors.modify(descriptors => {
        'worklet';

        const index = descriptors.findIndex(descriptor => descriptor.tag === item.tag);
        if (index !== -1) {
          descriptors[index] = item;
        } else {
          descriptors.push(item);
        }
        return descriptors;
      });
    },
    remove: viewTag => {
      sharableViewDescriptors.modify(descriptors => {
        'worklet';

        const index = descriptors.findIndex(descriptor => descriptor.tag === viewTag);
        if (index !== -1) {
          descriptors.splice(index, 1);
        }
        return descriptors;
      });
    }
  };
  return data;
}
export function makeViewsRefSet() {
  const ref = useRef(null);
  if (ref.current === null) {
    const data = {
      items: new Set(),
      add: item => {
        if (data.items.has(item)) return;
        data.items.add(item);
      },
      remove: item => {
        data.items.delete(item);
      }
    };
    ref.current = data;
  }
  return ref.current;
}
//# sourceMappingURL=ViewDescriptorsSet.js.map