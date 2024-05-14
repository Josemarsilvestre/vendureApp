import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";

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
    paddingVertical: 5,
    backgroundColor: "#E5E5E5",
    paddingHorizontal: 16,
  },
  innerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 10,
  },
  textContainer: {
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  description: {
    marginTop: 8,
    fontSize: 12,
    color: "#888888",
  },
  image: {
    width: 80,
    height: 60,
    padding: 16,
  },
});
