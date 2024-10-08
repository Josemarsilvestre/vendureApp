import React, { useEffect, useRef, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useMutation, useQuery } from "@apollo/client";

import Icons from "../../common/Icons";
import ImageGallery from "../../product/ImageGallery";
import Info from "../../product/Info";
import FreeShipping from "../../product/FreeShipping";
import Description from "../../product/Description";
import ProductPrice from "../../product/ProductPrice";
import Similarproducts from "../../product/Similarproducts";
import { ADD_TO_CART, SHOW_ORDER } from "../../../api/mutation/order";
import styles from "./styles.product";
import { moderateScale } from "react-native-size-matters";
//import Reviews from "./Reviews";
//import AddToCartOperation from "./AddToCartOperation";

export default function ProductScreen({ route, navigation }) {
  const { products, selectedIndex, productVariantId, price, categoryID } = route.params;
  const selectedProducts = products[selectedIndex];

  const insets = useSafeAreaInsets();
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    navigation.setOptions({
      title: selectedProducts.name || "Products",
    });

    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: 0, animated: true });
    }
  }, [selectedProducts]);

  const [addedToCartMap, setAddedToCartMap] = useState<{
    [key: string]: boolean;
  }>({});

  const [addToCart] = useMutation(ADD_TO_CART, {
    variables: { id_: productVariantId, quantity_: 1 },
  });
  
  const { refetch } = useQuery(SHOW_ORDER);

  const handleAddToCart = (product) => {
    addToCart({ variables: { id_: product.id, quantity_: 1 } });
    refetch();

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
          { paddingBottom: moderateScale(31, 0.1) - 50 },
        ]}
      >
        <View style={styles.content}>
          <ImageGallery
            product={selectedProducts?.product?.featuredAsset?.source}
          />
          <Text style={styles.title}>{selectedProducts?.name}</Text>
          <Text>{selectedProducts?.product?.variants[0]?.sku}</Text>
          <View style={styles.divider} />

          <View style={styles.priceContainer}>
            <Text style={styles.header}>Price: </Text>
            <ProductPrice
              price={price}
            />
          </View>

          <View style={styles.infoContainer}>
            <Info />
            <FreeShipping />
          </View>
          <Description product={selectedProducts?.product} />
          <Similarproducts
            navigation={navigation}
            categoryID={categoryID}
            title="Similar products"
          />
          {/** 
           * <View style={styles.divider} />
           * <Text style={styles.reviewText}>Recent reviews</Text>*/}
        </View>
      </ScrollView>
      <View style={[styles.bottomContainer, { paddingBottom: moderateScale(31, 0.1) }]}>
        <TouchableOpacity
          style={
            addedToCartMap[selectedProducts.id] ? styles.addedButton : styles.addToCartButton
          }
          onPress={() => handleAddToCart(selectedProducts)}
        >
          <Text style={styles.addToCartButtonText}>
            {addedToCartMap[selectedProducts.id] ? "Added to cart" : "Add to cart"}
          </Text>
          <Icons.Feather
            name="shopping-cart"
            size={moderateScale(22, 0.1)} 
            style={{ color: "#F59E0B" }}
          />
        </TouchableOpacity>
        <View style={styles.iconContainer}>
          <TouchableOpacity
            onPress={() => console.log("Navigate to Wishlist")}
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
