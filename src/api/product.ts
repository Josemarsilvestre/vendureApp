import { graphql } from "../gql";

export const PRODUCTLIST_QUERY = graphql(`
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
          priceWithTax
          stockLevel
          sku
        }
      }
    }
  }
`);