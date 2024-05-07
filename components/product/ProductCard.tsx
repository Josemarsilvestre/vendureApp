import React from "react";
import {
  Image,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { FlashList } from "@shopify/flash-list";

import ProductPrice from "./ProductPrice";
import Icons from "../common/Icons";
import truncate from "../../utils/truncate";
import { Product } from "../../src/interface";

interface Category {
  productVariants: {
    items: {
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

  const products = category.productVariants.items.map((item) => item.product);

  return (
    <FlashList
      data={products}
      renderItem={({ item, index }: { item: Product; index: number }) => {
        return (
          <TouchableOpacity
            style={styles.container}
            onPress={() =>
              navigation.navigate("Products", {
                products: products,
                selectedIndex: index,
              })
            }
          >
            <View style={styles.cardContent} key={item.id}>
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
                  {item.name}
                </Text>
                <View style={styles.ratingContainer}>
                  <View style={styles.rating}>
                    <Text style={styles.ratingText}>Rate</Text>
                    <Icons.AntDesign
                      name="star"
                      size={16}
                      style={styles.starIcon}
                    />
                  </View>
                </View>
                <View style={styles.priceContainer}>
                  {item.variants[0].stockLevel !== 0 ? (
                    <ProductPrice
                      inStock={item.variants[0].stockLevel}
                      price={item.variants[0].priceWithTax}
                      singleProduct={true}
                    />
                  ) : (
                    <Text style={styles.notAvailableText}>Não disponível</Text>
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
    alig: "center",
    paddingHorizontal: 12,
    gap: 12,
  },
  imageContainer: {
    flex: 1,
    position: "relative",
  },
  image: {
    width: "70%",
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
  plusIcon: {
    width: 10,
    height: 10,
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
  ratingContainer: {
    flexDirection: "row",
    alig: "center",
    justifyContent: "flex-end",
  },
  rating: {
    flexDirection: "row",
    alig: "center",
  },
  ratingText: {
    fontSize: 14,
    color: "#6B7280",
  },
  starIcon: {
    color: "#F59E0B",
  },
  priceContainer: {
    flexDirection: "row",
    alig: "center",
    justifyContent: "flex-end",
  },
  notAvailableText: {
    fontSize: 14,
    color: "#6B7280",
    height: 24,
  },
});
