import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useQuery } from "@apollo/client";
import Swiper from 'react-native-swiper';
import { moderateScale } from 'react-native-size-matters';

import { GET_SLIDERS } from '../../api/mutation/home';

interface ProductVariant {
  product: {
    id: string;
    name: string;
    assets: {
      source: string;
    };
  };
}

export default function Slider(){

  const { data, loading, error } = useQuery<{ collection: { productVariants: { items: ProductVariant[] } } }>(GET_SLIDERS);

  const productVariants: ProductVariant[] = data?.collection?.productVariants?.items || [];

  if (loading || error || productVariants.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Swiper 
        style={styles.wrapper} 
        showsPagination={true} 
        activeDotColor="#1D4ED8" 
        dotColor="#E5E7EB"
        autoplay={true}
      >
        {productVariants.map((variant: ProductVariant) => (
          <View key={variant.product.id}>
            {variant.product.assets && (
              <Image
                source={{ uri: variant.product.assets[0].source }}
                style={styles.image}
                resizeMode="cover"
              />
            )}
          </View>
        ))}
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: moderateScale(6),
    borderRadius: moderateScale(10),
    overflow: 'hidden',
  },
  wrapper: {
    height: moderateScale(200),
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
