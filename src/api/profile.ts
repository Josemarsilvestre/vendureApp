import { graphql } from "../gql";

export const GET_CUSTOMER = graphql(`
  query GetAllCustomer {
    activeCustomer {
      id
      firstName
      lastName
      emailAddress
      phoneNumber
    }
  }
`);
