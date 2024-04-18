import * as React from 'react';
import { StatusBar, LogBox } from 'react-native';
import { ApolloProvider } from '@apollo/client';
import { NavigationContainer } from '@react-navigation/native';

import { Provider } from './src/context/authContext';
import client from './src/api/client';
import MainStackNavigator from './components/MyStack';

LogBox.ignoreLogs(['Sending `onAnimatedValueUpdate` with no listeners registered']);

export default function App() {
    return (
        <NavigationContainer>
            <ApolloProvider client={client}>
                <Provider>
                    <StatusBar barStyle="dark-content" />
                    <MainStackNavigator />
                </Provider>
            </ApolloProvider>
        </NavigationContainer>
    );
}