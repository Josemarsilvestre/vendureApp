import React, { useState, useRef, useEffect } from "react";
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  useWindowDimensions,
  ActivityIndicator,
} from "react-native";
import { FlashList } from "@shopify/flash-list";
import { useMutation, useQuery } from "@apollo/client";

import ProductPrice from "../ProductPrice";
import Icons from "../../common/Icons";
import { Product } from "../../../../utils/interface";
import { Button } from "../../common/Buttons";
import { ADD_TO_CART } from "../../../api/mutation/order";
import { SHOW_ORDER } from "../../../api/mutation/order";
import { GET_PRODUCTS_BY_CATEGORY_QUERY } from "../../../api/mutation/category";
import styles from "./style/style.productCard";

export default function ProductCard({
  categoryID,
  navigation,
}: {
  categoryID: string;
  navigation: any;
}) {
  const windowWidth = useWindowDimensions().width;
  const imageWidth = windowWidth * 0.7;

  const [addedToCartMap, setAddedToCartMap] = useState<{ [key: string]: boolean }>({});

  const [addToCart] = useMutation(ADD_TO_CART);
  const { refetch } = useQuery(SHOW_ORDER);
  const [products, setProducts] = useState<Product[]>([]);
  const scrollViewRef = useRef<FlashList<Product>>(null);
  const [skip, setSkip] = useState(0);
  const take = 9;

  const { loading, data, fetchMore } = useQuery(GET_PRODUCTS_BY_CATEGORY_QUERY, {
    variables: {
      id: categoryID,
      skip,
      take,
    },
    onCompleted: (data) => {
      if (data) {
        const initialProducts = data?.collections?.items?.[0]?.productVariants?.items?.map((item: any) => item.product) || [];
        setProducts(initialProducts);
      }
    },
  });

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

  const handleLoadMore = () => {
    fetchMore({
      variables: {
        skip: products.length,
        take,
      },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        if (!fetchMoreResult || !fetchMoreResult.collections?.items || fetchMoreResult.collections.items.length === 0) {
          return prevResult;
        }

        const newProducts = fetchMoreResult.collections?.items?.[0]?.productVariants?.items?.map((item: any) => item.product) || [];

        setProducts((prevProducts) => [...prevProducts, ...newProducts]);

        return {
          ...prevResult,
          collections: {
            ...prevResult.collections,
            items: [
              {
                ...prevResult.collections.items[0],
                productVariants: {
                  ...prevResult.collections.items[0].productVariants,
                  items: [
                    ...prevResult.collections.items[0].productVariants.items,
                    ...(fetchMoreResult.collections.items[0]?.productVariants?.items || []),
                  ],
                },
              },
            ],
          },
        };
      },
    });
  };

  const handleScrollToTop = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToOffset({ offset: 0, animated: true });
    }
  };

  useEffect(() => {
    if (data) {
      const initialProducts = data?.collections?.items?.[0]?.productVariants?.items?.map((item: any) => item.product) || [];
      setProducts(initialProducts);
    }
  }, [data]);

  return (
    <View style={{ flex: 1 }}>
      <FlashList
        ref={scrollViewRef}
        data={products}
        renderItem={({ item, index }: { item: Product; index: number }) => {
          const items_ = data?.collections?.items?.[0]?.productVariants?.items?.[index];

          if (!items_) return null;

          return (
            <TouchableOpacity
              style={styles.container}
              onPress={() =>
                navigation.navigate("Products", {
                  products: data?.collections?.items?.[0]?.productVariants?.items,
                  selectedIndex: index,
                  productVariantId: items_?.id,
                })
              }
            >
              <View style={styles.cardContent} key={items_?.id}>
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
        ListHeaderComponent={<View style={{ height: 1 }} />}
        showsVerticalScrollIndicator={false}
        estimatedItemSize={900}
        ListFooterComponent={
          <View style={{ alignItems: "center" }}>
            {loading ? <ActivityIndicator size="large" /> : (
              <TouchableOpacity onPress={handleLoadMore} style={{marginBottom: 15}}>
                <Text style={{ color: '#1F2937', fontWeight: 'bold' }}>Load More</Text>
              </TouchableOpacity>
            )}
          </View>
        }
      />
      <TouchableOpacity onPress={handleScrollToTop} style={{ position: 'absolute', bottom: 20, right: 20 }}>
        <Icons.FontAwesome5 name="arrow-alt-circle-up" size={35} color="#3b4d68" />
      </TouchableOpacity>
    </View>
  );
}
