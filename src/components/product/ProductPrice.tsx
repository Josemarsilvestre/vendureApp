import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

import formatNumber from '../../../utils/formatNumber';

interface ProductPriceProps {
  price: number;
}

const ProductPrice: React.FC<ProductPriceProps> = ({ price }) => {
  return (
    <View style={[styles.container && styles.columnReverse]}>
      <View style={styles.priceContainer}>
        <Text style={styles.priceText}>
          {formatNumber(price)}
        </Text>
        <Text>€</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  columnReverse: {
    flexDirection: 'column-reverse',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceText: {
    fontSize: moderateScale(14),
    color: '#333'
  },
});

export default ProductPrice;
