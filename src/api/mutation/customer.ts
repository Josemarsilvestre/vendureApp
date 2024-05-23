import { gql } from "@apollo/client";

export const GET_CUSTOMER = gql`
  query GetCustomer {
    activeCustomer {
      id
      firstName
      lastName
      emailAddress
      phoneNumber
      addresses {
        id
        fullName
        company
        streetLine1
        city
        province
        postalCode
        country {
          name
          code
        }
        phoneNumber
      }
    }
  }
`;


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