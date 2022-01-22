import React from 'react';
import styled from 'styled-components';
import cartIcon from '../assets/Common.png';

const ProductCard = ({ key, id, image, brand, name, symbol, amount }) => {
  return (
    <ProductContainer key={key} id={id}>
      <ProductImg>
        <a href="/products/:id">
          <img src={image} alt="product image" />
        </a>

        <img src={cartIcon} alt="cart icon" />
      </ProductImg>
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
  :hover {
    box-shadow: 0px 4px 35px rgba(168, 172, 176, 0.19);
    > :first-child > img:last-child {
      display: block;
    }
  }
`;
const ProductImg = styled.div`
  height: 75%;
  position: relative;
  cursor: pointer;
  > a > img {
    width: 100%;
    height: 100%;
  }

  > img:last-child {
    filter: drop-shadow(0px 4px 11px rgba(29, 31, 34, 0.1));
    max-width: 52px;
    max-height: 52px;
    position: absolute;
    right: 15px;
    bottom: -26px;
    display: none;
  }
`;

/* const Rotate = styled.div`

const rotate = keyframes`
  0% {
    -webkit-transform: scale(0.5);
            transform: scale(0.5);
  }
  100% {
    -webkit-transform: scale(1);
            transform: scale(1);
  }
`;
  -webkit-animation: ${rotate}0.4s cubic-bezier(0.39, 0.575, 0.565, 1) both;
  animation: ${rotate} 0.4s cubic-bezier(0.39, 0.575, 0.565, 1) both;
`; */

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
