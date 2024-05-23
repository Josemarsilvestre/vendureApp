import { gql } from "@apollo/client";

export const GET_METHOD_SHIPPING = gql`
  query GET_SHIPPING {
    eligibleShippingMethods {
      name
      price
    }
  }
`;
