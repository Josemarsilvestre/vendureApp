import { gql } from "@apollo/client";

export const GET_ALL_COLLECTIONS_QUERY = gql`
  query GetAllCollections {
    collections(options: { take: 9 }) {
      items {
        id
        name
        assets {
          source
        }
      }
    }
  }
`;

export const GET_SINGLES_COLLECTION_QUERY = gql`
  query GetSingleCollection($collectionId: ID!) {
    collection(id: $collectionId) {
      id
      name
      assets {
        source
      }
    }
  }
`;
