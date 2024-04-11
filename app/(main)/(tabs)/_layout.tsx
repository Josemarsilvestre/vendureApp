import { FontAwesome, Entypo, MaterialIcons, Feather } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import { ApolloProvider } from '@apollo/client';
import client from '../../../src/api/client';
import { Provider } from '../../../src/context/authContext';

export default function TabsLayout() {
  return (
    <ApolloProvider client={client}>
      <Provider>
        <Tabs
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
          <Tabs.Screen
            name="index"
            options={{
              title: 'Home',
              tabBarIcon: ({ color }) => <Entypo name="home" size={24} color={color} />
            }} />
          <Tabs.Screen
            name="category"
            options={{
              title: 'Categoria',
              tabBarIcon: ({ color }) => <MaterialIcons name="category" size={24} color={color} />
            }} />
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
      </Provider>
    </ApolloProvider>
  )
}
