import React, { useCallback } from "react";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { BackHandler, TouchableOpacity } from "react-native";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { moderateScale } from "react-native-size-matters";

// Auth Pages
import LoginScreen from "./auth/login";
import RegisterScreen from "./auth/register";
import AccountCreatedScreen from "./auth/accountcreated";

// Profile Screen
import FavoriteScreen from "./tab_profile/favorite";
import UserHistoryScreen from "./tab_profile/purchaseHistory/purchaseHistory";
import PersonalInfoScreen from "./tab_profile/personal-info";
import AddressScreen from "./tab_profile/address";
import PasswordScreen from "./tab_profile/password";

// Search
import SearchScreen from "./tab_category/search";

// Products
import ProductScreen from "./common_pages/product/product";
import CategorySectionScreen from "./common_pages/category/category_section";
import ProductSearchedScreen from "./product/productSearched";

// Settings
import SettingScreen from "./tab_profile/settings";

// Payment
import PaymentScreen from "./payment/payment";
import PaymentConfirmationScreen from "./payment/paymentconfirmation";
import AddressEdition from "./common_pages/address/address_add_or_edit";

// Tab Navigator
import TabNavigator from "./Mytabs";

type RootStackParamList = {
  TabNavigator: undefined;
  Login: undefined;
  Register: undefined;
  Settings: undefined;
  Information_account: undefined;
  Password: undefined;
  History: undefined;
  AddressEdition: {
    id: number;
    fullName_navigation: string;
    company_navigation: string;
    streetLine1_navigation: string;
    city_navigation: string;
    province_navigation: string;
    postalCode_navigation: string;
    countryCode_navigation: string;
    phoneNumber_navigation: string;
  };
  Address: undefined;
  Favorite: undefined;
  Search: undefined;
  ProductSearched: undefined;
  Products: undefined;
  CategorySection: undefined;
  Payments: undefined;
  PaymentConfirmationScreen: undefined;
  AccountCreatedScreen: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

function PaymentConfirmationScreenWrapper({ navigation }) {
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [])
  );

  return <PaymentConfirmationScreen navigation={navigation}/>;
}

function AccountCreatedScreenWrapper({ navigation }) {
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [])
  );

  return <AccountCreatedScreen navigation={navigation}/>;
}

export default function MainStackNavigator() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const style_fix = { marginLeft: moderateScale(16) };

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: "horizontal",
        cardStyleInterpolator: ({ current: { progress } }) => ({
          cardStyle: {
            opacity: progress,
          },
        }),
      }}
    >
      <Stack.Screen name="TabNavigator" component={TabNavigator} />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerShown: false,
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          title: "Register an account",
          headerBackTitleVisible: false,
          headerShown: true,
          headerTintColor: "#212B36",
          headerStyle: {
            backgroundColor: "#f0f0f0",
          },
          headerLeft: () => (
            <Ionicons
              name="arrow-back"
              size={28}
              color="#000"
              style={style_fix}
              onPress={() => navigation.goBack()}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingScreen}
        options={{
          title: "Settings",
          headerShown: true,
          headerLeft: () => (
            <Ionicons
              name="arrow-back"
              size={28}
              color="#000"
              style={style_fix}
              onPress={() => navigation.goBack()}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Information_account"
        component={PersonalInfoScreen}
        options={{
          title: "Account information",
          headerShown: true,
          headerLeft: () => (
            <Ionicons
              name="arrow-back"
              size={28}
              color="#000"
              style={style_fix}
              onPress={() => navigation.goBack()}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Password"
        component={PasswordScreen}
        options={{
          title: "Security",
          headerShown: true,
          headerLeft: () => (
            <Ionicons
              name="arrow-back"
              size={28}
              color="#000"
              style={style_fix}
              onPress={() => navigation.goBack()}
            />
          ),
        }}
      />
      <Stack.Screen
        name="History"
        component={UserHistoryScreen}
        options={{
          title: "History",
          headerShown: true,
          headerLeft: () => (
            <Ionicons
              name="arrow-back"
              size={28}
              color="#000"
              style={style_fix}
              onPress={() => navigation.goBack()}
            />
          ),
        }}
      />
      <Stack.Screen
        name="AddressEdition"
        component={AddressEdition}
        options={{
          title: "Address edition",
          headerShown: true,
          headerLeft: () => (
            <Ionicons
              name="arrow-back"
              size={28}
              color="#000"
              style={style_fix}
              onPress={() => navigation.goBack()}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Address"
        component={AddressScreen}
        options={{
          title: "Address",
          headerShown: true,
          headerLeft: () => (
            <Ionicons
              name="arrow-back"
              size={28}
              color="#000"
              style={style_fix}
              onPress={() => navigation.goBack()}
            />
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("AddressEdition", {
                  id: 0,
                  fullName_navigation: "",
                  company_navigation: "",
                  streetLine1_navigation: "",
                  city_navigation: "",
                  province_navigation: "",
                  postalCode_navigation: "",
                  countryCode_navigation: "",
                  phoneNumber_navigation: "",
                });
              }}
            >
              <Entypo
                name="add-to-list"
                size={28}
                color="#000"
                style={{ marginRight: moderateScale(16) }}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="Favorite"
        component={FavoriteScreen}
        options={{
          title: "Favorite",
          headerShown: true,
          headerLeft: () => (
            <Ionicons
              name="arrow-back"
              size={28}
              color="#000"
              style={style_fix}
              onPress={() => navigation.goBack()}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{
          title: "Search",
          headerShown: true,
          headerLeft: () => (
            <Ionicons
              name="arrow-back"
              size={28}
              color="#000"
              style={style_fix}
              onPress={() => navigation.goBack()}
            />
          ),
        }}
      />
      <Stack.Screen
        name="ProductSearched"
        component={ProductSearchedScreen}
        options={{
          title: "Loading...",
          headerShown: true,
          headerLeft: () => (
            <Ionicons
              name="arrow-back"
              size={28}
              color="#000"
              style={style_fix}
              onPress={() => navigation.goBack()}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Products"
        component={ProductScreen}
        options={{
          headerShown: true,
          headerLeft: () => (
            <Ionicons
              name="arrow-back"
              size={28}
              color="#000"
              style={style_fix}
              onPress={() => navigation.goBack()}
            />
          ),
        }}
      />
      <Stack.Screen
        name="CategorySection"
        component={CategorySectionScreen}
        options={{
          headerShown: true,
          headerLeft: () => (
            <Ionicons
              name="arrow-back"
              size={28}
              color="#000"
              style={style_fix}
              onPress={() => navigation.goBack()}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Payments"
        component={PaymentScreen}
        options={{
          headerShown: true,
          headerLeft: () => (
            <Ionicons
              name="arrow-back"
              size={28}
              color="#000"
              style={style_fix}
              onPress={() => navigation.goBack()}
            />
          ),
        }}
      />
      <Stack.Screen
        name="PaymentConfirmationScreen"
        component={PaymentConfirmationScreenWrapper}
        options={{
          title: "Payment",
          headerShown: true,
          headerLeft: () => null,
          gestureEnabled: false
        }}
      />
      <Stack.Screen
        name="AccountCreatedScreen"
        component={AccountCreatedScreenWrapper}
        options={{
          title: "Account Created",
          headerShown: true,
          headerLeft: () => null,
          gestureEnabled: false
        }}
      />
    </Stack.Navigator>
  );
}
