import React, { useState } from "react";
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { FlashList } from "@shopify/flash-list";
import { useMutation, useQuery } from "@apollo/client";

import ProductPrice from "../ProductPrice";
import Icons from "../../common/Icons";
import { Product } from "../../../../utils/interface";
import { Button } from "../../common/Buttons";
import { ADD_TO_CART } from "../../../api/mutation/order";
import { SHOW_ORDER } from "../../../api/mutation/order";
import styles from "./style/style.productCard";

interface Category {
  productVariants: {
    items: {
      id: string;
      name: string;
      product: Product;
    }[];
  };
}

export default function ProductCard({
  category,
  navigation,
}: {
  category: Category;
  navigation: any;
}) {
  const windowWidth = useWindowDimensions().width;
  const imageWidth = windowWidth * 0.7;

  const [addedToCartMap, setAddedToCartMap] = useState<{
    [key: string]: boolean;
  }>(
    category.productVariants.items.reduce((acc, curr) => {
      acc[curr.id] = false;
      return acc;
    }, {})
  );
  const [addToCart] = useMutation(ADD_TO_CART);
  const { refetch } = useQuery(SHOW_ORDER);

  const products = category.productVariants.items.map((item) => item.product);

  const handleAddToCart = (itemId: string) => {
    addToCart({ variables: { id_: itemId, quantity_: 1 } });
    refetch();

    setAddedToCartMap((prevState) => ({
      ...prevState,
      [itemId]: true,
    }));

    setTimeout(() => {
      setAddedToCartMap((prevState) => ({
        ...prevState,
        [itemId]: false,
      }));
    }, 3000);
  };

  return (
    <FlashList
      data={products}
      renderItem={({ item, index }: { item: Product; index: number }) => {
        const items_ = category.productVariants.items[index];
        
        return (
          <TouchableOpacity
            style={styles.container}
            onPress={() =>
              navigation.navigate("Products", {
                products: category.productVariants.items,
                selectedIndex: index,
                productVariantId: items_.id,
              })
            }
          >
            <View style={styles.cardContent} key={items_.id}>
              <View style={[styles.imageContainer, { width: imageWidth }]}> 
                <Image
                  source={{
                    uri: item.featuredAsset.source || "",
                  }}
                  style={styles.image}
                  resizeMode="cover"
                />
              </View>
              <View style={styles.infoContainer}>
                <Text
                  numberOfLines={2}
                  ellipsizeMode="tail"
                  style={styles.title}
                >
                  {items_.name}
                </Text>
                <View style={styles.priceContainer}>
                  {item.variants[0].stockLevel !== 0 ? (
                    <ProductPrice price={item.variants[0].priceWithTax} />
                  ) : (
                    <Text style={styles.notAvailableText}>Not available</Text>
                  )}
                </View>
                <View style={styles.AddContainer}>
                  {addedToCartMap[items_.id] ? (
                    <TouchableOpacity style={styles.addedButton} disabled>
                      <Text style={styles.addButtonText}>Added to cart </Text>
                      <Icons.Feather
                        name="shopping-cart"
                        size={14}
                        style={styles.addButtonIcon}
                      />
                    </TouchableOpacity>
                  ) : (
                    <Button
                      style={styles.addButton}
                      onPress={() => handleAddToCart(items_.id)}
                    >
                      <Text style={styles.addButtonText}>Add to cart </Text>
                      <Icons.Feather
                        name="shopping-cart"
                        size={12}
                        style={styles.addButtonIcon}
                      />
                    </Button>
                  )}
                </View>
              </View>
            </View>
          </TouchableOpacity>
        );
      }}
      estimatedItemSize={900}
      showsVerticalScrollIndicator={false}
    />
  );
}