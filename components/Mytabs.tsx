import { FontAwesome, Entypo, MaterialIcons, Feather } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import FeedScreen from './tabs';
import CategoryScreen from './tabs';
import CartScreen from './tabs';
import ProfileScreen from './tabs';

const Tab = createBottomTabNavigator();

export default function TabsLayout() {

  return (
    <NavigationContainer>
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
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => <Entypo name="home" size={24} color={color} />
          }}
          component={FeedScreen} />
        <Tab.Screen
          name="category"
          options={{
            title: 'Categoria',
            tabBarIcon: ({ color }) => <MaterialIcons name="category" size={24} color={color} />
          }}
          component={CategoryScreen} />
        <Tab.Screen
          name="cart"
          options={{
            title: 'Carrinho',
            tabBarIcon: ({ color }) => <Feather name="shopping-cart" size={24} color={color} />
          }}
          component={CartScreen}
        />
        <Tab.Screen
          name="profile"
          options={{
            title: 'Conta',
            tabBarIcon: ({ color }) => <FontAwesome name="user" size={24} color={color} />
          }}
          component={ProfileScreen}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
