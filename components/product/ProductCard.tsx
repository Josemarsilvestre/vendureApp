import React from "react";
import {
  Image,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions
} from "react-native";
import { FlashList } from "@shopify/flash-list";
import { moderateScale } from "react-native-size-matters";

import ProductPrice from "./ProductPrice";
import Icons from "../common/Icons";
import { Product } from "../../src/interface";
import { Button } from "../common/Buttons";

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
                selectedIndex: index
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
                <View style={styles.priceContainer}>
                  {item.variants[0].stockLevel !== 0 ? (
                    <ProductPrice price={item.variants[0].priceWithTax} />
                  ) : (
                    <Text style={styles.notAvailableText}>Não disponível</Text>
                  )}
                </View>
                <View style={styles.AddContainer}>
                  <Button style={styles.addButton}>
                    <Text style={styles.addButtonText}>Add to cart{' '}</Text>
                    <Icons.Feather
                      name="shopping-cart"
                      size={12}
                      style={styles.addButtonIcon}
                    />
                  </Button>
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
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: moderateScale(1),
  },
  addButtonText: {
    fontSize: 14,
    color: "#fff",
  },
  addButtonIcon: {
    color: "#F59E0B",
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 2
  },
  notAvailableText: {
    fontSize: 14,
    color: "#6B7280",
    height: 24,
  }
});

