import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { useQuery } from "@apollo/client";

import { GET_ALL_COLLECTIONS_QUERY } from "../../api/mutation/category";
import { Category } from "../../../utils/interface";
import styles from "../common_pages/category/styles.category";
import PageLoading from "../loading/PageLoading";
import Icons from "../common/Icons";

export default function CategoryScreen({ navigation }) {
  const [take] = useState(9);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingMore, setLoadingMore] = useState(false);
  const flatListRef = useRef<FlatList<Category>>(null);

  const { loading, error, fetchMore } = useQuery<{
    collections: { items: Category[] };
  }>(GET_ALL_COLLECTIONS_QUERY, {
    variables: { skip: 0, take },
    onCompleted: (data) => {
      setCategories(data?.collections?.items || []);
    },
  });

  const handleLoadMore = () => {
    setLoadingMore(true);
    fetchMore({
      variables: {
        skip: categories.length,
        take,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        const newCategories = fetchMoreResult.collections.items.filter(
          (category) => !categories.some((c) => c.id === category.id)
        );
        setCategories((prevCategories) => [...prevCategories, ...newCategories]);
        setLoadingMore(false);
        return prev;
      },
    });
  };
  

  const handleScrollToTop = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
    }
  };

  if (loading) return <PageLoading />;
  if (error) return <Text>Erro: {error.message}</Text>;

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={categories}
        renderItem={({ item }) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.categoryItem,
              {
                width: Dimensions.get("window").width / 2,
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
        keyExtractor={(item) => item.id.toString()} // Usar o ID como chave única
        numColumns={2}
        showsVerticalScrollIndicator={false}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        ListFooterComponent={loadingMore ? <ActivityIndicator size="large" /> : null}
      />
      <TouchableOpacity onPress={handleScrollToTop} style={{ position: 'absolute', bottom: 20, right: 20 }}>
        <Icons.FontAwesome5 name="arrow-alt-circle-up" size={35} color="#3b4d68"  />
      </TouchableOpacity>
    </View>
  );
}
