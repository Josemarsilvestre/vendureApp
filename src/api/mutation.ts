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

export const REGISTER_MUTATION = gql`
  mutation($emailAddress: String!, $firstName: String!, $lastName: String!, $password: String!) {
    registerCustomerAccount(input: {
      emailAddress: $emailAddress,
      firstName: $firstName,
      lastName: $lastName,
      password: $password
    }) {
      ... on Success {
        success
      }
      ... on MissingPasswordError {
        errorCode
        message
      }
      ... on PasswordValidationError {
        errorCode
        message
        validationErrorMessage
      }
      ... on NativeAuthStrategyError {
        errorCode
        message
      }
    }
  }
`;