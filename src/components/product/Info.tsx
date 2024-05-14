import React from "react";
import { Text, View, StyleSheet } from "react-native";

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
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  header: {
    paddingTop: 12,
    paddingBottom: 4,
    fontSize: 16,
    fontWeight: "bold",
  },
  infoContainer: {
    marginLeft: 4,
    marginTop: 2,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  title: {
    flex: 1,
    fontSize: 14,
    color: "#666",
  },
  value: {
    flex: 1,
    fontSize: 14,
    color: "#000",
  },
});

export default Info;
