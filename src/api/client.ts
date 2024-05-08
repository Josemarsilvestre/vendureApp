import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { API_URL } from '@env';

const httpLink = new HttpLink({
  uri: process.env.API_URL,
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;