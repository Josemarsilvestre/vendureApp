import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Entypo,
  MaterialIcons,
  Feather,
  FontAwesome,
} from "@expo/vector-icons";
import Icons from "./common/Icons";
import { useQuery } from "@apollo/client";
import { moderateScale } from "react-native-size-matters";

import FeedScreen from "./tabs/index";
import CategoryScreen from "./tabs/category";
import CartScreen from "./tabs/cart";
import ProfileScreen from "./tabs/profile";
import FeedHeader from "./tab_home/FeedHeader";
import { SHOW_ORDER } from "../api/mutation/order";
import { GET_CUSTOMER } from "../api/mutation/customer";

const Tab = createBottomTabNavigator();

export default function TabNavigator({ navigation }) {
  const { refetch: refetchCart } = useQuery(SHOW_ORDER);
  const { refetch: refetchProfile } = useQuery(GET_CUSTOMER);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      refetchCart();
      refetchProfile();
    });

    return unsubscribe;
  }, [navigation, refetchCart, refetchProfile]);

  return (
    <Tab.Navigator
      initialRouteName="Index"
      screenOptions={{
        tabBarActiveTintColor: "#000000",
        tabBarActiveBackgroundColor: "#f0f0f0",
        tabBarInactiveBackgroundColor: "#f0f0f0",
        tabBarStyle: {
          backgroundColor: "#f0f0f0",
        },
        headerStyle: {
          backgroundColor: "#f0f0f0",
        },
      }}
    >
      <Tab.Screen
        name="Index"
        component={FeedScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <Entypo name="home" size={moderateScale(23, 0.1)} color={color} />
          ),
          header: () => (
            <FeedHeader
              navigation={navigation}
              isIndexScreen={true}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Category"
        component={CategoryScreen}
        options={{
          title: "Category",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="category" size={moderateScale(23, 0.1)} color={color} />
          ),
          headerRight: () => (
            <>
              <Icons.EvilIcons
                name="search"
                size={moderateScale(35, 0.1)}
                color="#1F2937"
                onPress={() => navigation.navigate("Search")}
                style={{ padding: moderateScale(10, 0.1) }}
              />
            </>
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          title: "Cart",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Feather name="shopping-cart" size={moderateScale(22, 0.1)} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user" size={moderateScale(23, 0.1)} color={color} />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}