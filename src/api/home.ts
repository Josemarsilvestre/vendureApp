import { gql } from "@apollo/client";

export const GET_SLIDERS = gql`
  query GetSliders {
    collection(slug: "furniture") {
      productVariants(
        options: { take: 5, filter: { name: { notContains: "Balloon" } } }
      ) {
        items {
          product {
            id
            name
            featuredAsset {
              source
            }
          }
        }
      }
    }
  }
`;

export const GET_ALL_COLLECTIONS_QUERY = gql`
  query GetAllCollections {
    collections(options: { take: 9 }) {
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

export const GET_BANNER_1_QUERY = gql`
  query GetBanner1 {
    collection(slug: "camera-photo") {
      productVariants(options: { take: 9 }) {
        items {
          product {
            id
            name
            featuredAsset {
              source
            }
          }
        }
      }
    }
  }
`;

export const GET_BANNER_2_QUERY = gql`
  query GetBanner1 {
    collection(slug: "equipment") {
      productVariants(options: { take: 9 }) {
        items {
          product {
            id
            name
            featuredAsset {
              source
            }
          }
        }
      }
    }
  }
`;
