import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  TextInput,
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
import styles from "./style/styles.search";
import { SEARCH_QUERY } from "../../api/mutation/search";

interface Product {
  productId: string;
  productVariantId: string;
  productVariantName: string;
  collectionIds: string[],
  productAsset: {
    preview: string;
  };
  priceWithTax: {
    value: number;
    __typename: string;
  };
  score: number;
}

interface SearchData {
  search: {
    totalItems: number;
    items: Product[];
  };
}

export default function SearchScreen({ navigation }) {
  const [search, setSearch] = useState("");

  const { data, loading, error, fetchMore } = useQuery<SearchData>(
    SEARCH_QUERY,
    {
      variables: { term: search },
    }
  );

  const handleChange = (value: string) => {
    setSearch(value);
  };

  const handleRemoveSearch = () => {
    setSearch("");
  };

  const SearchItems = data?.search.items.map((item) => item);

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
                data={SearchItems}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                  <View key={item?.productId} style={styles.productItem}>
                    <TouchableOpacity
                      style={styles.itemContainer}
                      onPress={() =>
                        navigation.navigate("ProductSearched", {
                          productId: item?.productId,
                          productVariantID: item?.productVariantId,
                          name: item?.productVariantName,
                          price:
                            item?.priceWithTax.__typename === "SinglePrice"
                              ? item?.priceWithTax.value
                              : 0,
                          categoryID: item?.collectionIds[0]
                        })
                      }
                    >
                      <View style={styles.imageContainer}>
                        <Image
                          source={{ uri: item?.productAsset?.preview || "" }}
                          style={styles.image}
                        />
                      </View>
                      <View style={styles.textContainer}>
                        <Text
                          numberOfLines={3}
                          ellipsizeMode="tail"
                          style={styles.title}
                        >
                          {item?.productVariantName}
                        </Text>
                        <View style={styles.rating}>
                          <Text style={styles.ratingText}>{item?.score}</Text>
                          <Icons.AntDesign
                            name="star"
                            size={15}
                            style={styles.starIcon}
                          />
                        </View>
                        <ProductPrice
                          price={
                            item?.priceWithTax.__typename === "SinglePrice"
                              ? item?.priceWithTax.value
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
