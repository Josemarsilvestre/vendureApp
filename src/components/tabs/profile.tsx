import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { moderateScale } from "react-native-size-matters";
import { useQuery } from "@apollo/client";

import Icons from "../common/Icons";
import BoxLink from "../common/BoxLink";
import AuthScreen from "../auth/auth";
import PageLoading from "../loading/PageLoading";
import { GET_CUSTOMER } from "../../api/mutation/customer";
import { Customer } from "../../../utils/interface";

export default function ProfileScreen({ navigation }) {
  const { data, loading, error } = useQuery(GET_CUSTOMER);

  const insets = useSafeAreaInsets();

  const profilePaths = [
    {
      name: "Account information",
      Icon: Icons.FontAwesome5,
      IconName: "user",
      path: "Information_account",
    },
    {
      name: "Purchase history",
      Icon: Icons.MaterialCommunityIcons,
      IconName: "shopping-outline",
      path: "History",
    },
    {
      name: "Address",
      Icon: Icons.MaterialIcons,
      IconName: "location-city",
      path: "Address",
    },
    {
      name: "Change password",
      Icon: Icons.Ionicons,
      IconName: "lock-closed-outline",
      path: "Password",
    },
    {
      name: "Favorites",
      Icon: Icons.Feather,
      IconName: "heart",
      path: "Favorite",
    },
  ];

  const activeCustomer: Customer | undefined = data?.activeCustomer || {
    id: "",
    firstName: "",
    lastName: "",
    emailAddress: "",
    phoneNumber: "",
  };

  if (error) return <Text>{error.message}</Text>;

  return (
    <AuthScreen navigation={navigation}>
      {loading || data?.activeCustomer === null ? (
        <PageLoading />
      ) : (
        <ScrollView style={styles.container}>
          <View style={[styles.mainContainer, { paddingTop: insets.top + 20 }]}>
            <View style={styles.userInfoContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.name}>
                  {activeCustomer?.firstName + " " + activeCustomer?.lastName}
                </Text>
                <Text style={styles.platform}>
                  {activeCustomer?.emailAddress}
                </Text>
              </View>
              <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
                <Icons.Feather
                  name="settings"
                  size={moderateScale(30, 0.1)}
                  color="black"
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.linkContainer}>
              {profilePaths.map((item, index) => (
                <BoxLink
                  key={index}
                  path={item.path}
                  name={item.name}
                  navigation={navigation}
                >
                  <item.Icon
                    name={item.IconName}
                    size={moderateScale(24, 0.1)}
                    style={styles.icon}
                  />
                </BoxLink>
              ))}
            </View>
          </View>
        </ScrollView>
      )}
    </AuthScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
  },
  userInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: moderateScale(16, 0.1),
  },
  textContainer: {
    flex: 1,
    marginLeft: moderateScale(8, 0.1),
  },
  name: {
    fontSize: moderateScale(20, 0.1),
    fontWeight: "bold",
  },
  platform: {
    fontSize: moderateScale(16, 0.1),
    color: "gray",
  },
  linkContainer: {
    marginTop: moderateScale(25, 0.1),
    paddingHorizontal: moderateScale(10, 0.1),
  },
  icon: {
    color: "gray",
  },
});
