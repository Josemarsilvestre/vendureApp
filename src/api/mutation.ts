import { gql } from '@apollo/client';

export const LOGIN_MUTATION = gql`
mutation($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    ... on CurrentUser {
      id
      identifier
    }
    ... on InvalidCredentialsError {
      errorCode
      message
    }
    ... on NativeAuthStrategyError {
      errorCode
      message
    }
    ... on ErrorResult {
      errorCode
      message
    }
  }
}
`;