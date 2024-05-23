import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Pressable,
} from "react-native";
import { moderateScale } from "react-native-size-matters";
import { useQuery, useMutation } from "@apollo/client";
import { GET_CUSTOMER } from "../../api/mutation/customer";
import { DELETE_CUSTOMER_ADDRESS } from "../../api/mutation/address";
import { Feather, Fontisto, MaterialIcons } from "@expo/vector-icons";
import PageLoading from "../loading/PageLoading";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Swipeable } from "react-native-gesture-handler";

export default function AddressScreen({ navigation }) {
  const { loading, error, data, refetch: refetchProfile } = useQuery(GET_CUSTOMER);
  const [deleteCustomerAddress] = useMutation(DELETE_CUSTOMER_ADDRESS, {
    onCompleted: () => refetchProfile(),
    onError: (error) => Alert.alert("Error", error.message),
  });
  const insets = useSafeAreaInsets();

  if (loading) return <PageLoading />;
  if (error) return <Text>Error: {error.message}</Text>;

  const { activeCustomer } = data;

  const handleDelete = (id) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this address?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => deleteCustomerAddress({ variables: { id } }),
        },
      ]
    );
  };

  const renderRightActions = (id) => (
    <TouchableOpacity
      style={styles.deleteButton}
      onPress={() => handleDelete(id)}
    >
      <Text style={styles.deleteButtonText}>
        <MaterialIcons name="delete-outline" size={24} color="#fff" />
      </Text>
    </TouchableOpacity>
  );

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
        <View style={{ marginBottom: moderateScale(40) }}>
          {activeCustomer.addresses.map((address, index) => (
            <Swipeable
              key={index}
              renderRightActions={() => renderRightActions(address.id)}
            >
              <Pressable
                style={styles.addressContainer}
                onPress={() => {
                  navigation.navigate("AddressEdition", {
                    id: address.id,
                    fullName_navigation: address.fullName,
                    company_navigation: address.company,
                    streetLine1_navigation: address.streetLine1,
                    city_navigation: address.city,
                    province_navigation: address.province,
                    postalCode_navigation: address.postalCode,
                    countryCode_navigation: address.country.code,
                    phoneNumber_navigation: address.phoneNumber,
                  });
                }}
              >
                <Text style={styles.fullName}>{address.fullName}</Text>
                {address.company.length > 0 && <Text>{address.company}</Text>}
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
                  <Feather name="phone" size={14} color="#000" />{" "}
                  {address.phoneNumber}
                </Text>
              </Pressable>
            </Swipeable>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  deleteButton: {
    justifyContent: "center",
    alignItems: "center",
    width: moderateScale(80),
    marginHorizontal: moderateScale(10),
    marginTop: moderateScale(10),
    padding: moderateScale(10),
    backgroundColor: "red",
    borderRadius: moderateScale(10),
  },
  deleteButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  addressContainer: {
    marginHorizontal: moderateScale(10),
    marginTop: moderateScale(10),
    padding: moderateScale(10),
    backgroundColor: "#d3d3d3",
    borderRadius: moderateScale(10),
  },
  fullName: {
    fontSize: moderateScale(16),
    fontWeight: "bold",
    color: "#414141",
  },
});
