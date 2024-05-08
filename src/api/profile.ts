import { graphql } from "../gql";

export const GET_CUSTOMER = graphql(`
  query GetAllCustomer {
    activeCustomer {
      firstName
      lastName
      emailAddress
      phoneNumber
    }
  }
`);
