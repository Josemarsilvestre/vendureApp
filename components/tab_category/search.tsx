import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  TextInput,
  StyleSheet,
} from "react-native";
import { useQuery } from "@apollo/client";
import { FlashList } from "@shopify/flash-list";

import Icons from "../common/Icons";
import EmptySearchList from "../emptyList/EmptySearchList";
import ProductPrice from "../product/ProductPrice";
import ShowWrapper from "../common/ShowWrapper";
import useDebounce from "../../hooks/useDebounce";
import { PRODUCTLIST_QUERY } from "../../src/api/product";
import { TouchableOpacity } from "react-native-gesture-handler";

interface Product {
  id: string;
  name: string;
  slug: string;
  featuredAsset: {
    preview: string;
    mimeType: string;
    width: number;
    height: number;
  };
  variants: {
    price: number;
    stockLevel: number;
  }[];
}

export default function SerachScreen({navigation}) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce(search, 1200);

  const { data, loading, error, fetchMore } = useQuery(PRODUCTLIST_QUERY, {
    variables: { take: 10 },
  });

  const handleChange = (value: string) => {
    setSearch(value);
  };

  const onEndReachedThreshold = () => {
    if (!data.products.hasNextPage) return;
    fetchMore({
      variables: {
        page: data.products.page + 1,
      },
    });
  };

  const handleRemoveSearch = () => {
    setSearch("");
    setPage(1);
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.searchBar}>
          <View style={styles.searchIcon}>
            <Icons.EvilIcons name="search" size={24} color="#1F2937" />
          </View>
          <TextInput
            style={styles.input}
            keyboardType="default"
            value={search}
            onChangeText={handleChange}
            placeholder="Pesquisar..."
          />
          <Pressable style={styles.closeIcon} onPress={handleRemoveSearch}>
            <Icons.AntDesign name="close" size={14} color="#999" />
          </Pressable>
        </View>
        <View style={styles.productList}>
          <ShowWrapper
            error={error}
            isError={!!error}
            refetch={() => fetchMore({ variables: { take: 10 } })}
            isFetching={loading}
            isSuccess={!loading && !!data}
            dataLength={data ? data.products.totalItems : 0}
            emptyComponent={<EmptySearchList />}
            type="list"
          >
            <View style={styles.innerList}>
              {data?.products.items.length > 0 && (
                <FlashList
                  data={data?.products.items}
                  renderItem={({ item }: { item: Product }) => (
                    <View key={item.id} style={styles.productItem}>
                      <TouchableOpacity onPress={() => navigation.navigate("Products")}>
                        <Text style={styles.title}>{item.name}</Text>
                        <View style={styles.priceContainer}>
                          <ProductPrice
                            inStock={item.variants[0].stockLevel}
                            price={item.variants[0].price}
                            singleProduct={true}
                          />
                        </View>
                      </TouchableOpacity>
                    </View>
                  )}
                  onEndReached={onEndReachedThreshold}
                  onEndReachedThreshold={0}
                  estimatedItemSize={200}
                />
              )}
            </View>
          </ShowWrapper>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
    color: "#333",
  },
  closeIcon: {
    marginLeft: 10,
  },
  productList: {
    flex: 1,
    paddingTop: 20,
  },
  innerList: {
    flex: 1,
  },
  productItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  title: {
    fontSize: 16,
    paddingBottom: 5,
    color: "#333",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
