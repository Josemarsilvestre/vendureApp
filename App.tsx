import * as React from 'react';
import ApolloProviderWrapper from './api/ApolloProviderWrapper'
import TabsLayout from './components/Mytabs'

export default function App() {
    return (
        <ApolloProviderWrapper>
            <TabsLayout />
        </ApolloProviderWrapper>
    );
}