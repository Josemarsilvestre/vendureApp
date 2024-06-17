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
import { Product } from "../../../utils/interface";
import { moderateScale } from "react-native-size-matters";

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
        renderItem={({ item, index }) => {
          const items_ = data?.collection?.productVariants?.items[index];
          const categoryID = data?.collection?.id;

          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Products", {
                  products: data?.collection?.productVariants?.items,
                  selectedIndex: index,
                  productVariantId: items_.id,
                  price: item.variants[0].priceWithTax,
                  categoryID: categoryID
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
    marginRight: moderateScale(-95),
  },
  image: {
    width: "60%",
    height: "100%",
    borderRadius: moderateScale(10),
  },
  text: {
    color: "#4d4d4d",
    maxWidth: moderateScale(155),
    marginTop: moderateScale(3),
    textAlign: "left",
  },
  priceText: {
    marginRight: moderateScale(5),
    color: "#4d4d4d",
  },
  priceContainer: {
    marginTop: moderateScale(-1),
    flexDirection: "row",
  },
});

export default Banner;
