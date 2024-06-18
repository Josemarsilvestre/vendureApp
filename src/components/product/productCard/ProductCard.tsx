import React, { useRef, useState } from "react";
import { View, TouchableOpacity, Text, FlatList } from "react-native";
import { useQuery } from "@apollo/client";

import ProductList from "./ProductList";
import ProductFilters from "./ProductFilters";
import { SHOW_ORDER } from "../../../api/mutation/order";
import { GET_PRODUCTS_BY_CATEGORY_QUERY } from "../../../api/mutation/category";
import styles2 from "../../common_pages/category/styles.category";
import { ProductCard as Product } from "../../../../utils/interface";
import Icons from "../../common/Icons";

export default function ProductCard({
  categoryID,
  navigation,
}: {
  categoryID: string;
  navigation: any;
}) {
  const [sortOrder, setSortOrder] = useState<{ priceWithTax?: "ASC" | "DESC" | undefined }>({ priceWithTax: undefined });
  const [sortByPrice, setSortByPrice] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [priceRange, setPriceRange] = useState<{ start: number; end: number }>({ start: 0, end: 1000 });
  const { refetch } = useQuery(SHOW_ORDER);
  const [products, setProducts] = useState<Product[]>([]);
  const scrollViewRef = useRef<FlatList<Product>>(null);
  const take = 9;

  const { loading, data, fetchMore } = useQuery(GET_PRODUCTS_BY_CATEGORY_QUERY, {
    variables: {
      take,
      skip: 0,
      id: parseInt(categoryID),
      sort: sortOrder.priceWithTax ? sortOrder : undefined,
    },
    onCompleted: (data) => {
      if (data) {
        const initialProducts = data?.collection?.productVariants?.items?.map((item: any) => item.product) || [];
        setProducts(initialProducts);
      }
    },
  });

  const handleLoadMore = () => {
    fetchMore({
      variables: {
        take,
        skip: products.length,
        sort: sortOrder.priceWithTax ? sortOrder : undefined,
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
    }).catch((error) => {
      console.error("Erro ao aplicar filtro de preço:", error);
    });
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

  return (
    <View style={styles2.container}>
      <View style={styles2.infoContainer}>
        <Text style={styles2.infoText}>All products</Text>

        <TouchableOpacity style={styles2.filterContainer} onPress={handleSortChange}>
          <Text style={styles2.infoText}>Order by </Text>
          <Icons.MaterialCommunityIcons name={
            sortByPrice
              ? sortOrder.priceWithTax === "ASC"
                ? "sort-ascending"
                : "sort-descending"
              : "sort"
          }
            size={22}
            color="#1F2937" />
        </TouchableOpacity>
        <TouchableOpacity style={styles2.filterContainer} onPress={() => setModalVisible(true)}>
          <Text style={styles2.infoText}>Filter</Text>
          <Icons.AntDesign name="filter" size={24} color="#1F2937" />
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
        setPriceRange={setPriceRange}
        applyPriceFilter={applyPriceFilter}
      />
    </View>
  );
}