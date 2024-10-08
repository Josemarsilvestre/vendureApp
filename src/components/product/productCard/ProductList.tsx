import React, { useState } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Text,
  Image
} from "react-native";
import { ProductCard as Product  } from "../../../../utils/interface";
import { moderateScale } from "react-native-size-matters";
import { useMutation } from "@apollo/client";

import Icons from "../../common/Icons";
import ProductPrice from "../ProductPrice";
import styles from "./style/style.productCard";
import styles2 from "../../common_pages/category/styles.category";
import { ADD_TO_CART } from "../../../api/mutation/order";

interface ProductListProps {
  products: Product[];
  data: any;
  navigation: any;
  scrollViewRef: React.MutableRefObject<FlatList<Product> | null>;
  loading: boolean;
  handleLoadMore: () => void;
  refetch: any;
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  data,
  navigation,
  scrollViewRef,
  loading,
  handleLoadMore,
  refetch
}) => {
  const handleScrollToTop = () => {
    scrollViewRef.current?.scrollToOffset({ offset: 0, animated: true });
  };

  const [addedToCartMap, setAddedToCartMap] = useState<{ [key: string]: boolean }>({});
  const [addToCart] = useMutation(ADD_TO_CART);

  const handleAddToCart = (itemId: string) => {
    addToCart({ variables: { id_: itemId, quantity_: 1 } });
    refetch();

    setAddedToCartMap((prevState) => ({
      ...prevState,
      [String(itemId)]: true,
    }));

    setTimeout(() => {
      setAddedToCartMap((prevState) => ({
        ...prevState,
        [String(itemId)]: false,
      }));
    }, 3000);
  };

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
                <View style={[styles.imageContainer, { width: moderateScale(250, 0.1) }]}>
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
                        size={addedToCartMap[items_.id] ? moderateScale(14, 0.1) : moderateScale(14, 0.1)}
                        style={styles.addButtonIcon}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
        ListHeaderComponent={<View style={{ height: moderateScale(1, 0.1) }} />}
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
          bottom: moderateScale(20, 0.1),
          right: moderateScale(20, 0.1),
        }}
      >
        <Icons.FontAwesome5
          name="arrow-alt-circle-up"
          size={moderateScale(35, 0.1)}
          color="#8498b9"
        />
      </TouchableOpacity>
    </View>
  );
};

export default ProductList;
