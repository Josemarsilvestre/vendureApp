import React from 'react';
import { View, ViewStyle, StyleSheet } from 'react-native';

import { Skeleton, Items, Item } from '../common/skeleton';

interface ProductSkeletonProps {
  style?: ViewStyle;
}

const ProductSkeleton: React.FC<ProductSkeletonProps> = ({ style }) => {
  return (
    <View style={[styles.container, style]}>
      <Skeleton count={10}>
        <Items style={styles.itemContainer}>
          <Item
            height={84}
            width={78}
            animated="background"
            style={styles.image}
          />
          <View style={styles.textContainer}>
            <Item height={20} width="100%" animated="background" />
            <Item height={20} width="70%" animated="background" />
            <Item height={20} width={28} animated="background" />
            <View style={styles.priceContainer}>
              <Item height={20} width={40} animated="background" />
              <Item height={20} width={40} animated="background" />
            </View>
          </View>
        </Items>
      </Skeleton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  image: {
    borderRadius: 8,
  },
  textContainer: {
    flex: 1,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default ProductSkeleton;
