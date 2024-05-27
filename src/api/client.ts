import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import * as SecureStore from "expo-secure-store";

const API = `${process.env.API_URL}`;

// If using bearer-token based session management, we'll store the token
// in localStorage using this key.
const AUTH_TOKEN_KEY = 'token';

let channelToken: string | undefined;
let languageCode: string | undefined;

const httpLink = new HttpLink({
  uri: () => {
      if (languageCode) {
          return `${API}?languageCode=${languageCode}`;
      } else {
          return API;
      }
  },
  // This is required if using cookie-based session management,
  // so that any cookies get sent with the request.
  credentials: 'include',
});

// This part is used to check for and store the session token
// if it is returned by the server.
const afterwareLink = new ApolloLink((operation, forward) => {
  return forward(operation).map((response) => {
      const context = operation.getContext();
      const authHeader = context.response.headers.get('vendure-auth-token');
      if (authHeader) {
          // If the auth token has been returned by the Vendure
          // server, we store it in localStorage
          SecureStore.setItem(AUTH_TOKEN_KEY, authHeader);
      }
      return response;
  });
});

/**
* Used to specify a channel token for projects that use
* multiple Channels.
*/
export function setChannelToken(value: string | undefined) {
  channelToken = value;
}

/**
* Used to specify a language for any localized results.
*/
export function setLanguageCode(value: string | undefined) {
  languageCode = value;
}

export const client = new ApolloClient({
  link: ApolloLink.from([
      setContext((request, operation) => {
          const authToken = SecureStore.getItem(AUTH_TOKEN_KEY);
          let headers: Record<string, any> = {};
          if (authToken) {
              headers.authorization = `Bearer ${authToken}`;
          }
          if (channelToken) {
              headers['vendure-token'] = channelToken;
          }
          return { headers };
      }),
      afterwareLink,
      httpLink,
  ]),
  cache: new InMemoryCache(),
});
