import { gql } from "@apollo/client";

export const GET_ALL_COLLECTIONS_QUERY = gql`
  query GetAllCollections {
    collections(options: { take: 8 }) {
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
        productVariants(options: { take: 8 }) {
          items {
            product {
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
      }
    }
  }
`;

export const GET_ALL_COLLECTIONS_ONLY_QUERY = gql`
  query GetAllCollections {
    collections(options: { take: 8 }) {
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
        productVariants(options: { take: 8 }) {
          items {
            product {
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
      }
    }
  }
`;
