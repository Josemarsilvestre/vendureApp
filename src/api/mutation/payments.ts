import { gql } from "@apollo/client";

export const GET_METHOD_SHIPPING = gql`
  query GET_SHIPPING {
    eligibleShippingMethods {
      name
      price
    }
  }
`;

export const GET_METHOD_PAYMENT = gql`
  query GET_PAYMENT {
    eligiblePaymentMethods {
      id
      code
      name
    }
  }
`;

export const PAY = gql`
  mutation Pay($code: String!, $metadata: JSON!) {
    addPaymentToOrder(input: { method: $code, metadata: $metadata }) {
      ... on Order {
        id
      }
      ... on OrderPaymentStateError {
        errorCode
        message
      }
      ... on IneligiblePaymentMethodError {
        errorCode
        message
      }
      ... on PaymentDeclinedError {
        errorCode
        message
      }
      ... on OrderStateTransitionError {
        errorCode
        message
      }
      ... on NoActiveOrderError {
        errorCode
        message
      }
    }
  }
`;
