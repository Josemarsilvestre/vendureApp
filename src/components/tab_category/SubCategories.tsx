import React from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import { FlashList } from "@shopify/flash-list";

import styles from "./style/styles.search";

interface SubCategory {
  id: string;
  name: string;
  assets: {
    source: string;
  };
}

interface Category {
  children: SubCategory[];
}

export default function SubCategories({
  category,
  navigation,
}: {
  category: Category;
  navigation: any;
}) {
  return (
    <View style={styles.container}>
      {category.children !== null && category.children.length > 0 ? (
        <FlashList
          data={category.children}
          renderItem={({ item }: { item: SubCategory }) => {
            return (
              <TouchableOpacity
                style={styles.categoryItem}
                onPress={() => {
                  navigation.navigate("CategorySection", {
                    category: category
                  });
                }}
                key={item.id}
              >
                <View style={styles.imageContainer}>
                  <Image
                    source={{
                      uri: item.assets[0]?.source || "",
                    }}
                    style={styles.image}
                  />
                </View>
                <Text
                  style={styles.text}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          }}
          horizontal={true}
          estimatedItemSize={300}
          estimatedListSize={{ height: 100, width: 200 }}
          showsHorizontalScrollIndicator={false}
        />
      ) : (
        <></>
      )}
    </View>
  );
}
