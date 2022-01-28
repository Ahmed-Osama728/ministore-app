import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import cart from '../assets/cart.png';
import downArrow from '../assets/expand.svg';
import upArrow from '../assets/Vector.svg';
import logo from '../assets/logo.png';
import CartOverelay from './CartOverelay';
import { useQuery } from '@apollo/client';
import { PRODUCTS_DATA } from '../graphQl/Queries';
import CartModal from '../utility/CartModal';
import { animated, useSpring } from 'react-spring';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = ({
  modalOpen,
  setModalOpen,
  currIndex,
  currencyHandler,
  active,
  setActive
}) => {
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const history = useHistory();
  const { data } = useQuery(PRODUCTS_DATA);
  const prices = data?.category.products[0].prices;

  const dropDownHandler = () => {
    setDropDownOpen(!dropDownOpen);
    setModalOpen(false);
  };

  const currencyIndexHandler = (label) => {
    const currIndexx = prices?.findIndex((p) => p.currency.label === label);
    currencyHandler(currIndexx);
    setDropDownOpen(!dropDownOpen);
  };

  const animation = useSpring({
    config: {
      duration: 250
    },
    opacity: dropDownOpen ? 1 : 0,
    transform: dropDownOpen ? `translateY(0%)` : `translateY(-100%)`
  });

  const headerLeftHandler = (category) => {
    setActive(category);
    history.push('/');
  };

  const cartHandler = () => {
    setModalOpen((prev) => !prev);
    setDropDownOpen(false);
  };

  const cartItems = useSelector((state) => state.cart.cartItems).length;

  return (
    <>
      <HeaderContainer>
        <HeaderLeft active={active}>
          <A onClick={() => headerLeftHandler('women')} women={active}>
            WOMEN
          </A>
          <A onClick={() => headerLeftHandler('men')} men={active}>
            MEN
          </A>
          <A onClick={() => headerLeftHandler('kids')} kids={active}>
            KIDS
          </A>
        </HeaderLeft>
        <LogoContainer>
          <img src={logo} alt="logo" />
        </LogoContainer>
        <HeaderRight>
          <Currency>
            <a onClick={() => dropDownHandler()}>
              $
              <img src={dropDownOpen ? downArrow : upArrow} alt="arrow" />
            </a>
            <animated.div style={animation}>
              <CurrencyDropDown active={dropDownOpen}>
                {prices?.map((x) => (
                  <C key={x.amount}>
                    <a onClick={() => currencyIndexHandler(x.currency.label)}>
                      <span>
                        {x.currency.symbol} {x.currency.label}
                      </span>
                    </a>
                  </C>
                ))}
              </CurrencyDropDown>
            </animated.div>
          </Currency>
          <a onClick={() => cartHandler()}>
            <img src={cart} alt="cart" />
            <CartItemsNum>
              <h3>{cartItems}</h3>
            </CartItemsNum>
          </a>
        </HeaderRight>
      </HeaderContainer>
      <CartModal
        currIndex={currIndex}
        show={modalOpen}
        setModalOpen={setModalOpen}
      >
        <CartOverelay currIndex={currIndex} />
      </CartModal>
    </>
  );
};

export default Header;

const HeaderContainer = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  padding: 0 100px;
  box-sizing: border-box;
  align-items: center;
  justify-content: space-between;
  @media screen and (max-width: 700px) {
    flex-direction: column;
  }
`;

const HeaderLeft = styled.div`
  display: flex;
  justify-content: space-between;
  padding-left: 16px;
  padding-right: 16px;
  align-items: center;
  flex: 0.15;
  @media screen and (max-width: 700px) {
    flex: 1;
    margin: 2rem;
  }
`;

const A = styled.a`
  font-family: var(--font-family);
  font-weight: 600;
  font-size: 16px;
  line-height: 19.2px;
  text-transform: uppercase;
  text-decoration: none;
  padding: 15px 32px;
  :hover {
    color: #5ece7b;
  }
  cursor: pointer;
  ${(props) =>
    props.women === 'women' || props.men === 'men' || props.kids === 'kids'
      ? css`
          color: #5ece7b;
          border-bottom: 1px solid #5ece7b;
        `
      : css`
          color: black;
        `}
`;

const LogoContainer = styled.div`
  justify-self: center;
  margin-right: 190px;
  @media screen and (max-width: 850px) {
    display: none;
  }
`;

const HeaderRight = styled.div`
  display: flex;
  align-self: center;
  width: 60px;
  min-width: 30px;
  justify-content: space-between;

  :last-child {
    cursor: pointer;
  }
`;

const Currency = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  :hover {
    color: #5ece7b;
  }
  a > {
    position: relative;
  }
  > a > img {
    width: 6px;
    height: 3px;
    padding-left: 10px;
  }
`;

const CartItemsNum = styled.div`
  border: 1px solid black;
  background-color: black;
  height: 20px;
  border-radius: 50%;
  width: 20px;
  position: absolute;
  top: 16px;
  right: 86px;
  @media screen and (max-width: 700px) {
    display: none;
  }
  > h3 {
    color: white;
    font-family: Roboto Condensed;
    font-weight: bold;
    font-size: 16px;
    line-height: 20px;
    text-align: center;
  }
`;

const CurrencyDropDown = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 114px;
  height: 169px;
  position: absolute;
  top: 28px;
  right: -40px;
  background-color: whitesmoke;
  box-shadow: 0px 4px 35px rgba(168, 172, 176, 0.19);
  ${(p) =>
    !p.active &&
    css`
      display: none;
    `}
`;
const C = styled.div`
  > a {
    text-decoration: none;
  }
  > a > span {
    font-family: Raleway;
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 160%;
    color: #1d1f22;
  }
`;
