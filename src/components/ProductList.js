import React, { Fragment } from 'react';
import styled from 'styled-components';
import ProductCard from './ProductCard';
import { useQuery } from '@apollo/client';
import { PRODUCTS_DATA } from '../graphQl/Queries';
import { TailSpin } from 'react-loader-spinner';

const ProductList = ({ currIndex, active }) => {
  const { loading, error, data } = useQuery(PRODUCTS_DATA);

  return (
    <>
      {loading && (
        <>
          <TailSpin color="#5ece7b" height={100} width={100} />
        </>
      )}
      {error && (
        <>
          <p>{error}</p>
        </>
      )}
      <ListContainer>
        {active}
        <List>
          {data?.category?.products?.map((product) => (
            <Fragment key={product.id}>
              <ProductCard
                itemId={product.id}
                id={product.id.split('-')[0]}
                image={product.gallery[0]}
                brand={product.brand}
                name={product.name}
                symbol={product.prices[currIndex].currency.symbol}
                amount={product.prices[currIndex].amount}
                productData={product}
                inStock={product.inStock}
              />
            </Fragment>
          ))}
        </List>
      </ListContainer>
    </>
  );
};

export default ProductList;

const ListContainer = styled.div`
  margin: 80px 100px 0 100px;
  box-sizing: border-box;
  font-family: Raleway;
  font-style: normal;
  font-weight: normal;
  font-size: 42px;
  line-height: 160%;
  color: #1d1f22;
  text-transform: uppercase;
`;

const List = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  grid-gap: 40px;
  margin-top: 105px;
  box-sizing: border-box;

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (max-width: 580px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
