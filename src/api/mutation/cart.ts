import { graphql } from "../../gql";

export const ADD_TO_CART = graphql(`
  mutation ConvidadoOuLoginSuccess($id_: ID!, $quantity_: Int!) {
    addItemToOrder(productVariantId: $id_, quantity: $quantity_) {
      ... on Order {
        id
      }
      ... on OrderModificationError {
        errorCode
        message
      }
      ... on OrderLimitError {
        errorCode
        message
      }
      ... on NegativeQuantityError {
        errorCode
        message
      }
      ... on InsufficientStockError {
        errorCode
        message
      }
    }
  }
`);

export const SHOW_ORDER = graphql(`
  query Order {
    activeOrder {
      total
      totalWithTax
      taxSummary {
        description
        taxRate
        taxBase
        taxTotal
      }
      lines {
        id
        featuredAsset {
          source
        }
        productVariant {
          name
          priceWithTax
        }
        proratedUnitPriceWithTax
        discounts {
          amountWithTax
        }
        unitPrice
        quantity
      }
    }
  }
`);

export const REMOVE_ONLY_ORDER_LINE = graphql(`
  mutation REMOVE_ORDER($id_: ID!) {
    removeOrderLine(orderLineId: $id_) {
      ... on Order {
        id
      }
      ... on OrderModificationError {
        errorCode
        message
      }
    }
  }
`);

export const ADJUST_ORDER = graphql(`
  mutation ADJUST_ORDER($id_: ID!, $quantity_: Int!) {
    adjustOrderLine(orderLineId: $id_, quantity: $quantity_) {
      ... on Order {
        id
      }
      ... on OrderModificationError {
        errorCode
        message
      }
      ... on OrderLimitError {
        errorCode
        message
      }
      ... on NegativeQuantityError {
        errorCode
        message
      }
      ... on InsufficientStockError {
        errorCode
        message
      }
    }
  }
`);

export const REMOVE_ALL_ORDER = graphql(`
  mutation REMOVE_ALL_ORDER {
    removeAllOrderLines {
      ... on Order {
        id
      }
      ... on OrderModificationError {
        errorCode
        message
      }
    }
  }
`);
