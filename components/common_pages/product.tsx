import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useMutation, useQuery } from "@apollo/client";

import Icons from "../common/Icons";
import ImageGallery from "../product/ImageGallery";
import Info from "../product/Info";
import FreeShipping from "../product/FreeShipping";
import Description from "../product/Description";
import ProductPrice from "../product/ProductPrice";
import Similarproducts from "../product/Similarproducts";
import { Product } from "../../src/interface";
import { ADD_TO_CART, SHOW_ORDER } from "../../src/api/graphql/cart";
//import Reviews from "./Reviews";
//import AddToCartOperation from "./AddToCartOperation";

export default function ProductScreen({ route, navigation }) {
  const { products, selectedIndex } = route.params;
  const selectedProduct = products[selectedIndex];

  const insets = useSafeAreaInsets();
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    navigation.setOptions({
      title: selectedProduct.name || "Products",
    });

    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: 0, animated: true });
    }
  }, [selectedProduct]);

  const [addedToCartMap, setAddedToCartMap] = useState<{
    [key: string]: boolean;
  }>({});
  const [addToCart, { loading, error }] = useMutation(ADD_TO_CART, {
    variables: { id_: selectedProduct.id, quantity_: 1 },
  });
  const { refetch } = useQuery(SHOW_ORDER);

  const handleAddToCart = (product: Product) => {
    addToCart({ variables: { id_: product.id, quantity_: 1 } });
    refetch()

    setAddedToCartMap((prevState) => ({
      ...prevState,
      [product.id]: true,
    }));

    setTimeout(() => {
      setAddedToCartMap((prevState) => ({
        ...prevState,
        [product.id]: false,
      }));
    }, 5000);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom },
        ]}
      >
        <View style={styles.content}>
          <ImageGallery product={selectedProduct.featuredAsset.source} />
          <Text style={styles.title}>{selectedProduct.name}</Text>
          <Text>{selectedProduct.variants[0].sku}</Text>
          <View style={styles.divider} />

          <View style={styles.priceContainer}>
            <Text style={styles.header}>Price: </Text>
            <ProductPrice price={selectedProduct.variants[0].priceWithTax} />
          </View>

          <View style={styles.infoContainer}>
            <Info />
            <FreeShipping />
          </View>
          <Description product={selectedProduct} />
          <Similarproducts
            navigation={navigation}
            products={products}
            title="Similar products"
          />
          <View style={styles.divider} />
          <Text style={styles.reviewText}>Recent reviews</Text>
        </View>
      </ScrollView>
      {addedToCartMap[selectedProduct.id] ? (
        <TouchableOpacity style={styles.addedButton} disabled>
          <Text style={styles.addToCartButtonText}>Added to cart</Text>
          <Icons.Feather
            name="shopping-cart"
            size={22}
            style={{ color: "#F59E0B" }}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={() => handleAddToCart(selectedProduct)}
        >
          <Text style={styles.addToCartButtonText}>Add to cart</Text>
          <Icons.Feather
            name="shopping-cart"
            size={22}
            style={{ color: "#F59E0B" }}
          />
        </TouchableOpacity>
      )}
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
    flexDirection: "row",
    position: "absolute",
    bottom: 28,
    left: 15,
    right: 80,
    backgroundColor: "#1F2937",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  addToCartButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 5,
  },
  addedButton: {
    backgroundColor: "green",
    flexDirection: "row",
    position: "absolute",
    bottom: 28,
    left: 15,
    right: 80,
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    position: "absolute",
    right: 16,
    bottom: 41,
    flexDirection: "row",
  },
  icon: {
    marginRight: 16,
  },
});
