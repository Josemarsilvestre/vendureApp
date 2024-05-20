import { gql } from "@apollo/client";

export const UPDATE_CUSTOMER = gql`
  mutation updateCustomer(
    $firstName: String!
    $lastName: String!
    $phoneNumber: String!
  ) {
    updateCustomer(
      input: {
        firstName: $firstName
        lastName: $lastName
        phoneNumber: $phoneNumber
      }
    ) {
      firstName
      lastName
      emailAddress
      phoneNumber
    }
  }
`;

export const UPDATE_CUSTOMER_PASSWORD = gql`
  mutation updateCustomerPassword(
    $currentPassword: String!
    $newPassword: String!
  ) {
    updateCustomerPassword(
      currentPassword: $currentPassword
      newPassword: $newPassword
    ) {
      ... on Success {
        success
      }
      ... on InvalidCredentialsError {
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

export const REQUEST_UPDATE_CUSTOMER_EMAIL_ADDRESS = gql`
  mutation requestUpdateCustomerEmailAddress(
    $password: String!
    $newEmailAddress: String!
  ) {
    requestUpdateCustomerEmailAddress(
      password: $password
      newEmailAddress: $newEmailAddress
    ) {
      ... on Success {
        success
      }
      ... on InvalidCredentialsError {
        errorCode
        message
      }
      ... on EmailAddressConflictError {
        errorCode
        message
      }
      ... on NativeAuthStrategyError {
        errorCode
        message
      }
    }
  }
`;

export const UPDATE_CUSTOMER_EMAIL_ADDRESS = gql`
  mutation updateCustomerEmailAddress($token: String!) {
    updateCustomerEmailAddress(token: $token) {
      ... on Success {
        success
      }
      ... on IdentifierChangeTokenInvalidError {
        errorCode
        message
      }
      ... on IdentifierChangeTokenExpiredError {
        errorCode
        message
      }
      ... on NativeAuthStrategyError {
        errorCode
        message
      }
    }
  }
`;

export const COUNTRY_CODE = gql`
  query GetCountryCode {
    availableCountries {
      name
      code
    }
  }
`;

export const CREATE_CUSTOMER_ADDRESS = gql`
  mutation createCustomerAddress(
    $fullName: String!
    $company: String!
    $streetLine1: String!
    $city: String!
    $province: String!
    $postalCode: String!
    $countryCode: String!
    $phoneNumber: String!
  ) {
    createCustomerAddress(
      input: {
        fullName: $fullName
        company: $company
        streetLine1: $streetLine1
        city: $city
        province: $province
        postalCode: $postalCode
        countryCode: $countryCode
        phoneNumber: $phoneNumber
      }
    ) {
      fullName
      company
      streetLine1
      city
      province
      postalCode
    }
  }
`;
