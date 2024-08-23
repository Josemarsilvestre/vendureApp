import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { moderateScale } from "react-native-size-matters";

export default function FreeShipping() {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Free Shipping</Text>
          <Text style={styles.description}>Order over 50€</Text>
        </View>
        <View>
          <Image
            source={require("../../../assets/freeShipping.jpg")} 
            style={styles.image}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: moderateScale(5, 0.1),
    backgroundColor: "#E5E5E5",
    paddingHorizontal: moderateScale(16, 0.1),
  },
  innerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    borderWidth: moderateScale(1, 0.1),
    borderColor: "#CCCCCC",
    borderRadius: moderateScale(10, 0.1),
  },
  textContainer: {
    padding: moderateScale(12, 0.1),
  },
  title: {
    fontSize: moderateScale(16, 0.1),
    fontWeight: "bold",
  },
  description: {
    marginTop: moderateScale(8, 0.1),
    fontSize: moderateScale(12, 0.1),
    color: "#888888",
  },
  image: {
    width: moderateScale(80, 0.1),
    height: moderateScale(60, 0.1),
    padding: moderateScale(16, 0.1),
  },
});
