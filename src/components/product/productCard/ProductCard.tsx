import React, { useState, useRef, useEffect } from "react";
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  useWindowDimensions,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { useMutation, useQuery } from "@apollo/client";

import ProductPrice from "../ProductPrice";
import Icons from "../../common/Icons";
import { Product } from "../../../../utils/interface";
import { ADD_TO_CART } from "../../../api/mutation/order";
import { SHOW_ORDER } from "../../../api/mutation/order";
import styles from "./style/style.productCard";
import { moderateScale } from "react-native-size-matters";

import { GET_PRODUCTS_BY_CATEGORY_QUERY } from "../../../api/mutation/category";

export default function ProductCard({
  categoryID,
  navigation,
}: {
  categoryID: string;
  navigation: any;
}) {
  const windowWidth = useWindowDimensions().width;
  const imageWidth = windowWidth * 0.7;

  const [addedToCartMap, setAddedToCartMap] = useState<{
    [key: string]: boolean;
  }>({});

  const [addToCart] = useMutation(ADD_TO_CART);
  const { refetch } = useQuery(SHOW_ORDER);
  const [products, setProducts] = useState<Product[]>([]);
  const scrollViewRef = useRef<FlatList<Product>>(null);
  const take = 9;

  const { loading, data, fetchMore } = useQuery(
    GET_PRODUCTS_BY_CATEGORY_QUERY,
    {
      variables: {
        take,
        skip: 0,
        id: categoryID,
      },
      onCompleted: (data) => {
        if (data) {
          const initialProducts =
            data?.collection?.productVariants?.items?.map(
              (item: any) => item.product
            ) || [];
          setProducts(initialProducts);
        }
      },
    }
  );

  const handleAddToCart = (itemId) => {
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

  const handleLoadMore = () => {
    fetchMore({
      variables: {
        take,
        skip: products.length,
      },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        if (
          !fetchMoreResult ||
          !fetchMoreResult.collection ||
          !fetchMoreResult.collection.productVariants ||
          fetchMoreResult.collection.productVariants.items.length === 0
        ) {
          return prevResult;
        }

        const newProducts =
          fetchMoreResult.collection.productVariants.items.map(
            (item: any) => item.product
          ) || [];

        setProducts((prevProducts) => [...prevProducts, ...newProducts]);

        return {
          ...prevResult,
          collection: {
            ...prevResult.collection,
            productVariants: {
              ...prevResult.collection.productVariants,
              items: [
                ...prevResult.collection.productVariants.items,
                ...(fetchMoreResult.collection.productVariants
                  ?.items || []),
              ],
            },
          },
        };
      },
    }).catch((error) => {
      console.error("Erro:", error);
    });
  };

  const handleScrollToTop = () => {
    scrollViewRef.current?.scrollToOffset({ offset: 0, animated: true });
  };

  useEffect(() => {
    if (data) {
      const initialProducts =
        data?.collection?.productVariants?.items?.map(
          (item: any) => item.product
        ) || [];
      setProducts(initialProducts);
    }
  }, [data]);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        ref={scrollViewRef}
        data={products}
        renderItem={({ item, index }: { item: Product; index: number }) => {
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
                      <ProductPrice price={item.variants[0].priceWithTax} />
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
          color="#3b4d68"
        />
      </TouchableOpacity>
    </View>
  );
}
