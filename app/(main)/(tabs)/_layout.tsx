import { FontAwesome, Entypo, MaterialIcons, Feather } from '@expo/vector-icons'
import { Tabs } from 'expo-router'

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#000000'
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Entypo name="home" size={24} color={color} />
        }}/>
      <Tabs.Screen
        name="category"
        options={{
          title: 'Categoria',
          tabBarIcon: ({ color }) => <MaterialIcons name="category" size={24} color={color} />
        }}/>
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Carrinho',
          tabBarIcon: ({ color }) => <Feather name="shopping-cart" size={24} color={color} />
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Conta',
          tabBarIcon: ({ color }) => <FontAwesome name="user" size={24} color={color} />
        }}
      />
    </Tabs>
  )
}
