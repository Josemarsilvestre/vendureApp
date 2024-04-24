import React from 'react';
import { Image, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useQuery } from "@apollo/client";
import { GET_ALL_COLLECTIONS_QUERY } from '../../src/api/home';

import FeedSectionContainer from '../common/FeedSectionContainer';

interface Category {
  id: string;
  name: string;
  slug: string;
  assets: {
    source: string;
  }[];
}

export interface CategoriesProps {
  navigation: any;
}

const Categories: React.FC<CategoriesProps> = ({ navigation }) => {
  const { data, loading, error } = useQuery<{ collections: { items: Category[] } }>(GET_ALL_COLLECTIONS_QUERY);

  if (loading || error) {
    return null;
  }

  const categories: Category[] = data?.collections?.items || [];

  return (
    <FeedSectionContainer title="Categoria">
      <FlashList
        data={categories}
        horizontal
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={styles.categoryItem}
            onPress={() => {
              navigation.setOptions({
                title: item.name,
              });
              navigation.navigate("CategorySection", { category: item.slug });
            }}
          >
            <View style={styles.imageContainer}>
              <Image
                source={{
                  uri: item.assets[0]?.source || '',
                }}
                style={styles.image}
              />
            </View>
            <Text style={styles.text}>{item.name}</Text>
          </TouchableOpacity>
        )}
        estimatedItemSize={900}
        estimatedListSize={{height: 108, width: 100 }}
        showsHorizontalScrollIndicator={false}
      />
    </FeedSectionContainer>
  );
};

const styles = StyleSheet.create({
  categoryItem: {
    flexDirection: "column",
    alignItems: "center",
    marginRight: 15,
  },
  imageContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: "#d6d6d6",
    overflow: "hidden",

  },
  image: {
    width: "100%",
    height: "100%",
  },
  text: {
    color: "#4d4d4d",
    maxWidth: 90,
    textAlign: "center",
  },
});

export default Categories;
