import React, { useEffect } from "react";
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
import { GET_CUSTOMER } from "../../api/mutation/profile";
import { Customer } from "../../../utils/interface";
import { SHOW_ORDER } from "../../api/mutation/cart";

export default function ProfileScreen({ navigation }) {
  const { data, loading, error, refetch: refetchProfile } = useQuery(GET_CUSTOMER);
  const { refetch: refetchCart } = useQuery(SHOW_ORDER);

  const insets = useSafeAreaInsets();

  const profilePaths = [
    {
      name: "Account information",
      Icon: Icons.FontAwesome5,
      IconName: "user",
      path: "Information_account",
    },
    {
      name: "History",
      Icon: Icons.AntDesign,
      IconName: "shoppingcart",
      path: "History",
    },
    {
      name: "Address",
      Icon: Icons.MaterialIcons,
      IconName: "location-city",
      path: "Address",
    },
    {
      name: "Orders",
      Icon: Icons.SimpleLineIcons,
      IconName: "handbag",
      path: "Orders",
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

  useEffect(() => {
    refetchProfile()
    refetchCart()
  }, [activeCustomer, data, loading, error]);

  if (error) return <PageLoading />;

  const content = () => {
    return (
      <>
        {loading || !activeCustomer || !activeCustomer.firstName || !activeCustomer.lastName ? (
          <>
            <PageLoading />
          </>
        ) : (
          <ScrollView style={styles.container}>
            <View
              style={[styles.mainContainer, { paddingTop: insets.top + 20 }]}
            >
              <View style={styles.userInfoContainer}>
                <View style={styles.textContainer}>
                  <Text style={styles.name}>
                    {activeCustomer?.firstName + " " + activeCustomer?.lastName}
                  </Text>
                  <Text style={styles.platform}>
                    {activeCustomer?.emailAddress}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Settings")}
                >
                  <Icons.Feather
                    name="settings"
                    size={30}
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
                      size={24}
                      style={styles.icon}
                    />
                  </BoxLink>
                ))}
              </View>
            </View>
          </ScrollView>
        )}
      </>
    );
  };

  return <AuthScreen refetchProfile={refetchProfile} refetchCart={refetchCart}>{content()}</AuthScreen>;
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
    paddingHorizontal: moderateScale(16),
  },
  textContainer: {
    flex: 1,
    marginLeft: moderateScale(8),
  },
  name: {
    fontSize: moderateScale(20),
    fontWeight: "bold",
  },
  platform: {
    fontSize: moderateScale(16),
    color: "gray",
  },
  linkContainer: {
    marginTop: moderateScale(25),
    paddingHorizontal: moderateScale(10),
  },
  icon: {
    color: "gray",
  },
});
