import React from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Text,
  Image,
  useWindowDimensions,
} from "react-native";
import { Product } from "../../../../utils/interface";
import { moderateScale } from "react-native-size-matters";
import { useQuery } from "@apollo/client";

import Icons from "../../common/Icons";
import ProductPrice from "../ProductPrice";
import { GET_PRODUCTS_BY_CATEGORY_QUERY } from "../../../api/mutation/category";
import styles from "./style/style.productCard";
import styles2 from "../../common_pages/category/styles.category";

interface ProductListProps {
  products: Product[];
  data: any;
  navigation: any;
  scrollViewRef: React.MutableRefObject<FlatList<Product> | null>;
  loading: boolean;
  handleLoadMore: () => void;
  handleAddToCart: (itemId: string) => void;
  addedToCartMap: { [key: string]: boolean };
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  data,
  navigation,
  scrollViewRef,
  loading,
  handleLoadMore,
  handleAddToCart,
  addedToCartMap
}) => {
  const handleScrollToTop = () => {
    scrollViewRef.current?.scrollToOffset({ offset: 0, animated: true });
  };

  const windowWidth = useWindowDimensions().width;
  const imageWidth = windowWidth * 0.7;

  return (
    <View style={styles2.productsContainer}>
      <FlatList
        ref={scrollViewRef}
        data={products}
        renderItem={({ item, index }) => {
          const items_ = data?.collection?.productVariants?.items?.[index];
          if (!items_) return null;

          return (
            <TouchableOpacity
              style={styles.container}
              onPress={() =>
                navigation.navigate("Products", {
                  products: data?.collection?.productVariants?.items,
                  selectedIndex: index,
                  productVariantId: items_?.id,
                  price: items_.priceWithTax,
                  categoryID: data?.collection?.id,
                })
              }
            >
              <View style={styles.cardContent} key={items_?.id}>
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
                      <ProductPrice price={items_.priceWithTax} />
                    ) : (
                      <Text style={styles.notAvailableText}>Not available</Text>
                    )}
                  </View>
                  <View style={styles.AddContainer}>
                    <TouchableOpacity
                      style={
                        addedToCartMap[items_.id]
                          ? styles.addedButton
                          : styles.addButton
                      }
                      onPress={() => handleAddToCart(String(items_.id))}
                    >
                      <Text style={styles.addButtonText}>
                        {addedToCartMap[items_.id]
                          ? "Added to cart "
                          : "Add to cart "}
                      </Text>
                      <Icons.Feather
                        name="shopping-cart"
                        size={addedToCartMap[items_.id] ? 14 : 14}
                        style={styles.addButtonIcon}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
        ListHeaderComponent={<View style={{ height: 1 }} />}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={
          <View style={{ alignItems: "center" }}>
            {loading ? (
              <ActivityIndicator size="large" />
            ) : (
              <TouchableOpacity onPress={handleLoadMore}>
                <Text
                  style={{
                    color: "#1F2937",
                    fontWeight: "bold",
                    paddingBottom: moderateScale(15),
                  }}
                >
                  Load More
                </Text>
              </TouchableOpacity>
            )}
          </View>
        }
      />
      <TouchableOpacity
        onPress={handleScrollToTop}
        style={{
          position: "absolute",
          bottom: moderateScale(20),
          right: moderateScale(20),
        }}
      >
        <Icons.FontAwesome5
          name="arrow-alt-circle-up"
          size={35}
          color="#8498b9"
        />
      </TouchableOpacity>
    </View>
  );
};

export default ProductList;
