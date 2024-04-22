import { gql } from "@apollo/client";

export const PRODUCTLIST_QUERY = gql`
  query GetProductList {
    products(options: { take: 10 }) {
      totalItems
      items {
        id
        name
        slug
        featuredAsset {
          preview
          mimeType
          width
          height
        }
        variants {
          price
          stockLevel
        }
      }
    }
  }
`;

export const SINGLE_PRODUCT_DETAIL_QUERY = gql`
  query GetProductDetail($productId: ID!) {
    product(id: $productId) {
      id
      name
      slug
      description
      variants {
        price
        stockLevel
      }
    }
  }
`;
