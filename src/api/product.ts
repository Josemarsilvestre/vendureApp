import { gql } from "@apollo/client";

export const PRODUCTLIST_QUERY = gql`
  query GetProductList {
    products(options: { take: 20 }) {
      totalItems
      items {
        id
        name
        slug
        featuredAsset {
          source
        }
        description
        variants {
          price
          stockLevel
          sku
        }
      }
    }
  }
`;