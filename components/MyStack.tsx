import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

//Auth Pages
import LoginScreen from "./auth/login";
import RegisterScreen from "./auth/register";

import TabNavigator from "./Mytabs";

//Profile Screen
import OrderScreen from "./tab_profile/orders";
import FavoriteScreen from "./tab_profile/favorite";
import UserHistoryScreen from "./tab_profile/user-history";
import PersonalInfoScreen from "./tab_profile/personal-info";
import AddressScreen from "./tab_profile/address";
import EditeScreen from "./tab_profile/edit";

//Search
import SearchScreen from "./tab_category/search";

//Products
import ProductScreen from "./common_pages/product";
import CategorySectionScreen from "./common_pages/category_section";
import SubCategorySectionScreen from "./common_pages/sub_section/subCategory_section";

const Stack = createStackNavigator();

export default function MainStackNavigator() {
  const navigation = useNavigation();

  return (
    <Stack.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        animationEnabled: true,
        onAnimatedValueUpdate: () => {},
        gestureEnabled: true,
        gestureDirection: "horizontal",
        cardStyleInterpolator: ({ current: { progress } }) => ({
          cardStyle: {
            opacity: progress,
          },
        }),
      })}
    >
      <Stack.Screen name="TabNavigator" component={TabNavigator} />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
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
              style={{ marginLeft: 16 }}
              onPress={() => navigation.goBack()}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Edit"
        component={EditeScreen}
        options={{
          title: "Information",
          headerShown: true,
          headerLeft: () => (
            <Ionicons
              name="arrow-back"
              size={28}
              color="#000"
              style={{ marginLeft: 16 }}
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
              style={{ marginLeft: 16 }}
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
              style={{ marginLeft: 16 }}
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
              style={{ marginLeft: 16 }}
              onPress={() => navigation.goBack()}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Orders"
        component={OrderScreen}
        options={{
          title: "Orders",
          headerShown: true,
          headerLeft: () => (
            <Ionicons
              name="arrow-back"
              size={28}
              color="#000"
              style={{ marginLeft: 16 }}
              onPress={() => navigation.goBack()}
            />
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
              style={{ marginLeft: 16 }}
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
              style={{ marginLeft: 16 }}
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
              style={{ marginLeft: 16 }}
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
              style={{ marginLeft: 16 }}
              onPress={() => navigation.goBack()}
            />
          ),
        }}
      />
      <Stack.Screen
        name="SubCategorySection"
        component={SubCategorySectionScreen}
        options={{
          headerShown: true,
          headerLeft: () => (
            <Ionicons
              name="arrow-back"
              size={28}
              color="#000"
              style={{ marginLeft: 16 }}
              onPress={() => navigation.goBack()}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}
