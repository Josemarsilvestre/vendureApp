import { gql } from '@apollo/client';

export const GET_SLIDERS = gql`
  query GetSliders {
    collection(id: "6") {
      productVariants(
        options: { take: 5, filter: { name: { notContains: "Balloon" } } }
      ) {
        items {
          product {
            id
            name
            assets {
              source
            }
          }
        }
      }
    }
  }
`;

export const GET_BANNER_1_QUERY = gql`
  query GetBanner1 {
    collection(id: "4") {
      productVariants(options: { take: 9 }) {
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
`;

export const GET_BANNER_2_QUERY = gql`
  query GetBanner2 {
    collection(id: "8") {
      productVariants(options: { take: 9 }) {
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
`;

export const GET_BANNER_3_QUERY = gql`
  query GetBanner3 {
    collection(id: "5") {
      productVariants(options: { take: 9 }) {
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
`;
