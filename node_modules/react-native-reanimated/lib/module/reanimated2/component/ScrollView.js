function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React, { forwardRef } from 'react';
import { ScrollView } from 'react-native';
import createAnimatedComponent from '../../createAnimatedComponent';
import { useScrollViewOffset, useAnimatedRef } from '../hook';
const AnimatedScrollViewComponent = createAnimatedComponent(ScrollView);
const AnimatedScrollView = /*#__PURE__*/forwardRef((props, ref) => {
  const {
    scrollViewOffset,
    ...restProps
  } = props;
  const aref = ref === null ? useAnimatedRef() : ref;
  if (scrollViewOffset) {
    useScrollViewOffset(aref, scrollViewOffset);
  }
  return /*#__PURE__*/React.createElement(AnimatedScrollViewComponent, _extends({
    ref: aref
  }, restProps));
});
export default AnimatedScrollView;
//# sourceMappingURL=ScrollView.js.map