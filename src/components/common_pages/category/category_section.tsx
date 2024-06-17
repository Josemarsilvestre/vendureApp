import React, { useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";

import ProductCard from "../../product/productCard/ProductCard";
import Icons from "../../common/Icons";
import styles from "./styles.category";

export default function CategorySectionScreen({ route, navigation }) {
  const { category } = route.params;

  useEffect(() => {
    navigation.setOptions({
      title: category.name || "Category",
    });
  }, [category]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.productsContainer}>
          <ProductCard categoryID={category.id} navigation={navigation} />
        </View>
      </View>
    </View>
  );
}
