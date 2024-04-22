import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation  } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

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
import SerachScreen from "./pages/search";

const Stack = createStackNavigator();

export default function MainStackNavigator() {
    const navigation = useNavigation();

    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false}}>
            <Stack.Screen
                name="TabNavigator"
                component={TabNavigator}
            />
            <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{
                    headerBackTitleVisible: false
                }}
            />
            <Stack.Screen
                name="Register"
                component={RegisterScreen}
                options={{
                    title: 'Registe-se',
                    headerBackTitleVisible: false,
                    headerShown: true,
                    headerTintColor: '#212B36',
                    headerStyle: {
                        backgroundColor: '#f0f0f0',
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
                    title: 'Editar',
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
                    title: 'Informações da conta',
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
                    title: 'Histórico',
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
                    title: 'Morada',
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
                    title: 'Pedidos',
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
                    title: 'Favoritos',
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
                component={SerachScreen}
                options={{
                    title: 'Pesquisar...',
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
};
