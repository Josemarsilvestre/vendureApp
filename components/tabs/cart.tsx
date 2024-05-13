import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useQuery } from "@apollo/client";
import { moderateScale } from "react-native-size-matters";

import CartInfo from "../tab_cart/cartInfo";
import CartItem from "../tab_cart/cartItem";
import { Button } from "../common/Buttons";
import formatNumber from "../../utils/formatNumber";
import { SHOW_ORDER } from "../../src/api/graphql/cart";
import { FlashList } from "@shopify/flash-list";
import PageLoading from "../loading/PageLoading";

export default function CartScreen({ navigation }) {
  const { data, loading, error, refetch } = useQuery(SHOW_ORDER);
  const insets = useSafeAreaInsets();

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const order = data?.activeOrder;

  const refetchCart = () => {
    refetch();
  };

  const handleRoute = () => {
    console.log("Payment", "Go to Payment");
  };

  return (
    <View style={{ marginTop: insets.top }}>
      {loading ? (
        <>
          <PageLoading />
        </>
      ) : order && order.lines.length === 0 ? (
        <>
          <View
            style={[
              styles.scroolViewContainer,
              { marginTop: insets.top + 250 },
            ]}
          >
            <View style={styles.text_view}>
              <Text style={styles.text_}>
                Make purchases to get the best out of the app
              </Text>
            </View>
          </View>
        </>
      ) : (
        <>
          <ScrollView style={styles.scrollView}>
            <View style={styles.cartItemsContainer}>
              <View style={styles.cartTitleContainer}>
                <Text style={styles.cartTitleText}>Your Cart</Text>
                <Text>{order?.lines.length} items</Text>
              </View>
              <View style={styles.cartItems}>
                <FlashList
                  data={order?.lines}
                  renderItem={({ item }) => {
                    return (
                      <CartItem
                        item={item}
                        key={item.id}
                        refetchCart={refetchCart}
                      />
                    );
                  }}
                  estimatedItemSize={900}
                  showsVerticalScrollIndicator={false}
                />
              </View>
            </View>

            {/* cart Info */}
            <View style={styles.cartInfoContainer}>
              <CartInfo taxSummary={order?.taxSummary || []} />
            </View>
          </ScrollView>

          {/* to Shipping */}
          <View style={styles.bottomContainer}>
            <Text style={styles.totalText}>Total:</Text>
            <View style={styles.totalPriceContainer}>
              <Text style={styles.totalPriceWithTax}>
                {formatNumber(order?.totalWithTax)}€
              </Text>
              <Text style={styles.totalPrice}>
                {formatNumber(order?.total)}€
              </Text>
            </View>
            <Button style={styles.continueButton} onPress={handleRoute}>
              <Text>Continue</Text>
            </Button>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  scroolViewContainer: {
    margin: moderateScale(20),
    justifyContent: "center",
    alignItems: "center",
  },
  text_view: {
    justifyContent: "center",
    alignItems: "center",
  },
  text_: {
    fontSize: moderateScale(16),
  },
  scrollView: {
    backgroundColor: "white",
  },
  cartItemsContainer: {
    paddingVertical: 10,
    marginBottom: 1,
  },
  cartTitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  cartTitleText: {
    marginBottom: 2,
    fontSize: 14,
    fontWeight: "bold",
  },
  cartItems: {
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  cartInfoContainer: {
    paddingHorizontal: 5,
  },
  bottomContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 5,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  totalText: {
    fontWeight: "400",
    marginTop: -17,
  },
  totalPriceContainer: {
    flexDirection: "column",
    alignItems: "flex-end",
  },
  totalPriceWithTax: {
    fontSize: 14.5,
    marginRight: 2,
  },
  totalPrice: {
    fontSize: 12,
    marginRight: 2,
    color: "#97979A",
  },
  continueButton: {
    width: "50%",
    marginTop: 10,
  },
});
