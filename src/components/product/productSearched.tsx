import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useQuery, useMutation } from "@apollo/client";

import Icons from "../common/Icons";
import ImageGallery from "./ImageGallery";
import Info from "./Info";
import FreeShipping from "./FreeShipping";
import Description from "./Description";
import ProductPrice from "./ProductPrice";
import { PRODUCT_SEARCHED_QUERY } from "../../api/mutation/search";
import { ADD_TO_CART, SHOW_ORDER } from "../../api/mutation/order";
import styles from "../common_pages/product/styles.product";
import PageLoading from "../loading/PageLoading";
import SimilarProducts from "./Similarproducts";
import { moderateScale } from "react-native-size-matters";

export default function ProductSearchedScreen({ route, navigation }) {
  const { productId, productVariantID, name, price, categoryID } = route.params;
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
    if (!loading && !error && data && data.product) {
      navigation.setOptions({
        title: data.product.name || "Loading...",
      });
    }

    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: 0, animated: true });
    }
  }, [navigation, scrollViewRef, data, loading, error]);

  if (error || !data || !data.product) {
    return <Text>Error: Product not found!</Text>;
  }

  const product = data.product;

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

  if (loading) return <PageLoading />;

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: moderateScale(31, 0.1) - 50 },
        ]}
      >
        <View style={styles.content}>
          <ImageGallery product={product.featuredAsset.source} />
          <Text style={styles.title}>{name}</Text>
          <Text>{product.variants[0].sku}</Text>
          <View style={styles.divider} />

          <View style={styles.priceContainer}>
            <Text style={styles.header}>Price: </Text>
            <ProductPrice price={price} />
          </View>

          <View style={styles.infoContainer}>
            <Info />
            <FreeShipping />
          </View>
          <Description product={product} />
          <SimilarProducts
            navigation={navigation}
            categoryID={categoryID}
            title="Similar products"
          />
          {/**<View style={styles.divider} />
          <Text style={styles.reviewText}>Recent reviews</Text> */}
        </View>
      </ScrollView>

      <View style={[styles.bottomContainer, { paddingBottom: moderateScale(31, 0.1) }]}>
        {addedToCartMap[productVariantID] ? (
          <TouchableOpacity style={styles.addedButton} disabled>
            <Text style={styles.addToCartButtonText}>Added to cart</Text>
            <Icons.Feather
              name="shopping-cart"
              size={moderateScale(22, 0.1)}
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
              size={moderateScale(22, 0.1)}
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
              size={moderateScale(28, 0.1)}
              color="#1F2937"
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
