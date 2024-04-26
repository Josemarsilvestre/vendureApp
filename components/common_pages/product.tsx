import React, { useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Pressable,
  StyleSheet,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Icons from "../common/Icons";
import ImageGallery from "../product/ImageGallery";
import Info from "../product/Info";
import FreeShipping from "../product/FreeShipping";
import Description from "../product/Description";
import Specification from "../product/Specification";
import Banner from "../tab_home/Banner";
import { GET_BANNER_1_QUERY } from "../../src/api/home";
import ProductPrice from "../product/ProductPrice";
//import Reviews from "./Reviews";
//import AddToCartOperation from "./AddToCartOperation";

export default function ProductScreen({ route, navigation }) {
  const { product } = route.params;

  useEffect(() => {
    navigation.setOptions({
      title: product.name || "Products",
    });
  }, [product]);

  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom },
        ]}
      >
        <View style={styles.content}>
          <ImageGallery product={product} />
          <Text style={styles.title}>{product.name}</Text>
          <Text>{product.variants[0].sku}</Text>
          <View style={styles.divider} />

          <View style={styles.priceContainer}>
            <Text style={styles.header}>Price: </Text>
            <ProductPrice
              inStock={product.variants[0].stockLevel}
              price={product.variants[0].priceWithTax}
              singleProduct={true}
            />
          </View>

          <View style={styles.infoContainer}>
            <Info />
            <FreeShipping />
          </View>
          <Description product={product} />
          <Banner
            navigation={navigation}
            query={GET_BANNER_1_QUERY}
            title="Similar products"
          />
          <View style={styles.divider} />
          <Text style={styles.reviewText}>Recent reviews</Text>
        </View>
      </ScrollView>

      <Pressable style={styles.addToCartButton}>
        <Text style={styles.addToCartButtonText}>Add to cart</Text>
      </Pressable>

      <View style={styles.iconContainer}>
        <TouchableOpacity
          onPress={() => console.log("Navegar para Lista de Desejos")}
        >
          <Icons.Feather
            name="heart"
            size={28}
            color="#1F2937"
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: 16,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 16,
  },
  header: {
    marginRight: 5,
    fontWeight: "bold",
    fontSize: 16,
    color: "green",
  },
  priceContainer: {
    marginTop: -1,
    flexDirection: "row",
  },
  divider: {
    height: 2,
    backgroundColor: "lightgray",
    marginVertical: 8,
  },
  infoContainer: {
    marginBottom: 16,
  },
  sliderText: {
    marginTop: 16,
  },
  reviewText: {
    marginTop: 16,
  },
  addToCartButton: {
    position: "absolute",
    bottom: 28,
    left: 15,
    right: 80,
    zIndex: 10,
    backgroundColor: "#1F2937",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
  },
  addToCartButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  iconContainer: {
    position: "absolute",
    right: 16,
    bottom: 41,
    flexDirection: "row",
    zIndex: 10,
  },
  icon: {
    marginRight: 16,
  },
});
