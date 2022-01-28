import React from 'react';
import { useDispatch } from 'react-redux';
import styled, { css } from 'styled-components';
import cartIcon from '../assets/Common.png';
import { addToCart } from '../store/cartSlice';

const ProductCard = ({
  itemId,
  id,
  image,
  brand,
  name,
  symbol,
  amount,
  productData,
  inStock
}) => {
  const dispatch = useDispatch();

  const addToCartHandler = (productData) => {
    dispatch(addToCart(productData));
  };

  return (
    <ProductContainer key={itemId} inStock={inStock}>
      <ProductImg inStock={inStock}>
        <a href={`/products/${id}`}>
          <img src={image} alt="product image" />
        </a>

        <a onClick={() => addToCartHandler(productData)}>
          <img src={cartIcon} alt="cart icon" />
        </a>
      </ProductImg>
      <p>OUT OF STOCK</p>
      <ProductContent>
        <ProductName>
          {brand} {name}
        </ProductName>
        <ProductPrice>
          {symbol} {amount}
        </ProductPrice>
      </ProductContent>
    </ProductContainer>
  );
};

export default ProductCard;

const ProductContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 16px;
  background-color: white;
  position: relative;
  opacity: 0.9;

  > p {
    font-family: Raleway;
    font-weight: normal;
    font-size: 24px;
    line-height: 160%;
    display: flex;
    align-self: center;
    justify-self: center;
    position: absolute;
    top: 37%;
    color: #8d8f9a;
    display: none;
    ${(p) =>
      p.inStock &&
      css`
        display: block;
      `}
  }
  :hover {
    box-shadow: 0px 4px 35px rgba(168, 172, 176, 0.19);
    opacity: 1;
    transform: scale(1.05);
    transition: transform 250ms ease-in;
    > :first-child > a:last-child > img {
      display: block;
    }
  }
`;
const ProductImg = styled.div`
  height: 75%;
  cursor: pointer;
  > a:first-child > img {
    width: 100%;
    height: 100%;

    ${(p) =>
      p.inStock &&
      css`
        opacity: 0.5;
      `}
  }

  > a:last-child {
    position: relative;
    text-decoration: none;
  }
  > a:last-child > img {
    filter: drop-shadow(0px 4px 11px rgba(29, 31, 34, 0.1));
    max-width: 52px;
    max-height: 52px;
    position: absolute;
    right: 3px;
    bottom: -13px;
    display: none;
  }

  > a:last-child > img:hover {
    transform: scale(1.1);
    transition: transform 250ms ease-in-out;
  }
`;

const ProductContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 25%;
  justify-content: flex-end;
  box-sizing: border-box;
`;

const ProductName = styled.div`
  font-family: Raleway;
  font-weight: 300;
  font-size: 18px;
  line-height: 160%;
  align-items: center;
  color: #1d1f22;
  margin: 0px 0px;
`;
const ProductPrice = styled.div`
  font-family: Raleway;
  font-weight: 500;
  font-size: 18px;
  line-height: 160%;
  color: #1d1f22;
  margin: 0px 10px;
  box-sizing: border-box;
`;
