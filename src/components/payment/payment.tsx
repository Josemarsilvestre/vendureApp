import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import { moderateScale } from "react-native-size-matters";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useMutation, useQuery } from "@apollo/client";
import { FlashList } from "@shopify/flash-list";

import { GET_CUSTOMER } from "../../api/mutation/customer";
import CartItem from "../tab_cart/cartItem";
import styles from "./style/styles.payment";
import AuthScreen from "../auth/auth";
import {
  ADD_PAYMENT_TO_ORDER,
  GET_METHOD_SHIPPING,
  SET_ORDER_SHIPPING_ADDRESS,
  SET_ORDER_SHIPPING_METHOD,
  TRANSITION_ORDER_TO_ARRAINGING_PAYMENT,
} from "../../api/mutation/payments";
import { Feather, Fontisto } from "@expo/vector-icons";
import { SHOW_ORDER } from "../../api/mutation/order";
import formatNumber from "../../../utils/formatNumber";
import Icons from "../common/Icons";
import PageLoading from "../loading/PageLoading";
import { Address, ShippingMethod, OrderLine } from "../../../utils/interface";

export default function PaymentScreen({ navigation }) {
  const { data, refetch: refetchCustomer } = useQuery(GET_CUSTOMER);
  const { data: DataOrder, refetch: refetchCart } = useQuery(SHOW_ORDER);
  const insets = useSafeAreaInsets();

  const order = DataOrder?.activeOrder || {};

  const activeCustomer = data?.activeCustomer;
  const addresses: Address[] = activeCustomer?.addresses || [];

  const { data: DataShipping, loading: loadingShipping } = useQuery(
    GET_METHOD_SHIPPING,
    {
      onCompleted: (data) => {
        if (
          data &&
          data.eligibleShippingMethods &&
          data.eligibleShippingMethods.length > 0
        ) {
          setSelectedShippingMethod(data.eligibleShippingMethods[0]);
        }
      },
    }
  );

  const shippingMethods = DataShipping?.eligibleShippingMethods || [];

  const firstAddressId = addresses.length > 0 ? addresses[0].id : null;
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(
    firstAddressId
  );

  const [selectedShippingMethod, setSelectedShippingMethod] =
    useState<ShippingMethod | null>(null);

  const [setOrderShippingAddress] = useMutation(SET_ORDER_SHIPPING_ADDRESS);
  const [setOrderShippingMethod] = useMutation(SET_ORDER_SHIPPING_METHOD);
  const [transitionOrderToArraingingPayment] = useMutation(
    TRANSITION_ORDER_TO_ARRAINGING_PAYMENT
  );
  const [addPaymentToOrder] = useMutation(ADD_PAYMENT_TO_ORDER);

  const handleCreateOrder = async () => {
    if (!selectedAddressId || !selectedShippingMethod) {
      Alert.alert(
        "Shipping information missing",
        "Please select a shipping address and method."
      );
      return;
    }

    const selectedAddress = addresses.find(
      (address) => address.id === selectedAddressId
    );
    if (!selectedAddress) {
      Alert.alert(
        "Address information missing",
        "Please add a address in your account."
      );
      return;
    }

    try {
      await setOrderShippingAddress({
        variables: {
          fullName: selectedAddress.fullName,
          company: selectedAddress.company,
          streetLine1: selectedAddress.streetLine1,
          city: selectedAddress.city,
          province: selectedAddress.province,
          postalCode: selectedAddress.postalCode,
          countryCode: selectedAddress.country.code,
          phoneNumber: selectedAddress.phoneNumber,
        },
      });
    } catch (error) {
      console.error("Error setting shipping address:", error);
      return;
    }

    const selectedMethodId = selectedShippingMethod?.id;

    try {
      await setOrderShippingMethod({
        variables: {
          id: selectedMethodId,
        },
      });
    } catch (error) {
      console.error("Error setting shipping method:", error);
      return;
    }

    try {
      await transitionOrderToArraingingPayment({
        variables: { state: "ArrangingPayment" },
      });
    } catch (error) {
      console.error("Error transitioning order to ArrangingPayment:", error);
    }

    try {
      await addPaymentToOrder({
        variables: { method: "standard-payment" },
      });

      navigation.navigate("PaymentConfirmationScreen");
      refetchCart();
      refetchCustomer();
    } catch (error) {
      console.error("Error transitioning order to ArrangingPayment:", error);
    }
  };

  const selectedMethodPrice = selectedShippingMethod?.price;

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const [loading, setLoading] = useState(true);

  if (loading || loadingShipping) return <PageLoading />;

  return (
    <AuthScreen navigation={navigation}>
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.section}>
            <Text style={styles.title}>Contact Information</Text>
            <View
              style={{
                borderWidth: 1,
                borderColor: "#e0e0e0",
                borderRadius: 10,
                paddingVertical: 10,
                paddingHorizontal: 10,
              }}
            >
              <Text>
                {activeCustomer?.firstName + " " + activeCustomer?.lastName}
              </Text>
              <Text>{activeCustomer?.emailAddress}</Text>
            </View>

            <View style={{ marginBottom: 10 }} />

            <Text style={styles.title}>Shopping</Text>
            <View style={styles.cartItems}>
              <FlashList<OrderLine>
                data={order?.lines}
                renderItem={({ item }) => (
                  <CartItem
                    item={item}
                    key={item.id}
                    refetchCart={refetchCart}
                  />
                )}
                estimatedItemSize={900}
                contentContainerStyle={{ paddingBottom: 0 }}
              />
            </View>

            <View style={{ marginBottom: 10 }} />
            <Text style={styles.title}>Address</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {addresses.map((address) => (
                <TouchableOpacity
                  key={address.id}
                  style={[
                    styles.addressContainer,
                    selectedAddressId === address.id &&
                      styles.selectedAddressContainer,
                  ]}
                  onPress={() => setSelectedAddressId(address.id)}
                >
                  <Text>{address.fullName}</Text>
                  <Text>
                    {address.city}, {address.province}
                  </Text>
                  <Text>{address.streetLine1}</Text>
                  <Text>{address.postalCode}</Text>
                  <Text>
                    <Fontisto name="world-o" size={14} color="#000" />{" "}
                    {address.country.name}
                  </Text>
                  <Text>
                    <Feather name="phone" size={14} color="#000" />{" "}
                    {address.phoneNumber}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <View style={styles.productsContainer}>
              <Text style={styles.title}>Shipping Methods</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {shippingMethods &&
                  shippingMethods.map((method, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.shippingMethod,
                        selectedShippingMethod === method &&
                          styles.selectedShippingMethod,
                      ]}
                      onPress={() => setSelectedShippingMethod(method)}
                    >
                      <Text style={styles.methodName}>{method.name}</Text>
                      <Text style={styles.methodPrice}>
                        Price: {formatNumber(method.price)}€
                      </Text>
                    </TouchableOpacity>
                  ))}
              </ScrollView>
            </View>

            <View style={{ marginBottom: 10 }} />
            <Text style={styles.title}>Order Summary</Text>
            <View
              style={{
                marginTop: moderateScale(8),
              }}
            >
              <View style={styles.infoRow}>
                <Text style={styles.label}>Subtotal</Text>
                <View style={styles.priceContainer}>
                  <Text>{formatNumber(order.totalWithTax)}</Text>
                  <Text style={styles.currency}>€</Text>
                </View>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Shipping</Text>
                <View style={styles.priceContainer}>
                  <Text>
                    {selectedMethodPrice
                      ? formatNumber(selectedMethodPrice)
                      : "selected a shipping method"}
                    €
                  </Text>
                </View>
              </View>
              <View style={[styles.infoRow, { borderBottomColor: "#fff" }]}>
                <Text style={styles.label}>Total</Text>
                <View style={styles.priceContainer}>
                  <Text>
                    {formatNumber(
                      order.totalWithTax + (selectedMethodPrice || 0)
                    )}
                  </Text>
                  <Text style={styles.currency}>€</Text>
                </View>
              </View>
              <Text style={styles.title}>Payment Information</Text>
              <View>
                <Text style={styles.label}>
                  This is a fictitious payment for demonstration purposes only.
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
        <View
          style={[
            styles.bottomContainer,
            { paddingBottom: insets.bottom, paddingTop: 65 },
          ]}
        >
          <TouchableOpacity
            onPress={handleCreateOrder}
            style={styles.payButton}
          >
            <Icons.MaterialIcons
              name="payment"
              size={25}
              style={{ color: "#fff" }}
            />
            <Text style={styles.addToCartButtonText}>Pay</Text>
          </TouchableOpacity>
        </View>
      </View>
    </AuthScreen>
  );
}
