import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Dimensions,
} from "react-native";
import { useQuery } from "@apollo/client";
import { GET_ALL_COLLECTIONS_QUERY } from "../../api/mutation/category";
import { Category } from "../../../utils/interface";
import styles from "../common_pages/category/styles.category";
import PageLoading from "../loading/PageLoading";
import { moderateScale } from "react-native-size-matters";

export default function CategoryScreen({ navigation }) {
  const [take] = useState(9);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingMore, setLoadingMore] = useState(false);
  const [numColumns, setNumColumns] = useState(2);
  const [itemWidth, setItemWidth] = useState(moderateScale(186, 0.1));
  const [endReachedCalledDuringMomentum, setEndReachedCalledDuringMomentum] = useState(false);

  const flatListRef = useRef<FlatList<Category>>(null);

  const { loading, error, fetchMore } = useQuery<{
    collections: { items: Category[] };
  }>(GET_ALL_COLLECTIONS_QUERY, {
    variables: { skip: 0, take },
    onCompleted: (data) => {
      setCategories(data?.collections?.items || []);
    },
  });

  const handleLoadMore = async () => {
    if (!loadingMore) {
      setLoadingMore(true);
      try {
        const { data } = await fetchMore({
          variables: {
            skip: categories.length,
            take,
          },
        });
        const newCategories = data.collections.items.filter(
          (category) => !categories.some((c) => c.id === category.id)
        );
        setCategories((prevCategories) => [...prevCategories, ...newCategories]);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoadingMore(false);
      }
    }
  };

  useEffect(() => {
    const updateLayout = () => {
      const screenWidth = Dimensions.get("window").width;
      const calculatedItemWidth = moderateScale(186, 0.067);
      const calculatedNumColumns = Math.floor(screenWidth / calculatedItemWidth);
      setItemWidth(calculatedItemWidth);
      setNumColumns(calculatedNumColumns);
    };

    updateLayout();

    const subscription = Dimensions.addEventListener("change", updateLayout);

    return () => {
      subscription?.remove();
    };
  }, []);

  if (loading) return <PageLoading />;
  if (error) return <Text>Erro: {error.message}</Text>;

  return (
    <View style={styles.container}>
      <FlatList
        key={numColumns}
        ref={flatListRef}
        data={categories}
        renderItem={({ item }) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.categoryItem,
              {
                width: itemWidth,
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
                source={{
                  uri:
                    item.assets?.[0]?.source ??
                    'https://www.arquivomedico.com.br/arquivomedicov3/assets/images/sem_imagem.png',
                }}
                style={styles.categoryImage}
                resizeMode="cover"
              />
            </View>
            <Text style={styles.categoryText}>{item.name}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
        numColumns={numColumns}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.1}
        onMomentumScrollBegin={() => setEndReachedCalledDuringMomentum(false)}
        onEndReached={() => {
          if (!endReachedCalledDuringMomentum) {
            handleLoadMore();
            setEndReachedCalledDuringMomentum(true);
          }
        }}
        ListFooterComponent={loadingMore ? <ActivityIndicator size="large" /> : null}
      />
    </View>
  );
}
