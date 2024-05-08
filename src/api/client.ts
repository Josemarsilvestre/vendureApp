import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { VENDURE_URL } from '@env';

const httpLink = new HttpLink({
  uri: process.env.VENDURE_URL,
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;