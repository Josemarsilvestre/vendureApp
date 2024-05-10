import React from "react";
import { View, Image, StyleSheet, Text } from "react-native";
import { moderateScale } from "react-native-size-matters";

interface ImageProps {
  product: string;
}

const ImageGallery: React.FC<ImageProps> = ({ product }) => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Image
          source={{ uri: product || "" }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
    </View>
  );
};

export default ImageGallery;

const styles = StyleSheet.create({
  container: {
    marginTop: moderateScale(-18),
    borderRadius: moderateScale(10),
    overflow: "hidden",
  },
  wrapper: {
    height: moderateScale(200),
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
