import { gql } from "@apollo/client";

export const GET_METHOD_SHIPPING = gql`
  query GET_SHIPPING {
    eligibleShippingMethods {
      id
      name
      price
    }
  }
`;

export const SET_ORDER_SHIPPING_ADDRESS = gql`
  mutation SET_ORDER_SHIPPING_ADDRESS(
    $fullName: String!
    $company: String!
    $streetLine1: String!
    $city: String!
    $province: String!
    $postalCode: String!
    $countryCode: String!
    $phoneNumber: String!
  ) {
    setOrderShippingAddress(
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
      ... on Order {
        id
        state
      }
      ... on NoActiveOrderError {
        errorCode
        message
      }
    }
  }
`;

export const SET_ORDER_SHIPPING_METHOD = gql`
  mutation SET_ORDER_SHIPPING_METHOD($id: [ID!]!) {
    setOrderShippingMethod(shippingMethodId: $id) {
      ... on Order {
        id
        state
      }
      ... on OrderModificationError {
        errorCode
        message
      }
      ... on IneligibleShippingMethodError {
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

export const TRANSITION_ORDER_TO_ARRAINGING_PAYMENT = gql`
  mutation TransitionOrderToArrangingPayment($state: String!) {
    transitionOrderToState(state: $state) {
      ... on Order {
        id
        state
      }
      ... on OrderStateTransitionError {
        errorCode
        message
      }
    }
  }
`;

export const ADD_PAYMENT_TO_ORDER = gql`
  mutation Payment($method: String!) {
    addPaymentToOrder(input: { method: $method, metadata: {} }) {
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
