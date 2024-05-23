import { gql } from "@apollo/client";

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

export const UPDATE_CUSTOMER_ADDRESS = gql`
  mutation updateCustomerAddres(
    $id: ID!
    $fullName: String!
    $company: String!
    $streetLine1: String!
    $city: String!
    $province: String!
    $postalCode: String!
    $countryCode: String!
    $phoneNumber: String!
  ) {
    updateCustomerAddress(
      input: {
        id: $id
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
      id
    }
  }
`;

export const DELETE_CUSTOMER_ADDRESS = gql`
  mutation deleteAddress($id: ID!) {
    deleteCustomerAddress(id: $id) {
      ... on Success {
        success
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
