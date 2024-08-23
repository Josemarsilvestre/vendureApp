import React from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import { FlashList } from "@shopify/flash-list";
import { useQuery } from "@apollo/client";
import FeedSectionContainer from "../common/FeedSectionContainer";
import ProductPrice from "./ProductPrice";
import { moderateScale } from "react-native-size-matters";
import PageLoading from "../loading/PageLoading";
import { ProductVariant } from "../../../utils/interface";
import { GET_SIMILAR_PRODUCTS } from "../../api/mutation/category";

export interface SimilarProductsProps {
  navigation: any;
  categoryID: string;
  title: string;
}

const SimilarProducts: React.FC<SimilarProductsProps> = ({
  navigation,
  categoryID,
  title,
}) => {

  const { data, loading, error } = useQuery(GET_SIMILAR_PRODUCTS, {
    variables: { id: parseInt(categoryID), take: 9},
  });

  if (loading) return <PageLoading />

  if (error) {
    console.error("Error fetching similar products:", error);
    return <Text>Error loading similar products!</Text>;
  }

  const similarProducts = data?.collection?.productVariants?.items || [];

  if (similarProducts.length === 0) {
    return <Text>No similar products found!</Text>;
  }

  return (
    <FeedSectionContainer title={title}>
      <FlashList
        data={similarProducts}
        renderItem={({ item, index }: { item: ProductVariant; index: number }) => {
          try {
            const items_ = data?.collection?.productVariants?.items?.[index];
            if (!items_) return null;

            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Products", {
                    products: data?.collection?.productVariants?.items,
                    selectedIndex: index,
                    productVariantId: items_?.id,
                    price: items_.priceWithTax,
                    categoryID: categoryID
                  });
                }}
              >
                <View
                  style={[styles.imageContainer, { width: moderateScale(250, 0.1) }]}
                  key={item.id}
                >
                  <Image
                    source={{ uri: item.product.featuredAsset.source || "" }}
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
                    {item.name}
                  </Text>

                  <View style={styles.priceContainer}>
                    <Text style={styles.priceText}>Price: </Text>
                    <ProductPrice price={item.priceWithTax} />
                  </View>
                </View>
              </TouchableOpacity>
            );
          } catch (err) {
            console.error("Error rendering item:", err);
            return null;
          }
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
    marginRight: moderateScale(-94, 0.1),
  },
  image: {
    width: "60%",
    height: "100%",
    borderRadius: moderateScale(10, 0.1),
  },
  text: {
    color: "#4d4d4d",
    maxWidth: moderateScale(155, 0.1),
    marginTop: moderateScale(3, 0.1),
    textAlign: "left",
  },
  priceText: {
    marginRight: moderateScale(5, 0.1),
    color: "#4d4d4d",
  },
  priceContainer: {
    marginTop: moderateScale(-1, 0.1),
    flexDirection: "row",
  },
});

export default SimilarProducts;
