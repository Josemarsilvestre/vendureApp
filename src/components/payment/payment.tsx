import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { moderateScale } from "react-native-size-matters";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useQuery } from "@apollo/client";

import { GET_CUSTOMER } from "../../api/mutation/customer";
import CartItem from "../tab_cart/cartItem";
import styles from "./style/styles.payment";
import AuthScreen from "../auth/auth";
import { GET_METHOD_SHIPPING } from "../../api/mutation/payments";
import { Feather, Fontisto } from "@expo/vector-icons";
import { SHOW_ORDER } from "../../api/mutation/order";
import formatNumber from "../../../utils/formatNumber";
import { OrderLine } from "../../../utils/interface";
import Icons from "../common/Icons";
import { FlashList } from "@shopify/flash-list";
import PageLoading from "../loading/PageLoading";

interface Address {
  id: number;
  fullName: string;
  company: string;
  streetLine1: string;
  city: string;
  province: string;
  postalCode: string;
  country: {
    name: string;
    code: string;
  };
  phoneNumber: string;
}

export default function PaymentScreen({ navigation }) {
  const { data } = useQuery(GET_CUSTOMER);
  const { data: DataOrder, refetch: refetchCart } = useQuery(SHOW_ORDER);
  const insets = useSafeAreaInsets();

  const order = DataOrder?.activeOrder || {};

  const activeCustomer = data?.activeCustomer;
  const addresses: Address[] = activeCustomer?.addresses || [];

  const { data: DataShipping } = useQuery(GET_METHOD_SHIPPING);
  const shippingMethods = DataShipping?.eligibleShippingMethods || [];

  const firstAddressId = addresses.length > 0 ? addresses[0].id : null;
  const firstShippingMethod =
    shippingMethods.length > 0 ? shippingMethods[0].name : null;
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(
    firstAddressId
  );
  const [selectedShippingMethod, setSelectedShippingMethod] = useState<
    string | null
  >(firstShippingMethod);

  const handleCreateOrder = () => {
    console.log("Pay");
  };

  const selectedMethodPrice =
    selectedShippingMethod &&
    shippingMethods &&
    shippingMethods.find((method) => method.name === selectedShippingMethod)
      ?.price;

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const [loading, setLoading] = useState(true);

  if (loading) return <PageLoading />
  
  return (
    <AuthScreen navigation={navigation}>
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.section}>
            <View style={styles.header}>
              <View style={styles.headerContent}>
                <TouchableOpacity style={styles.headerLink}>
                  <Icons.AntDesign
                    name="shoppingcart"
                    size={18}
                    style={styles.headerIconInactive}
                  />
                  <Text style={styles.headerTextInactive}>cart</Text>
                </TouchableOpacity>

                <View style={styles.headerDivider} />
                <View style={styles.headerActive}>
                  <Icons.AntDesign
                    name="wallet"
                    size={16}
                    style={styles.headerIconActive}
                  />
                  <Text style={styles.headerTextActive}>Payment Method</Text>
                </View>
              </View>
            </View>

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
                        selectedShippingMethod === method.name &&
                          styles.selectedShippingMethod,
                      ]}
                      onPress={() => setSelectedShippingMethod(method.name)}
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
                      : "No shipping method selected"}
                    €
                  </Text>
                </View>
              </View>
              <View style={[styles.infoRow, { borderBottomColor: "#fff" }]}>
                <Text style={styles.label}>Total</Text>
                <View style={styles.priceContainer}>
                  <Text>
                    {formatNumber(order.totalWithTax + selectedMethodPrice)}
                  </Text>
                  <Text style={styles.currency}>€</Text>
                </View>
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
