import * as React from 'react';
import { maybeInitializeFabric } from '../init';
import GestureHandlerRootViewContext from '../GestureHandlerRootViewContext';
import GestureHandlerRootViewNativeComponent from '../specs/RNGestureHandlerRootViewNativeComponent';
export default function GestureHandlerRootView(props) {
  // try initialize fabric on the first render, at this point we can
  // reliably check if fabric is enabled (the function contains a flag
  // to make sure it's called only once)
  maybeInitializeFabric();
  return /*#__PURE__*/React.createElement(GestureHandlerRootViewContext.Provider, {
    value: true
  }, /*#__PURE__*/React.createElement(GestureHandlerRootViewNativeComponent, props));
}
//# sourceMappingURL=GestureHandlerRootView.android.js.map