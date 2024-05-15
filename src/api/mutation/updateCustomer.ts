import { graphql } from "../../gql";

export const UPDATE_CUSTOMER = graphql(`
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
`);

export const UPDATE_CUSTOMER_PASSWORD = graphql(`
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
`);

export const REQUEST_UPDATE_CUSTOMER_EMAIL_ADDRESS = graphql(`
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
`);

export const UPDATE_CUSTOMER_EMAIL_ADDRESS = graphql(`
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
`);

export const UPDATE_CUSTOMER_ADDRESS = graphql(`
  mutation updateCustomerAddress(
    $id: ID!
    $fullName: String!
    $company: String!
    $streetLine1: String!
    $streetLine2: String!
    $city: String!
    $province: String!
    $postalCode: String!
  ) {
    updateCustomerAddress(
      input: {
        id: $id
        fullName: $fullName
        company: $company
        streetLine1: $streetLine1
        streetLine2: $streetLine2
        city: $city
        province: $province
        postalCode: $postalCode
      }
    ) {
      fullName
      company
      streetLine1
      streetLine2
      city
      province
      postalCode
    }
  }
`);
