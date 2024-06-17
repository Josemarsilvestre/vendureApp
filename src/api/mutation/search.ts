import { gql } from "@apollo/client";

export const PRODUCT_SEARCHED_QUERY = gql`
  query GetProduct($id: ID!) {
    product(id: $id) {
      id
      name
      featuredAsset {
        source
      }
      description
      variants {
        stockLevel
        sku
      }
    }
  }
`;

export const SEARCH_QUERY = gql`
  query Search($term: String!) {
    search(input: { term: $term }) {
      totalItems
      items {
        productId
        productVariantId
        productVariantName
        collectionIds
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
`;
