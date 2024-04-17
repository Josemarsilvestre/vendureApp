function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React, { forwardRef } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import ReanimatedView from './View';
import createAnimatedComponent from '../../createAnimatedComponent';
const AnimatedFlatList = createAnimatedComponent(FlatList);
const createCellRenderer = (itemLayoutAnimation, cellStyle) => {
  const cellRenderer = props => {
    return /*#__PURE__*/React.createElement(ReanimatedView, {
      layout: itemLayoutAnimation,
      onLayout: props.onLayout,
      style: cellStyle
    }, props.children);
  };
  return cellRenderer;
};
const ReanimatedFlatlist = /*#__PURE__*/forwardRef((props, ref) => {
  const {
    itemLayoutAnimation,
    ...restProps
  } = props;
  const cellStyle = restProps !== null && restProps !== void 0 && restProps.inverted ? restProps !== null && restProps !== void 0 && restProps.horizontal ? styles.horizontallyInverted : styles.verticallyInverted : undefined;
  const cellRenderer = React.useMemo(() => createCellRenderer(itemLayoutAnimation, cellStyle), [cellStyle]);
  return /*#__PURE__*/React.createElement(AnimatedFlatList, _extends({
    ref: ref
  }, restProps, {
    CellRendererComponent: cellRenderer
  }));
});
const styles = StyleSheet.create({
  verticallyInverted: {
    transform: [{
      scaleY: -1
    }]
  },
  horizontallyInverted: {
    transform: [{
      scaleX: -1
    }]
  }
});
export default ReanimatedFlatlist;
//# sourceMappingURL=FlatList.js.map