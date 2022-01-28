import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import { addToCart, decreaseCart } from '../store/cartSlice';

const CartOverelay = ({ currIndex }) => {
  const dispatch = useDispatch();

  const addToCartHandler = (product) => {
    dispatch(addToCart(product));
  };

  const removeFromCart = (product) => {
    dispatch(decreaseCart(product));
  };

  const cart = useSelector((state) => state.cart);

  return (
    <Title>
      <h2>Cart</h2>
      {cart.cartItems.length === 0 ? (
        <EmptyCart>
          <p>Your cart is currently empty</p>
        </EmptyCart>
      ) : (
        cart.cartItems.map((item) => (
          <Container key={item.id}>
            <ItemInfo>
              <ItemName>{item.name}</ItemName>
              <ItemName>{item.brand}</ItemName>
              <ItemPrice>
                {item?.prices[currIndex]?.currency?.symbol}{' '}
                {item?.prices[currIndex]?.amount}
              </ItemPrice>
              <ItemSizes>
                <SmallBtn iconSize={true}>S</SmallBtn>{' '}
                <SmallBtn iconSize={true} m={true}>
                  M
                </SmallBtn>
              </ItemSizes>
            </ItemInfo>
            <ItemPhoto>
              <ItemCounter>
                <SmallBtn>
                  <a onClick={() => addToCartHandler(item)}>
                    <i className="fas fa-plus"></i>
                  </a>
                </SmallBtn>
                <Num>
                  <h3>{item.itemQty}</h3>
                </Num>
                <SmallBtn>
                  <a onClick={() => removeFromCart(item)}>
                    <i className="fas fa-minus"></i>
                  </a>
                </SmallBtn>
              </ItemCounter>
              <Photo>
                <img src={item.gallery[0]} alt="img" />
              </Photo>
            </ItemPhoto>
          </Container>
        ))
      )}
    </Title>
  );
};

export default CartOverelay;

const Title = styled.div`
  margin-top: 8px;
  padding-left: 16px;
  width: 325px;

  > h2 {
    font-family: Raleway;
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 160%;
    text-align: left;
    color: #1d1f22;
  }
`;

const EmptyCart = styled.div`
  > p {
    font-family: Raleway;
    font-style: normal;
    font-weight: 300;
    font-size: 16px;
    line-height: 160%;
    color: #1d1f22;
    text-align: center;
  }
`;

const Container = styled.div`
  display: flex;
  margin-top: 25px;
  justify-content: space-between;
  padding-right: 16px;
`;
const ItemInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-right: 18px;
  flex-direction: column;
`;

const ItemName = styled.h3`
  font-family: Raleway;
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 160%;
  color: #1d1f22;
  text-align: center;
`;

const ItemPrice = styled.h3`
  text-align: center;
  font-family: Raleway;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 160%;
  color: #1d1f22;
  margin: 0px 10px;
`;

const ItemSizes = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 27px;
`;

const SmallBtn = styled.a`
  border: 1px solid #1d1f22;
  font-family: Roboto Condensed;
  font-size: 16px;
  line-height: 160%;
  text-align: center;
  color: #1d1f22;
  width: 24px;
  height: 24px;
  cursor: pointer;
  ${(props) =>
    props.iconSize
      ? css`
          font-weight: 1000;
          cursor: none;
        `
      : css`
          font-weight: 400;
        `}

  ${(props) =>
    props.m &&
    css`
      background-color: black;
      color: white;
    `}
`;

const Num = styled.div`
  font-family: Raleway;
  font-weight: 500;
  font-size: 16px;
  line-height: 160%;
  color: #1d1f22;
  text-align: center;
`;

const ItemPhoto = styled.div`
  display: flex;
`;
const ItemCounter = styled.div`
  display: flex;
  flex: 0.25;
  flex-direction: column;
  justify-content: space-between;
  align-content: center;
  height: 137px;
  @media screen and (max-width: 600px) {
    height: 100px;
  }
`;
const Photo = styled.div`
  display: flex;
  flex: 0.75;
  width: 105px;
  height: 137px;
  margin-left: 8px;
  @media screen and (max-width: 600px) {
    width: 80px;
    height: 100px;
  }
  > img {
    width: 100%;
    height: 100%;
    align-self: center;
  }
`;
