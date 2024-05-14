import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { GET_BANNER_1_QUERY, GET_BANNER_2_QUERY, GET_BANNER_3_QUERY } from "../../api/mutation/home";

import Slider from "../tab_home/Slider";
import Categories from "../tab_home/categories";
import Banner from "../tab_home/Banner"

export default function FeedScreen({ navigation }) {
 
  return (
    <ScrollView style={styles.container}>
      <Slider />
      <Categories navigation={navigation}/>
      <Banner navigation={navigation} query={GET_BANNER_1_QUERY} title="Topics of the day"/>
      <Banner navigation={navigation} query={GET_BANNER_2_QUERY} title="Recommended"/>
      <Banner navigation={navigation} query={GET_BANNER_3_QUERY} title="Favorites"/>
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
