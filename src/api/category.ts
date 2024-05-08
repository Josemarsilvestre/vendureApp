import { graphql } from "../gql";

export const GET_ALL_COLLECTIONS_QUERY = graphql(`
  query GetAllCollections {
    collections(options: { take: 9 }) {
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
`);

export const GET_ALL_COLLECTIONS_ONLY_QUERY = graphql(`
  query GetAllCollections2 {
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
`);
