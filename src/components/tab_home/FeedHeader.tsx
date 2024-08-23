import React from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Icons from "../common/Icons";
import { moderateScale } from "react-native-size-matters";

export interface FeedHeaderProps {
  navigation: any;
  isIndexScreen: boolean;
}

const FeedHeader: React.FC<FeedHeaderProps> = ({
  navigation,
  isIndexScreen,
}) => {
  const insets = useSafeAreaInsets();

  if (!isIndexScreen) {
    return null;
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.text}>Vendure App</Text>
        <View style={styles.iconsContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Search")}
            style={styles.cartIconContainer}
          >
            <Icons.EvilIcons
              name="search"
              size={moderateScale(30, 0.1)}
              color="#1F2937"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Cart")}
            style={styles.cartIconContainer}
          >
            <Icons.AntDesign name="shoppingcart" size={moderateScale(24, 0.1)} color="#1F2937" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: moderateScale(10, 0.1),
    paddingHorizontal: moderateScale(10, 0.1),
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: moderateScale(2, 0.1),
    },
    shadowOpacity: moderateScale(0.25, 0.1),
    shadowRadius: moderateScale(3.84, 0.1),
    elevation: moderateScale(5, 0.1),
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  cartIconContainer: {
    position: "relative",
    marginLeft: moderateScale(15, 0.1),
  },
  text: {
    fontSize: moderateScale(16, 0.01),
    fontWeight: "bold",
  },
});

export default FeedHeader;
