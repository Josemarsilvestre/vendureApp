import React from 'react';
import { Image, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useQuery } from "@apollo/client";

import { GET_ALL_COLLECTIONS_QUERY } from '../../api/mutation/category';
import FeedSectionContainer from '../common/FeedSectionContainer';
import { Category } from '../../../utils/interface';
import { moderateScale } from 'react-native-size-matters';

export interface CategoriesProps {
  navigation: any;
}

const Categories: React.FC<CategoriesProps> = ({ navigation }) => {
  const { loading, error, data } = useQuery<{ collections: { items: Category[] } }>(
    GET_ALL_COLLECTIONS_QUERY,
    { variables: { skip: 0, take: 9 } }
  );  

  if (loading || error || !data || !data.collections) {
    return null;
  }

  const categories: Category[] = data.collections.items || [];

  return (
    <FeedSectionContainer title="Category">
      <FlashList
        data={categories}
        horizontal
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.categoryItem}
            onPress={() => {
              navigation.navigate("CategorySection", {
                category: item,
              });
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
        estimatedListSize={{ height: 110, width: 100 }}
        showsHorizontalScrollIndicator={false}
      />
    </FeedSectionContainer>
  );
};

const styles = StyleSheet.create({
  categoryItem: {
    flexDirection: "column",
    alignItems: "center",
    marginRight: moderateScale(15),
  },
  imageContainer: {
    width: moderateScale(70),
    height: moderateScale(70),
    borderRadius: moderateScale(35),
    borderWidth: moderateScale(2),
    borderColor: "#d6d6d6",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  text: {
    color: "#4d4d4d",
    maxWidth: moderateScale(90),
    textAlign: "center",
  },
});

export default Categories;
