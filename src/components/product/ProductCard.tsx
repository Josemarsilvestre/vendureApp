import React, { useState } from "react";
import {
  Image,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { FlashList } from "@shopify/flash-list";
import { moderateScale } from "react-native-size-matters";
import { useMutation, useQuery } from "@apollo/client";

import ProductPrice from "./ProductPrice";
import Icons from "../common/Icons";
import { Product } from "../../interface";
import { Button } from "../common/Buttons";
import { ADD_TO_CART } from "../../api/graphql/cart";
import { SHOW_ORDER } from "../../api/graphql/cart";

interface Category {
  productVariants: {
    items: {
      id: string;
      name: string;
      product: Product;
    }[];
  };
}

export default function ProductCard({
  category,
  navigation,
}: {
  category: Category;
  navigation: any;
}) {
  const windowWidth = useWindowDimensions().width;
  const imageWidth = windowWidth * 0.7;

  const [addedToCartMap, setAddedToCartMap] = useState<{
    [key: string]: boolean;
  }>(
    category.productVariants.items.reduce((acc, curr) => {
      acc[curr.id] = false;
      return acc;
    }, {})
  );
  const [addToCart] = useMutation(ADD_TO_CART);
  const { refetch } = useQuery(SHOW_ORDER);

  const products = category.productVariants.items.map((item) => item.product);

  const handleAddToCart = (itemId: string) => {
    addToCart({ variables: { id_: itemId, quantity_: 1 } });
    refetch();

    setAddedToCartMap((prevState) => ({
      ...prevState,
      [itemId]: true,
    }));

    setTimeout(() => {
      setAddedToCartMap((prevState) => ({
        ...prevState,
        [itemId]: false,
      }));
    }, 3000);
  };

  return (
    <FlashList
      data={products}
      renderItem={({ item, index }: { item: Product; index: number }) => {
        const items_ = category.productVariants.items[index];
        
        return (
          <TouchableOpacity
            style={styles.container}
            onPress={() =>
              navigation.navigate("Products", {
                products: category.productVariants.items,
                selectedIndex: index,
                productVariantId: items_.id,
              })
            }
          >
            <View style={styles.cardContent} key={items_.id}>
              <View style={[styles.imageContainer, { width: imageWidth }]}>
                <Image
                  source={{
                    uri: item.featuredAsset.source || "",
                  }}
                  style={styles.image}
                  resizeMode="cover"
                />
              </View>
              <View style={styles.infoContainer}>
                <Text
                  numberOfLines={2}
                  ellipsizeMode="tail"
                  style={styles.title}
                >
                  {items_.name}
                </Text>
                <View style={styles.priceContainer}>
                  {item.variants[0].stockLevel !== 0 ? (
                    <ProductPrice price={item.variants[0].priceWithTax} />
                  ) : (
                    <Text style={styles.notAvailableText}>Not available</Text>
                  )}
                </View>
                <View style={styles.AddContainer}>
                  {addedToCartMap[items_.id] ? (
                    <TouchableOpacity style={styles.addedButton} disabled>
                      <Text style={styles.addButtonText}>Added to cart </Text>
                      <Icons.Feather
                        name="shopping-cart"
                        size={14}
                        style={styles.addButtonIcon}
                      />
                    </TouchableOpacity>
                  ) : (
                    <Button
                      style={styles.addButton}
                      onPress={() => handleAddToCart(items_.id)}
                    >
                      <Text style={styles.addButtonText}>Add to cart </Text>
                      <Icons.Feather
                        name="shopping-cart"
                        size={12}
                        style={styles.addButtonIcon}
                      />
                    </Button>
                  )}
                </View>
              </View>
            </View>
          </TouchableOpacity>
        );
      }}
      estimatedItemSize={900}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    position: "relative",
    marginBottom: 9,
  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 10,
  },
  cardContent: {
    flexDirection: "row",
    paddingHorizontal: 12,
    gap: 12,
  },
  imageContainer: {
    flex: 1,
    position: "relative",
  },
  image: {
    width: "80%",
    height: "100%",
    borderRadius: 10,
  },
  colorContainer: {
    position: "absolute",
    bottom: 8,
    left: 8,
    flexDirection: "row",
    gap: 6,
  },
  color: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#D1D5DB",
  },
  infoContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  title: {
    fontSize: 16,
    color: "#374151",
    lineHeight: 17,
    height: 42,
    textAlign: "right",
  },
  AddContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 3,
  },
  addButton: {
    flexDirection: "row",
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(15),
    backgroundColor: "#334255",
    borderRadius: moderateScale(8),
    alignItems: "center",
    justifyContent: "center",
    marginBottom: moderateScale(1),
  },
  addButtonText: {
    fontSize: 14,
    color: "#fff",
  },
  addButtonIcon: {
    color: "#F59E0B",
  },
  addedButton: {
    flexDirection: "row",
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(15),
    backgroundColor: "green",
    borderRadius: moderateScale(8),
    alignItems: "center",
    justifyContent: "center",
    marginBottom: moderateScale(1),
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 2,
  },
  notAvailableText: {
    fontSize: 14,
    color: "#6B7280",
    height: 24,
  },
});
