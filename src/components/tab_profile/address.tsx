import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { moderateScale, moderateVerticalScale } from "react-native-size-matters";
import { useQuery } from "@apollo/client";
import { GET_CUSTOMER } from "../../api/mutation/profile";
import { Feather, Fontisto } from "@expo/vector-icons";
import PageLoading from "../loading/PageLoading";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function AddressScreen() {
  const { loading, error, data } = useQuery(GET_CUSTOMER);
  const insets = useSafeAreaInsets();

  if (loading) return <PageLoading />;
  if (error) return <Text>Error: {error.message}</Text>;

  const { activeCustomer } = data;

  return (
    <ScrollView>
      {activeCustomer.addresses.length === 0 ? (
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginTop: insets.top + 250,
          }}
        >
          <Text style={{ fontSize: moderateScale(16) }}>
            No registered address
          </Text>
        </View>
      ) : (
        <View style={{marginBottom: moderateScale(40)}}>
          {activeCustomer.addresses.map((address, index) => (
            <TouchableOpacity
              key={index}
              style={{
                marginVertical: moderateScale(20),
                marginHorizontal: moderateScale(10),
                padding: moderateScale(10),
                backgroundColor: "#d3d3d3",
                borderRadius: moderateScale(10),
                marginBottom: moderateScale(-8)
              }}
            >
              <Text
                style={{
                  fontSize: moderateScale(16),
                  fontWeight: "bold",
                  color: "#414141",
                }}
              >
                {address.fullName}
              </Text>
              {address.company.length === 0 ? (
                <></>
              ) : (
                <Text>{address.company}</Text>
              )}

              <Text>{address.streetLine1}</Text>
              <Text>
                {address.city}, {address.province}
              </Text>
              <Text>{address.postalCode}</Text>
              <Text>
                <Fontisto name="world-o" size={14} color="#000" />{" "}
                {address.country.name}
              </Text>
              <Text>
                <Feather
                  name="phone"
                  size={14}
                  color="#000"
                  style={{ marginBottom: moderateScale(50) }}
                />{" "}
                {address.phoneNumber}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </ScrollView>
  );
}
