import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  TextInput,
  StyleSheet,
  Image,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import { useQuery } from "@apollo/client";
import { FlashList } from "@shopify/flash-list";

import Icons from "../common/Icons";
import EmptySearchList from "../emptyList/EmptySearchList";
import ProductPrice from "../product/ProductPrice";
import ShowWrapper from "../common/ShowWrapper";
import { SEARCH_QUERY } from "../../src/api/product";

export default function SearchScreen({ navigation }) {
  const [search, setSearch] = useState("");
  const windowWidth = useWindowDimensions().width;
  const imageWidth = windowWidth * 0.2;

  const { data, loading, error, fetchMore } = useQuery(SEARCH_QUERY, {
    variables: { term: search },
  });

  const handleChange = (value: string) => {
    setSearch(value);
  };

  const handleRemoveSearch = () => {
    setSearch("");
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
            placeholder="Search..."
          />
          <Pressable style={styles.closeIcon} onPress={handleRemoveSearch}>
            <Icons.AntDesign name="close" size={14} color="#999" />
          </Pressable>
        </View>
        <View style={styles.productList}>
          <ShowWrapper
            error={error}
            isError={!!error}
            refetch={() => fetchMore({ variables: { take: 20 } })}
            isFetching={loading}
            isSuccess={!loading && !!data}
            dataLength={data ? data.search.totalItems : 0}
            emptyComponent={<EmptySearchList />}
            type="list"
          >
            <View style={styles.innerList}>
              <FlashList
                data={data?.search.items}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => (
                  <View key={item.productId} style={styles.productItem}>
                    <TouchableOpacity
                      style={styles.itemContainer}
                      onPress={() =>
                        navigation.navigate("ProductSearched", {
                          productId: item.productId,
                        })
                      }
                    >
                      <View style={styles.imageContainer}>
                        <Image
                          source={{ uri: item.productAsset?.preview || "" }}
                          style={styles.image}
                        />
                      </View>
                      <View style={styles.textContainer}>
                        <Text
                          numberOfLines={3}
                          ellipsizeMode="tail"
                          style={styles.title}
                        >
                          {item.productName}
                        </Text>
                        <View style={styles.rating}>
                          <Text style={styles.ratingText}>{item.score}</Text>
                          <Icons.AntDesign
                            name="star"
                            size={15}
                            style={styles.starIcon}
                          />
                        </View>
                        <ProductPrice
                          price={
                            item.priceWithTax.__typename === "SinglePrice"
                              ? item.priceWithTax.value
                              : 0
                          }
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                )}
                onEndReachedThreshold={0}
                estimatedItemSize={200}
              />
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
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  itemContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  imageContainer: {
    width: "40%",
    aspectRatio: 1,
    marginRight: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  textContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    width: "100%",
    paddingHorizontal: 10,
    marginTop: -60,
  },
  title: {
    fontSize: 16,
    paddingBottom: 5,
    color: "#333",
    textAlign: "right",
  },
  rating: {
    flexDirection: "row",
  },
  ratingText: {
    fontSize: 14,
    color: "#6B7280",
  },
  starIcon: {
    color: "#F59E0B",
    marginTop: 2
  },  
  priceContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
});
