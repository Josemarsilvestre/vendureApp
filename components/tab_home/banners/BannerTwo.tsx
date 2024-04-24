import React from "react";
import { View, Image, StyleSheet, useWindowDimensions, TouchableOpacity, Text } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { useQuery } from "@apollo/client";

import FeedSectionContainer from "../../common/FeedSectionContainer";
import { GET_BANNER_2_QUERY } from "../../../src/api/home";

interface Product {
  id: string;
  name: string;
  featuredAsset: {
    source: string;
  };
}

export interface BannerProps {
  navigation: any;
}

const BannerTwo: React.FC<BannerProps> = ({ navigation }) => {
  const { data, loading, error } = useQuery(GET_BANNER_2_QUERY);

  const windowWidth = useWindowDimensions().width;
  const imageWidth = windowWidth * 0.7;

  if (loading || error) {
    return null;
  }

  const products: Product[] = data?.collection?.productVariants?.items?.map(item => item.product) || [];

  return (
    <FeedSectionContainer title="Recommended">
      <FlashList
        data={products}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Products", { productName: item.name });
            }}
          >
            <View style={[styles.imageContainer, { width: imageWidth }]} key={item.id}>
              <Image source={{ uri: item.featuredAsset.source || '' }} style={styles.image} />
            </View>
            <Text style={styles.text}>{item.name}</Text>
          </TouchableOpacity>
        )}
        horizontal={true}
        estimatedItemSize={300}
        estimatedListSize={{ height: 300, width: 200 }}
        showsHorizontalScrollIndicator={false}
      />
    </FeedSectionContainer>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    height: "90%",
    marginRight: -40,
  },
  image: {
    width: "80%",
    height: "100%",
    borderRadius: 10,
  },
  text: {
    color: "#4d4d4d",
    maxWidth: 200,
    marginTop: 3,
    textAlign: "center",
  },
});

export default BannerTwo;