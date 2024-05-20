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
