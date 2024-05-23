import React, { useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";

import ProductCard from "../../product/productCard/ProductCard";
//import SubCategories from "../tab_category/SubCategories";
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
      {/**<SubCategories category={category} navigation={navigation} /> */}

      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>All products</Text>

        <TouchableOpacity style={styles.filterContainer}>
          <Text style={styles.infoText}>Filter</Text>
          <Icons.AntDesign name="filter" size={24} color="#1F2937" />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <View style={styles.productsContainer}>
          <ProductCard category={category} navigation={navigation} />
        </View>
      </View>
    </View>
  );
}