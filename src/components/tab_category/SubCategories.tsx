import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { FlashList } from "@shopify/flash-list";

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

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
  categoryItem: {
    flexDirection: "column",
    alignItems: "center",
    marginRight: 15,
    marginTop: 10,
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
    textAlignVertical: "center",
    overflow: "hidden",
  },
});
