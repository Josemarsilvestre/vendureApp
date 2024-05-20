import { gql } from '@apollo/client';

export const PRODUCT_SEARCHED_QUERY = gql`
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
