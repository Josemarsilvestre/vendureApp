import { graphql } from "../gql";

export const GET_SLIDERS = graphql(`
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
`);

export const GET_BANNER_1_QUERY = graphql(`
  query GetBanner1 {
    collection(id: "4") {
      productVariants(options: { take: 9 }) {
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
`);

export const GET_BANNER_2_QUERY = graphql(`
  query GetBanner2 {
    collection(id: "8") {
      productVariants(options: { take: 9 }) {
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
`);

export const GET_BANNER_3_QUERY = graphql(`
  query GetBanner3 {
    collection(id: "5") {
      productVariants(options: { take: 9 }) {
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
`);