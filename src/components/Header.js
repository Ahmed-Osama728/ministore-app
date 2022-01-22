import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import cart from '../assets/cart.png';
import expand from '../assets/expand.svg';
import logo from '../assets/logo.png';
const Header = () => {
  const [active, setActive] = useState('women');

  return (
    <HeaderContainer>
      <HeaderLeft active={active}>
        <A onClick={() => setActive('women')} women={active} href="#">
          WOMEN
        </A>
        <A onClick={() => setActive('men')} men={active} href="#">
          MEN
        </A>
        <A onClick={() => setActive('kids')} kids={active} href="#">
          KIDS
        </A>
      </HeaderLeft>
      <img src={logo} alt="logo" />
      <HeaderRight>
        <Currency>
          $
          <img src={expand} alt="expand" />
        </Currency>
        <img src={cart} alt="cart" />
      </HeaderRight>
    </HeaderContainer>
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
`;

const HeaderLeft = styled.div`
  display: flex;
  justify-content: space-between;
  padding-left: 16px;
  padding-right: 16px;
  align-items: center;
  flex: 0.15;
`;

const A = styled.a`
  font-family: var(--font-family);
  font-weight: 600;
  font-size: 16px;
  line-height: 19.2px;
  text-transform: uppercase;
  text-decoration: none;
  padding: 15px 32px;

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

const HeaderRight = styled.div`
  display: flex;
  //flex: 0.1;
  align-self: center;
  width: 60px;
  min-width: 30px;
  justify-content: space-between;
`;

const Currency = styled.div`
  display: flex;
  align-items: center;
  > img {
    width: 6px;
    height: 3px;
    padding-left: 2px;
  }
`;
