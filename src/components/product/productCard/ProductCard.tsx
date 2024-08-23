import React, { useRef, useState } from "react";
import { View, TouchableOpacity, Text, FlatList } from "react-native";
import { useQuery } from "@apollo/client";

import ProductList from "./ProductList";
import ProductFilters from "./ProductFilters";
import { GET_PRODUCTS_BY_CATEGORY_QUERY } from "../../../api/mutation/category";
import styles2 from "../../common_pages/category/styles.category";
import { ProductCard as Product } from "../../../../utils/interface";
import Icons from "../../common/Icons";
import { moderateScale } from "react-native-size-matters";

export default function ProductCard({
  categoryID,
  navigation,
}: {
  categoryID: string;
  navigation: any;
}) {
  const [sortOrder, setSortOrder] = useState<"ASC" | "DESC" | undefined>(undefined);
  const [modalVisible, setModalVisible] = useState(false);
  const [priceRange, setPriceRange] = useState<{ start: number; end: number }>({ start: 0, end: 5000 });
  const [products, setProducts] = useState<Product[]>([]);
  const scrollViewRef = useRef<FlatList<Product>>(null);
  const take = 9;

  const { loading, data, fetchMore, refetch } = useQuery(GET_PRODUCTS_BY_CATEGORY_QUERY, {
    variables: {
      take,
      skip: 0,
      id: parseInt(categoryID),
      sort: sortOrder ? { priceWithTax: sortOrder } : undefined,
      priceStart: priceRange.start,
      priceEnd: priceRange.end * 100,
    },
    onCompleted: (data) => {
      const initialProducts = data?.collection?.productVariants?.items?.map((item: any) => item.product) || [];
      setProducts(initialProducts);
    },
  });

  const applyPriceFilter = (start: number, end: number) => {
    setModalVisible(false);
    refetch({
      take,
      skip: 0,
      id: parseInt(categoryID),
      sort: sortOrder ? { priceWithTax: sortOrder } : undefined,
      priceStart: start,
      priceEnd: end * 100,
    }).then(({ data }) => {
      const updatedProducts = data?.collection?.productVariants?.items?.map((item: any) => item.product) || [];
      setProducts(updatedProducts);
    }).catch((error) => {
      console.error("Error applying price filter:", error);
    });
  };

  const handleLoadMore = () => {
    fetchMore({
      variables: {
        take,
        skip: products.length,
        sort: sortOrder ? { priceWithTax: sortOrder } : undefined,
        priceStart: priceRange.start,
        priceEnd: priceRange.end * 100,
      },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        if (!fetchMoreResult || !fetchMoreResult.collection || !fetchMoreResult.collection.productVariants ||
          fetchMoreResult.collection.productVariants.items.length === 0) {
          return prevResult;
        }

        const newProducts = fetchMoreResult.collection.productVariants.items.map((item: any) => item.product) || [];

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

  const handleSortChange = () => {
    if (!sortOrder) {
      setSortOrder("ASC");
    } else if (sortOrder === "ASC") {
      setSortOrder("DESC");
    } else {
      setSortOrder(undefined);
    }
  };

  return (
    <View style={styles2.container}>
      <View style={styles2.infoContainer}>
        <Text style={styles2.infoText}>All products</Text>

        <TouchableOpacity style={styles2.filterContainer} onPress={handleSortChange}>
          <Text style={styles2.infoText}>Order by </Text>
          <Icons.MaterialCommunityIcons
            name={
              sortOrder === "ASC"
                ? "sort-ascending"
                : sortOrder === "DESC"
                ? "sort-descending"
                : "sort"
            }
            size={moderateScale(22, 0.1)} 
            color="#1F2937"
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles2.filterContainer} onPress={() => setModalVisible(true)}>
          <Text style={styles2.infoText}>Filter</Text>
          <Icons.AntDesign name="filter" size={moderateScale(24, 0.1)} color="#1F2937" />
        </TouchableOpacity>
      </View>
      <ProductList
        products={products}
        data={data}
        navigation={navigation}
        scrollViewRef={scrollViewRef}
        loading={loading}
        handleLoadMore={handleLoadMore}
        refetch={refetch}
      />
      <ProductFilters
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        priceRange={priceRange}
        applyPriceFilter={applyPriceFilter}
      />
    </View>
  );
}