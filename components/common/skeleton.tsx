import React from 'react';
import { View, StyleSheet, ViewStyle, DimensionValue } from 'react-native';

interface SkeletonProps {
  count: number;
  children: React.ReactNode;
}

const Skeleton: React.FC<SkeletonProps> = ({ count, children }) => {
  const arr = Array(count).fill('_');

  return (
    <>
      {arr.map((item, index) =>
        React.Children.map(children, child => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, { key: index });
          }

          return child;
        })
      )}
    </>
  );
};

interface ItemsProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

const Items: React.FC<ItemsProps> = ({ children, style }) => {
  return <View style={style}>{children}</View>;
};

interface ItemProps {
  height: DimensionValue;
  width: DimensionValue;
  animated?: 'background' | 'border';
  style?: ViewStyle;
  children?: React.ReactNode;
}

export const Item: React.FC<ItemProps> = ({ height, width, animated, style, children }) => {
  return (
    <View
      style={[
        styles.item,
        {
          height: height,
          width: width,
          backgroundColor:
            animated === 'background'
              ? 'red' // cor de fundo animada
              : 'white', // cor de fundo padrão
          borderRadius: 10,
          borderWidth: animated === 'border' ? 2 : 0, // borda animada
          borderColor: animated === 'border' ? 'red' : undefined, // cor da borda animada
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    marginBottom: 10,
  },
});

export default {
  Skeleton,
  Items,
  Item,
};
