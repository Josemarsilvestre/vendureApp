import React from 'react';
import { View, ViewStyle, StyleSheet } from 'react-native';

import { Skeleton, Items, Item } from '../common/skeleton';
import { moderateScale } from 'react-native-size-matters';

interface ProductSkeletonProps {
  style?: ViewStyle;
}

const ProductSkeleton: React.FC<ProductSkeletonProps> = ({ style }) => {

  const heigth_ = moderateScale(24, 0.1);

  return (
    <View style={[styles.container, style]}>
      <Skeleton count={10}>
        <Items style={styles.itemContainer}>
          <Item
            height={moderateScale(84, 0.1)}
            width={moderateScale(78, 0.1)}
            animated="background"
            style={styles.image}
          />
          <View style={styles.textContainer}>
            <Item height={heigth_} width="100%" animated="background" />
            <Item height={heigth_} width="70%" animated="background" />
            <Item height={heigth_} width={moderateScale(28, 0.1)} animated="background" />
            <View style={styles.priceContainer}>
              <Item height={heigth_} width={moderateScale(40, 0.1)} animated="background" />
              <Item height={heigth_} width={moderateScale(40, 0.1)} animated="background" />
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
    marginBottom: moderateScale(24, 0.1),
  },
  image: {
    borderRadius: moderateScale(8, 0.1),
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
