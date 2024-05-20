import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Entypo,
  MaterialIcons,
  Feather,
  FontAwesome,
} from "@expo/vector-icons";
import Icons from "./common/Icons";

import FeedScreen from "./tabs/index";
import CategoryScreen from "./tabs/category";
import CartScreen from "./tabs/cart";
import ProfileScreen from "./tabs/profile";
import FeedHeader from "./tab_home/FeedHeader";

import { Context } from "../context/context";

const Tab = createBottomTabNavigator();

export default function TabNavigator({ navigation }) {
  const { state } = useContext(Context);

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
            <Entypo name="home" size={24} color={color} />
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
            <MaterialIcons name="category" size={24} color={color} />
          ),
          headerRight: () => (
            <>
              <Icons.EvilIcons
                name="search"
                size={35}
                color="#1F2937"
                onPress={() => navigation.navigate("Search")}
                style={{ padding: 10 }}
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
            <Feather name="shopping-cart" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user" size={24} color={color} />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}
