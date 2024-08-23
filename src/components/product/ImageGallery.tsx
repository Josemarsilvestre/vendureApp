import React from "react";
import { View, Image, StyleSheet, Text } from "react-native";
import { moderateScale } from "react-native-size-matters";

interface ImageProps {
  product: string;
}

const ImageGallery: React.FC<ImageProps> = ({ product }) => {
  if (!product || typeof product !== 'string' || product.trim() === '') {
    // Se a URL da imagem estiver vazia ou não for uma string válida, retorne null ou defina uma imagem padrão
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Image
          source={{ uri: product }}
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
    marginTop: moderateScale(-14, 0.1),
    borderRadius: moderateScale(10, 0.1),
    overflow: "hidden",
  },
  wrapper: {
    height: moderateScale(200, 0.1),
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
