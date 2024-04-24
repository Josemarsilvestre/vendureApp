import React, { useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

export default function ProductScreen({ route, navigation }) {
  const { productName } = route.params;

  useEffect(() => {
    navigation.setOptions({
      title: productName || 'Products',
    });
  }, [productName]);

  return (
    <ScrollView>
      <View style={{alignItems: "center", justifyContent: "center", marginTop: moderateScale(300)}}>
        <Text style={{ fontSize: moderateScale(16) }}>{productName}</Text>
      </View>
    </ScrollView>
  )
}