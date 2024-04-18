import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation  } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import LoginScreen from "./auth/login";
import RegisterScreen from "./auth/register";
import TabNavigator from "./MyTabs";
import OrderScreen from "./profile/orders";
import FavoriteScreen from "./profile/favorite";
import UserHistoryScreen from "./profile/user-history";
import PersonalInfoScreen from "./profile/personal-info";
import AddressScreen from "./profile/address";
import EditeScreen from "./profile/edit";

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
        </Stack.Navigator>
    );
};
