import React from 'react';
import { ApolloProvider } from '@apollo/client';
import AuthContextApollo from './authContextApollo';
import client from './client';

interface ApolloProviderWrapperProps {
  children: React.ReactNode;
}

const ApolloProviderWrapper: React.FC<ApolloProviderWrapperProps> = ({ children }) => {
  const [isLogged, setIsLogged] = React.useState<boolean>(false);

  return (
    <ApolloProvider client={client}>
      <AuthContextApollo.Provider value={{ isLogged, setIsLogged }}>
        {children}
      </AuthContextApollo.Provider>
    </ApolloProvider>
  );
};

export default ApolloProviderWrapper;


/**import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './client';

interface Provider_ {
    children: React.ReactNode;
  }

// Componente que envolve o aplicativo com o ApolloProvider e fornece o cliente Apollo
export default function ApolloProviderWrapper({ children }: Provider_) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}; */