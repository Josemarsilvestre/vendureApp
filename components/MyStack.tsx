import React from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from '@expo/vector-icons';

import LoginScreen from "./auth/login";
import RegisterScreen from "./auth/register";
import ProfileScreen from "./tabs";

const Stack = createStackNavigator();
const navigation = useNavigation()

const MainStackNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="LoginScreen"
                    component={LoginScreen}
                    options={{
                        title: 'Conta',
                        headerBackTitleVisible: false,
                    }} />
                <Stack.Screen
                    name="RegisterScreen"
                    component={RegisterScreen}
                    options={{
                        title: 'Registe-se',
                        headerBackTitleVisible: false,
                        headerTintColor: '#212B36',
                        headerStyle: {
                            backgroundColor: '#f0f0f0',
                        },
                        headerLeft: () => (
                            <Ionicons
                                name="arrow-back"
                                size={28}
                                color="#000"
                                onPress={() => {
                                    navigation.goBack();
                                }}
                            />
                        ),
                    }} />
                <Stack.Screen
                    name="ProfileScreen"
                    component={ProfileScreen}
                    options={{
                        headerShown: false,
                    }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export { MainStackNavigator };