import { gql } from '@apollo/client';

export const PRODUCTS_DATA = gql`
  query {
    category {
      products {
        gallery
        brand
        name
        prices {
          currency {
            label
            symbol
          }
          amount
        }
      }
    }
  }
`;
