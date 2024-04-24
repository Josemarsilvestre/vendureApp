import React from "react";
import { ScrollView, StyleSheet } from "react-native";

import Slider from "../tab_home/Slider";
import Categories from "../tab_home/categories";
import BannerOne from "../banners/BannerOne";
import BannerTwo from "../banners/BannerTwo";

export default function FeedScreen({ navigation }) {
 
  return (
    <ScrollView style={styles.container}>
      <Slider />
      <Categories navigation={navigation} />
      <BannerOne navigation={navigation}/>
      <BannerTwo navigation={navigation}/>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 3,
  },
});
