import React, { useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

export default function CategorySectionScreen({ route, navigation }){
  const { categoryName } = route.params;

  useEffect(() => {
    navigation.setOptions({
      title: categoryName || 'Category',
    });
  }, [categoryName]);

  return (
    <ScrollView>
      <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: moderateScale(300) }}>
        <Text style={{ fontSize: moderateScale(16) }}>{categoryName}</Text>
      </View>
    </ScrollView>
  );
};
