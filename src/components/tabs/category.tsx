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
                source={{ uri: item.assets?.[0]?.source ?? 'https://www.arquivomedico.com.br/arquivomedicov3/assets/images/sem_imagem.png' }}
                style={styles.categoryImage}
                resizeMode="cover"
              />
            </View>
            <Text style={styles.categoryText}>{item.name}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        ListFooterComponent={loadingMore ? <ActivityIndicator size="large" /> : null}
      />
    </View>
  );
}
