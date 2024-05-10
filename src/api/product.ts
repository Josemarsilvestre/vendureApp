import { graphql } from "../gql";

export const PRODUCTLIST_QUERY = graphql(`
  query GetProductList($id: String!) {
    products(options: { take: 1, filter: { id: { eq: $id } } }) {
      items {
        id
        name
        featuredAsset {
          source
        }
        description
        variants {
          priceWithTax
          stockLevel
          sku
        }
        collections {
          id
        }
      }
    }
  }
`);

export const SEARCH_QUERY = graphql(`
  query Search($term: String!) {
    search(input: { term: $term }) {
      totalItems
      items {
        productId
        productName
        productAsset {
          preview
        }
        priceWithTax {
          ... on SinglePrice {
            value
          }
        }
        score
      }
    }
  }
`);
