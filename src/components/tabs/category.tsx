import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useQuery } from "@apollo/client";
import { moderateScale } from "react-native-size-matters";
import { FlashList } from "@shopify/flash-list";

import { GET_ALL_COLLECTIONS_QUERY } from "../../api/mutation/category";
import { Category } from "../../../utils/interface";
import styles from "../common_pages/category/styles.category";

export default function CategoryScreen({ navigation }) {
  const { data, loading, error } = useQuery<{
    collections: { items: Category[] };
  }>(GET_ALL_COLLECTIONS_QUERY);

  if (loading) return <Text>loading...</Text>;
  if(error) return <Text>Erro: {error.message}</Text>;

  const { width } = Dimensions.get("window");
  const itemWidth = moderateScale(180);
  const numColumns = Math.floor(width / itemWidth);
  const adjustedItemWidth = width / numColumns;

  const categories: Category[] = data?.collections?.items || [];

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
                  category: item
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
        />
      </View>
    </View>
  );
}
