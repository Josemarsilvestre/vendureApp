import { gql } from "@apollo/client";

export const GET_ALL_COLLECTIONS_QUERY = gql`
  query GetAllCollections($skip: Int, $take: Int) {
    collections {
      items {
        id
        name
        assets {
          source
        }
        children {
          id
          name
          assets {
            source
          }
        }
        productVariants(options: { take: $take, skip: $skip }) {
          items {
            id
            name
            product {
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
      }
    }
  }
`;

export const GET_PRODUCTS_BY_CATEGORY_QUERY = gql`
  query GetProductsByCategory($skip: Int, $take: Int, $id: String!) {
    collections(options: { filter: { id: { eq: $id } } }) {
      items {
        productVariants(options: { take: $take, skip: $skip }) {
          items {
            id
            name
            product {
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
      }
    }
  }
`;