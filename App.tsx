import * as React from 'react';
import { StatusBar } from 'react-native';
import { ApolloProvider } from '@apollo/client';
import { NavigationContainer } from '@react-navigation/native';

import { Provider } from './src/context/context';
import { client } from './src/api/client';
import MainStackNavigator from './src/components/MyStack';

export default function App() {
    return (
        <ApolloProvider client={client}>
            <Provider>
                <NavigationContainer>
                    <StatusBar barStyle="dark-content" />
                    <MainStackNavigator />
                </NavigationContainer>
            </Provider>
        </ApolloProvider>
    );
}