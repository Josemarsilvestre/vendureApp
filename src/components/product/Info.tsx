import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { moderateScale } from "react-native-size-matters";

const Info = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sending</Text>
      <View style={styles.infoContainer}>
        <Text>Standard shipping: 3 to 5 business days.</Text>
        <Text>Shipping costs depend on the shipping address and will be calculated during checkout.</Text>
        <Text>Returns are subject to terms.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: moderateScale(16, 0.1),
    paddingBottom: moderateScale(8, 0.1),
  },
  header: {
    paddingTop: moderateScale(12, 0.1),
    paddingBottom: moderateScale(4, 0.1),
    fontSize: moderateScale(16, 0.1),
    fontWeight: "bold",
  },
  infoContainer: {
    marginLeft: moderateScale(4, 0.1),
    marginTop: moderateScale(2, 0.1),
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: moderateScale(4, 0.1),
  },
  title: {
    flex: 1,
    fontSize: moderateScale(14, 0.1),
    color: "#666",
  },
  value: {
    flex: 1,
    fontSize: moderateScale(14, 0.1),
    color: "#000",
  }
});

export default Info;
