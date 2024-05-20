import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useQuery, useMutation } from "@apollo/client";

import Icons from "../common/Icons";
import ImageGallery from "./ImageGallery";
import Info from "./Info";
import FreeShipping from "./FreeShipping";
import Description from "./Description";
import ProductPrice from "./ProductPrice";
import { PRODUCT_SEARCHED_QUERY } from "../../api/mutation/product";
import { ADD_TO_CART, SHOW_ORDER } from "../../api/mutation/cart";
import PageLoading from "../loading/PageLoading";

export default function ProductSearchedScreen({ route, navigation }) {
  const { productId, productVariantID } = route.params;
  const { data, loading, error } = useQuery(PRODUCT_SEARCHED_QUERY, {
    variables: { id: productId },
  });

  const [addedToCartMap, setAddedToCartMap] = useState<{
    [key: string]: boolean;
  }>({});

  const [addToCart] = useMutation(ADD_TO_CART, {
    variables: { id_: productVariantID, quantity_: 1 },
  });

  const { refetch } = useQuery(SHOW_ORDER);

  const insets = useSafeAreaInsets();
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (
      !loading &&
      !error &&
      data &&
      data.products &&
      data.products.items.length > 0
    ) {
      navigation.setOptions({
        title: data.products.items[0].name || "Loading...",
      });
    }

    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: 0, animated: true });
    }
  }, [navigation, scrollViewRef, data, loading, error]);

  if (error || !data || !data.products || data.products.items.length === 0) {
    return null;
  }

  const product = data.products.items[0];

  if (!product.featuredAsset || !product.featuredAsset.source) {
    return <Text>Error: Product image not found!</Text>;
  }

  const handleAddToCart = (productVariantID) => {
    addToCart({ variables: { id_: productVariantID, quantity_: 1 } });
    refetch();

    setAddedToCartMap((prevState) => ({
      ...prevState,
      [productVariantID]: true,
    }));

    setTimeout(() => {
      setAddedToCartMap((prevState) => ({
        ...prevState,
        [productVariantID]: false,
      }));
    }, 5000);
  };

  if(loading) return <PageLoading />

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
          <ImageGallery product={product.featuredAsset.source} />
          <Text style={styles.title}>{product.name}</Text>
          <Text>{product.variants[0].sku}</Text>
          <View style={styles.divider} />

          <View style={styles.priceContainer}>
            <Text style={styles.header}>Price: </Text>
            <ProductPrice price={product.variants[0].priceWithTax} />
          </View>

          <View style={styles.infoContainer}>
            <Info />
            <FreeShipping />
          </View>
          <Description product={product} />
          <Text style={styles.reviewText}>Recent reviews</Text>
        </View>
      </ScrollView>

      {addedToCartMap[productVariantID] ? (
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
          onPress={() => handleAddToCart(productVariantID)}
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
