import * as React from 'react';
import { ApolloProvider } from '@apollo/client';
import { NavigationContainer } from '@react-navigation/native';

import { Provider } from './src/context/authContext';
import client from './src/api/client';
import MainStackNavigator from './components/MyStack';

export default function App() {
    return (
        <NavigationContainer>
            <ApolloProvider client={client}>
                <Provider>
                    <MainStackNavigator />
                </Provider>
            </ApolloProvider>
        </NavigationContainer>
    );
}