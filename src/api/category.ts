import { gql } from "@apollo/client";

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
