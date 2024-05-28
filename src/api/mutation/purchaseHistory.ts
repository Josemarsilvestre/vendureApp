import { gql } from "@apollo/client";

export const PURCHASE_HISTORY = gql`
  query CustomerOrders {
    activeCustomer {
      orders(options: { take: 20 }) {
        items {
          id
          code
          createdAt
          state
          totalWithTax
          lines {
            quantity
            featuredAsset {
              source
            }
            productVariant {
              name
              priceWithTax
            }
          }
        }
      }
    }
  }
`;
