import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { useQuery } from "@apollo/client";
import { moderateScale } from "react-native-size-matters";
import { FlashList } from "@shopify/flash-list";

import { GET_ALL_COLLECTIONS_QUERY } from "../../api/mutation/category";
import { Category } from "../../../utils/interface";
import styles from "../common_pages/category/styles.category";
import PageLoading from "../loading/PageLoading";

export default function CategoryScreen({ navigation }) {
  const [take] = useState(9);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingMore, setLoadingMore] = useState(false);

  const { data, loading, error, fetchMore } = useQuery<{
    collections: { items: Category[] };
  }>(GET_ALL_COLLECTIONS_QUERY, {
    variables: { skip: 0, take },
    onCompleted: (data) => {
      setCategories(data?.collections?.items || []);
    },
  });

  const handleLoadMore = useCallback(() => {
    if (!loadingMore) {
      setLoadingMore(true);
      const skip = categories.length;
      fetchMore({
        variables: { skip, take },
        updateQuery: (prevResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prevResult;
          return {
            collections: {
              ...prevResult.collections,
              items: [...prevResult.collections.items, ...fetchMoreResult.collections.items.filter(newItem => !prevResult.collections.items.some(oldItem => oldItem.id === newItem.id))],
            },
          };
        },
      }).finally(() => setLoadingMore(false));
    }
  }, [loadingMore, fetchMore, categories, take]);

  if (loading) return <PageLoading />
  if (error) return <Text>Erro: {error.message}</Text>;

  const { width } = Dimensions.get("window");
  const itemWidth = moderateScale(180);
  const numColumns = Math.floor(width / itemWidth);
  const adjustedItemWidth = width / numColumns;

  return (
    <View style={styles.container}>
      <View style={styles.categoryList}>
        <FlashList
          data={categories}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.categoryItem,
                {
                  width: adjustedItemWidth,
                },
              ]}
              onPress={() => {
                navigation.navigate("CategorySection", {
                  category: item,
                });
              }}
            >
              <View style={styles.categoryImageContainer}>
                <Image
                  source={{ uri: item.assets[0].source }}
                  style={styles.categoryImage}
                  resizeMode="cover"
                />
              </View>
              <Text style={styles.categoryText}>{item.name}</Text>
            </TouchableOpacity>
          )}
          estimatedItemSize={900}
          showsVerticalScrollIndicator={false}
          numColumns={numColumns}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={loadingMore ? <ActivityIndicator size="large" /> : null}
        />
      </View>
    </View>
  );
}
