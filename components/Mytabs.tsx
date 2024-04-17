import React, { useContext} from 'react';
import { FontAwesome, Entypo, MaterialIcons, Feather } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import FeedScreen from './tabs/index';
import CategoryScreen from './tabs/category';
import CartScreen from './tabs/cart';
import ProfileScreen from './tabs/profile';
import { Context } from '../src/context/authContext';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const { state } = useContext(Context);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#000000',
        tabBarActiveBackgroundColor: '#f0f0f0',
        tabBarInactiveBackgroundColor: '#f0f0f0',
        tabBarStyle: {
          backgroundColor: '#f0f0f0',
        },
        headerStyle: {
          backgroundColor: '#f0f0f0',
        },
      }}>
      <Tab.Screen
        name="Index"
        component={FeedScreen}
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Entypo name="home" size={24} color={color} />
        }}
      />
      <Tab.Screen
        name="Category"
        component={CategoryScreen}
        options={{
          title: 'Categoria',
          tabBarIcon: ({ color }) => <MaterialIcons name="category" size={24} color={color} />
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          title: 'Carrinho',
          tabBarIcon: ({ color }) => <Feather name="shopping-cart" size={24} color={color} />
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Conta',
          tabBarIcon: ({ color }) => <FontAwesome name="user" size={24} color={color} />,
          headerShown: state.isLogged ? false : true
        }}
      />
    </Tab.Navigator>
  )
}
