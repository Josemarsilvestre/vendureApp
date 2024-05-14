import React from "react";
import {
  View,
  Image,
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
  Text,
} from "react-native";
import { FlashList } from "@shopify/flash-list";

import FeedSectionContainer from "../common/FeedSectionContainer";
import ProductPrice from "./ProductPrice";
import { Product } from "../../../utils/interface";

export interface SimilarProductsProps {
  navigation: any;
  items: {
    id: string;
    name: string;
    product: Product;
  }[];
  title: string;
}

const SimilarProducts: React.FC<SimilarProductsProps> = ({
  navigation,
  items,
  title,
}) => {
  const windowWidth = useWindowDimensions().width;
  const imageWidth = windowWidth * 0.7;
  const product = items.map((item) => item.product);

  return (
    <FeedSectionContainer title={title}>
      <FlashList
        data={product}
        renderItem={({ item, index }) => {
          const items_ = items[index];
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Products", {
                  products: items,
                  selectedIndex: index,
                  productVariantId: items_.id,
                });
              }}
            >
              <View
                style={[styles.imageContainer, { width: imageWidth }]}
                key={items_.id}
              >
                <Image
                  source={{ uri: item.featuredAsset.source || "" }}
                  style={styles.image}
                  resizeMode="cover"
                />
              </View>
              <View>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={styles.text}
                >
                  {items_.name}
                </Text>

                <View style={styles.priceContainer}>
                  <Text style={styles.priceText}>Price: </Text>
                  <ProductPrice price={item.variants[0].priceWithTax} />
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
        horizontal={true}
        estimatedItemSize={300}
        estimatedListSize={{ height: 170, width: 200 }}
        showsHorizontalScrollIndicator={false}
      />
    </FeedSectionContainer>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    height: "70%",
    marginRight: -98,
  },
  image: {
    width: "60%",
    height: "100%",
    borderRadius: 10,
  },
  text: {
    color: "#4d4d4d",
    maxWidth: 155,
    marginTop: 3,
    textAlign: "left",
  },
  priceText: {
    marginRight: 5,
    color: "#4d4d4d",
  },
  priceContainer: {
    marginTop: -1,
    flexDirection: "row",
  },
});

export default SimilarProducts;

/*import React from "react";
import {
  View,
  Image,
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
  Text,
} from "react-native";
import { FlashList } from "@shopify/flash-list";

import FeedSectionContainer from "../common/FeedSectionContainer";
import ProductPrice from "../product/ProductPrice";
import { Product } from "../../src/interface";

interface SimilarProductsProps {
  navigation: any;
  category: Category;
  title: string;
}

interface Category {
  productVariants: {
    items: {
      id: string;
      name: string;
      product: Product;
    }[];
  };
}

const SimilarProducts: React.FC<SimilarProductsProps> = ({
  navigation,
  category,
  title,
}) => {
  const windowWidth = useWindowDimensions().width;
  const imageWidth = windowWidth * 0.7;

  const products = category.productVariants.items.map((item) => item.product);

  return (
    <FeedSectionContainer title={title}>
      <FlashList
        data={products}
        renderItem={({ item, index }) => {
          const items_ = category.productVariants.items[index]

          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Products", {
                  products: category.productVariants.items,
                  selectedIndex: index,
                  productVariantId: items_.id,
                });
              }}
            >
              <View
                style={[styles.imageContainer, { width: imageWidth }]}
                key={items_.id}
              >
                <Image
                  source={{ uri: item.featuredAsset.source || "" }}
                  style={styles.image}
                  resizeMode="cover"
                />
              </View>
              <View>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={styles.text}
                >
                  {items_.name}
                </Text>

                <View style={styles.priceContainer}>
                  <Text style={styles.priceText}>Price: </Text>
                  <ProductPrice price={item.variants[0].priceWithTax} />
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
        horizontal={true}
        estimatedItemSize={300}
        estimatedListSize={{ height: 170, width: 200 }}
        showsHorizontalScrollIndicator={false}
      />
    </FeedSectionContainer>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    height: "70%",
    marginRight: -98,
  },
  image: {
    width: "60%",
    height: "100%",
    borderRadius: 10,
  },
  text: {
    color: "#4d4d4d",
    maxWidth: 155,
    marginTop: 3,
    textAlign: "left",
  },
  priceText: {
    marginRight: 5,
    color: "#4d4d4d",
  },
  priceContainer: {
    marginTop: -1,
    flexDirection: "row",
  },
});

export default SimilarProducts;
*/
