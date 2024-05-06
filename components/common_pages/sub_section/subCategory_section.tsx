import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import SubProductCard from "./subProductCard";
import Icons from "../../common/Icons";

export default function SubCategorySectionScreen({ route, navigation }) {
  const { category, subcategory } = route.params;

  useEffect(() => {
    navigation.setOptions({
      title: subcategory.name || "SubCategory",
    });
  }, [category]);

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Todos os produtos</Text>

        <TouchableOpacity style={styles.filterContainer}>
          <Text style={styles.infoText}>Filtrar</Text>
          <Icons.AntDesign name="filter" size={24} color="#1F2937" />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <View style={styles.productsContainer}>
          <SubProductCard category={category} navigation={navigation} />
        </View>
      </View>
    </View>
  );
}

/**<SubCategories category={category} navigation={navigation} />

      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Todos os produtos</Text>

        <TouchableOpacity style={styles.filterContainer}>
          <Text style={styles.infoText}>Filtrar</Text>
          <Icons.AntDesign name="filter" size={24} color="#1F2937" />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <View style={styles.productsContainer}>
          <ProductCard category={category} navigation={navigation} />
        </View>
      </View> */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  content: {
    flex: 1,
    paddingHorizontal: 1,
  },
  productsContainer: {
    flex: 1,
    paddingVertical: 2,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 2,
    marginLeft: 10,
    marginRight: 5,
    marginTop: 10,
    borderBottomWidth: 2,
    borderBottomColor: "#E5E7EB",
  },
  infoText: {
    fontSize: 16,
    color: "#6B7280",
  },
  notFoundText: {
    textAlign: "center",
    color: "red",
  },
  divider: {
    height: 2,
    backgroundColor: "lightgray",
    marginVertical: 8,
  },
});
