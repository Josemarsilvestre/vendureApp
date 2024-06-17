import { gql } from "@apollo/client";

export const GET_ALL_COLLECTIONS_QUERY = gql`
  query GetAllCollections($skip: Int, $take: Int) {
    collections(options: { skip: $skip, take: $take }) {
      items {
        id
        name
        slug
        assets {
          source
        }
      }
    }
  }
`; 

export const GET_PRODUCTS_BY_CATEGORY_QUERY = gql`
  query GetProductsByCategory($take: Int, $skip: Int, $id: ID!) {
    collection(id: $id) {
      id
      productVariants(options: { take: $take, skip: $skip }) {
        items {
          id
          name
          priceWithTax
          product {
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
      }
    }
  }
`;
