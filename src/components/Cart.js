import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import { addToCart, decreaseCart } from '../store/cartSlice';
import ImageSlider from './ImageSlider';

const Cart = ({ currIndex }) => {
  const dispatch = useDispatch();

  const addToCartHandler = (product) => {
    dispatch(addToCart(product));
  };

  const removeFromCart = (product) => {
    dispatch(decreaseCart(product));
  };

  const cart = useSelector((state) => state.cart);

  return (
    <>
      <Title>
        <h2>Cart</h2>
        {cart.cartItems.length === 0 ? (
          <EmptyCart>
            <p>Your cart is currently empty</p>
            <Return>
              <a href="/">
                <i className="fas fa-undo-alt"></i>
                <p>Start Shopping</p>
              </a>
            </Return>
          </EmptyCart>
        ) : (
          cart.cartItems.map((item, index) => (
            <>
              <Hr key={index}>
                <hr
                  style={{
                    background: '#E5E5E5',
                    border: 'none',
                    height: '1px',
                    marginTop: 60
                  }}
                />
              </Hr>
              <Container>
                <ItemInfo>
                  <ItemName>{item.name}</ItemName>
                  <ItemBrand>{item.brand}</ItemBrand>
                  <ItemPrice>
                    {item.prices[currIndex].currency.symbol}{' '}
                    {item.prices[currIndex].amount}
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
                    <ImageSlider slides={item.gallery} />
                  </Photo>
                </ItemPhoto>
              </Container>
            </>
          ))
        )}
      </Title>
      <Margin></Margin>
    </>
  );
};

export default Cart;

const EmptyCart = styled.div`
  @media screen and (max-width: 700px) {
    width: 65%;
    margin-top: 100px;
    justify-content: center;
    align-self: center;
  }

  > p {
    @media screen and (max-width: 700px) {
      font-size: 20px;
      line-height: 20px;
    }

    font-family: Raleway;
    font-style: normal;
    font-weight: 600;
    font-size: 30px;
    line-height: 27px;
    color: #1d1f22;
    text-align: center;
  }
`;

const Return = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
  > a {
    display: flex;
    padding: 18px;
    background: #5ece7b;
    color: #ffffff;
    text-decoration: none;
    margin-top: 15px;
  }
  > a > p {
    font-family: Raleway;
    font-style: normal;
    font-weight: 400;
    font-size: 30px;
    line-height: 27px;
    text-align: center;
    @media screen and (max-width: 700px) {
      font-size: 20px;
      line-height: 20px;
    }
  }
  > a > i {
    align-self: center;
    padding-right: 10px;
    @media screen and (max-width: 700px) {
      font-size: 20px;
      line-height: 20px;
    }
  }
`;

const Title = styled.div`
  margin-top: 20px;
  padding-left: 100px;
  > h2 {
    font-family: Raleway;
    font-weight: bold;
    font-size: 32px;
    line-height: 40px;
    text-transform: uppercase;
    color: #1d1f22;
    @media screen and (max-width: 700px) {
      display: none;
    }
  }
`;

const Hr = styled.div`
  margin-right: 105px;
  margin-top: 60;
  @media screen and (max-width: 460px) {
    display: none;
  }
`;

const Container = styled.div`
  display: flex;
  margin-top: 20px;
  justify-content: space-between;
  padding-right: 242px;
  padding-right: 100px;

  @media screen and (max-width: 666px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  @media screen and (max-width: 460px) {
    margin-top: 100px;
  }
`;
const ItemInfo = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

const ItemName = styled.h3`
  font-family: Raleway;
  font-style: normal;
  font-weight: 600;
  font-size: 30px;
  line-height: 27px;
  color: #1d1f22;
`;

const ItemBrand = styled.div`
  font-family: Raleway;
  font-weight: normal;
  font-size: 30px;
  line-height: 27px;
  color: #1d1f22;
  margin-top: 16px;
`;

const ItemPrice = styled.h3`
  font-family: Raleway;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 18px;
  color: #1d1f22;
  margin-top: 12px;
`;

const ItemSizes = styled.div`
  display: flex;
  align-items: center;
  margin-top: 12px;
  @media screen and (max-width: 666px) {
    justify-content: space-around;
    align-content: center;
    width: 100%;
    flex: 1;
  }
`;

const SmallBtn = styled.a`
  border: 1px solid #1d1f22;
  font-family: Roboto Condensed;
  font-size: 16px;
  line-height: 160%;
  text-align: center;
  color: #1d1f22;
  padding: 5px 10px;
  cursor: pointer;
  ${(props) =>
    props.iconSize &&
    css`
      padding: 12px 25px;
      margin-right: 12px;
      margin-top: 12px;
    `}
  ${(props) =>
    props.m &&
    css`
      background-color: black;
      color: white;
    `}
`;

const Num = styled.div`
  text-align: center;
  font-family: Raleway;
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 160%;
  color: #1d1f22;
`;

const ItemPhoto = styled.div`
  display: flex;
  @media screen and (max-width: 666px) {
    flex-direction: column;
    justify-content: space-between;
    align-content: center;
    width: 100%;
    flex: 1;
  }
`;
const ItemCounter = styled.div`
  display: flex;
  flex: 0.15;
  flex-direction: column;
  justify-content: space-between;
  align-content: center;
  margin-right: 27px;

  @media screen and (max-width: 666px) {
    flex-direction: row;
    justify-content: space-around;
    align-content: center;
    margin: 20px 0px;
    width: 100%;
    flex: 1;
  }
`;
const Photo = styled.div`
  display: flex;
  flex: 0.85;
  width: 105px;
  height: 100%;
  > img {
    width: 100%;
    height: 100%;
    align-self: center;
  }

  @media screen and (max-width: 666px) {
    flex: 1;
    width: 80%;
    flex: 1;
    align-self: center;
  }
`;

const Margin = styled.div`
  margin-bottom: 55px;
`;
