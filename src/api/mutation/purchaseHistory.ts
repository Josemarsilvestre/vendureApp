import { gql } from "@apollo/client";

export const PURCHASE_HISTORY = gql`
  query CustomerOrders {
    activeCustomer {
      orders(options: { take: 20, sort: { orderPlacedAt: DESC } }) {
        items {
          id
          code
          createdAt
          state
          totalWithTax
          lines {
            id
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
