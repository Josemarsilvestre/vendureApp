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
import { moderateScale } from "react-native-size-matters";
import Modal from "react-native-modal";
import Slider from "@react-native-community/slider";

import ProductPrice from "../ProductPrice";
import Icons from "../../common/Icons";
import { ProductCard as Product } from "../../../../utils/interface";
import { ADD_TO_CART } from "../../../api/mutation/order";
import { SHOW_ORDER } from "../../../api/mutation/order";
import styles from "./style/style.productCard";
import styles2 from "../../common_pages/category/styles.category";
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
  const [sortOrder, setSortOrder] = useState<{ priceWithTax?: "ASC" | "DESC" | undefined }>(
    { priceWithTax: undefined }
  );
  const [sortByPrice, setSortByPrice] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [priceRange, setPriceRange] = useState<{ start: number; end: number }>({
    start: 0,
    end: 1000,
  }); // Valores iniciais do intervalo de preço
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
        id: parseInt(categoryID),
        sort: sortOrder.priceWithTax ? sortOrder : undefined,
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
        sort: sortOrder.priceWithTax ? sortOrder : undefined,
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
                ...(fetchMoreResult.collection.productVariants?.items || []),
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

  const handleSortChange = () => {
    if (!sortByPrice) {
      setSortByPrice(true);
      setSortOrder({ priceWithTax: "ASC" });
    } else if (sortOrder.priceWithTax === "ASC") {
      setSortOrder({ priceWithTax: "DESC" });
    } else {
      setSortByPrice(false);
      setSortOrder({ priceWithTax: undefined });
    }
  };

  const handleFilterPress = () => {
    setModalVisible(true);
  };

  const applyPriceFilter = () => {
    setModalVisible(false);
    refetch({
      take,
      skip: 0,
      id: parseInt(categoryID),
      sort: sortOrder,
      filter: {
        price: {
          between: { start: priceRange.start, end: priceRange.end },
        },
      },
    });
  };

  useEffect(() => {
    if (sortByPrice) {
      refetch({
        take,
        skip: 0,
        id: parseInt(categoryID),
        sort: sortOrder,
      });
    } else {
      refetch();
    }
  }, [sortByPrice, sortOrder]);

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
    <View style={styles2.container}>
      <View style={styles2.infoContainer}>
        <Text style={styles2.infoText}>All products</Text>

        <TouchableOpacity
          style={styles2.filterContainer}
          onPress={handleSortChange}
        >
          <Text style={styles2.infoText}>Order by </Text>
          <Icons.MaterialCommunityIcons
            name={
              sortByPrice
                ? sortOrder.priceWithTax === "ASC"
                  ? "sort-ascending"
                  : "sort-descending"
                : "sort"
            }
            size={22}
            color="#1F2937"
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles2.filterContainer} onPress={handleFilterPress}>
          <Text style={styles2.infoText}>Filter</Text>
          <Icons.AntDesign name="filter" size={24} color="#1F2937" />
        </TouchableOpacity>
      </View>
      <View style={styles2.productsContainer}>
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
                    price: items_.priceWithTax,
                    categoryID: data?.collection?.id,
                  })
                }
              >
                <View style={styles.cardContent} key={items_?.id}>
                  <View
                    style={[styles.imageContainer, { width: imageWidth }]}
                  >
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
                        <Text style={styles.notAvailableText}>
                          Not available
                        </Text>
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

        {/* Modal para o filtro de preço */}
        <Modal
          isVisible={modalVisible}
          onBackdropPress={() => setModalVisible(false)}
          backdropOpacity={0.5}
          style={{
            margin: 0,
            justifyContent: "flex-end",
          }}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalHeaderText}>Price Range</Text>
                <TouchableOpacity
                  onPress={() => setModalVisible(false)}
                  style={styles.closeButton}
                >
                  <Icons.AntDesign name="close" size={24} color="#1F2937" />
                </TouchableOpacity>
              </View>
              <View style={styles.rangeContainer}>
                <Text style={styles.rangeText}>${priceRange.start}</Text>
                <Text style={styles.rangeText}>${priceRange.end}</Text>
              </View>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={1000}
                step={10}
                minimumTrackTintColor="#1F2937"
                maximumTrackTintColor="#CCCCCC"
                thumbTintColor="#1F2937"
                value={priceRange.end}
                onValueChange={(value) =>
                  setPriceRange({ ...priceRange, end: value })
                }
              />
              <TouchableOpacity
                onPress={applyPriceFilter}
                style={styles.applyButton}
              >
                <Text style={styles.applyButtonText}>Apply Filter</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
}