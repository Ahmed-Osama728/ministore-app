import { gql } from '@apollo/client';

export const PRODUCTS_DATA = gql`
  query {
    category {
      products {
        id
        gallery
        brand
        name
        description
        inStock
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
