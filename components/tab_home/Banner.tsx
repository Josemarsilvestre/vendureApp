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
import { useQuery } from "@apollo/client";

import FeedSectionContainer from "../common/FeedSectionContainer";
import ProductPrice from "../product/ProductPrice";
import { Product } from "../../src/interface";

export interface BannerProps {
  navigation: any;
  query: any;
  title: string;
}

const Banner: React.FC<BannerProps> = ({ navigation, query, title }) => {
  const { data, loading, error } = useQuery(query);

  const windowWidth = useWindowDimensions().width;
  const imageWidth = windowWidth * 0.7;

  if (loading || error) {
    return null;
  }

  const products: Product[] =
    data?.collection?.productVariants?.items?.map((item) => item.product) || [];

  return (
    <FeedSectionContainer title={title}>
      <FlashList
        data={products}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Products", { products, selectedIndex: index  });
            }}
          >
            <View
              style={[styles.imageContainer, { width: imageWidth }]}
              key={item.id}
            >
              <Image
                source={{ uri: item.featuredAsset.source || "" }}
                style={styles.image}
                resizeMode="cover"
              />
            </View>
            <View>
              <Text numberOfLines={1} ellipsizeMode="tail" style={styles.text}>
                {item.name}
              </Text>

              <View style={styles.priceContainer}>
                <Text style={styles.priceText}>Price: </Text>
                <ProductPrice
                  inStock={item.variants[0].stockLevel}
                  price={item.variants[0].priceWithTax}
                  singleProduct={true}
                />
              </View>
            </View>
          </TouchableOpacity>
        )}
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

export default Banner;
