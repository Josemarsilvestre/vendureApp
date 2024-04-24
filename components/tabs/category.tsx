import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useQuery } from "@apollo/client";
import { moderateScale } from "react-native-size-matters";

import { GET_ALL_COLLECTIONS_QUERY } from "../../src/api/category";

const { width } = Dimensions.get("window");
const itemWidth = moderateScale(180);
const numColumns = Math.floor(width / itemWidth);

interface Category {
  id: string;
  name: string;
  slug: string;
  assets: {
    source: string;
  };
}

export default function CategoryScreen({ navigation }) {
  const [activeMinCat, setActiveMinCat] = useState<Category>({
    id: "",
    name: "",
    slug: "",
    assets: { source: "" },
  });

  const { data, loading, error } = useQuery(GET_ALL_COLLECTIONS_QUERY);

  useEffect(() => {
    if (data && data.collections && data.collections.items.length > 0) {
      const levelOneCategory = data.collections.items;
      setActiveMinCat(levelOneCategory);
    }
  }, [data]);

  const handleActive = (cat: Category) => {
    setActiveMinCat(cat);
    navigation.navigate("CategorySection", {
      categoryName: cat.name
    });
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.categoryList}>
          {data &&
            data.collections.items.map((category: Category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryItem,
                  {
                    backgroundColor: activeMinCat.id === category.id ? "#fff" : "#f0f0f0",
                    width: itemWidth,
                  },
                ]}
                onPress={() => handleActive(category)}
              >
                <View style={styles.categoryImageContainer}>
                  <Image
                    source={{ uri: category.assets[0].source }}
                    style={styles.categoryImage}
                    resizeMode="cover"
                  />
                </View>
                <Text style={styles.categoryText}>{category.name}</Text>
              </TouchableOpacity>
            ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  categoryList: {
    backgroundColor: "#f0f0f0",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  categoryItem: {
    alignItems: "center",
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(10),
    borderBottomWidth: moderateScale(1),
    borderBottomColor: "#ddd",
  },
  categoryImageContainer: {
    marginBottom: moderateScale(5),
    width: "100%",
    aspectRatio: 1,
    borderRadius: moderateScale(10),
    overflow: "hidden",
  },
  categoryImage: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: moderateScale(10),
  },
  categoryText: {
    fontSize: moderateScale(16),
    color: "#333",
    textAlign: "center",
  },
});
