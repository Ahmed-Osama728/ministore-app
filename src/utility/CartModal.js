import { useQuery } from '@apollo/client';
import React, { useEffect, useRef } from 'react';
import { useSpring, animated } from 'react-spring';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '../components/ProductDetails';
import { PRODUCTS_DATA } from '../graphQl/Queries';
import { getTotal } from '../store/cartSlice';

const CartModal = ({ children, currIndex, show, setModalOpen }) => {
  const dispatch = useDispatch();
  const modalRef = useRef();
  const history = useHistory();
  const { data } = useQuery(PRODUCTS_DATA);

  const currSymbol =
    data?.category.products[0].prices[currIndex]?.currency.symbol;

  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getTotal(currIndex));
  }, [dispatch, currIndex, cart]);

  const cartTotalAmount = useSelector((state) => state.cart.cartTotalAmount);

  const animation = useSpring({
    config: {
      duration: 250
    },
    opacity: show ? 1 : 0,
    transform: show ? `translateY(0%)` : `translateY(-100%)`
  });

  const viewBagHandler = () => {
    history.push('/Cart');
    setModalOpen((prev) => !prev);
  };
  const checkoutHandler = () => {
    setModalOpen((prev) => !prev);
  };

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setModalOpen(false);
    }
  };

  return (
    <ModalDiv
      block={show ? 'block' : 'none'}
      onClick={closeModal}
      ref={modalRef}
    >
      <animated.div style={animation}>
        <ContentDiv>
          <CartItems>{children}</CartItems>
          <Total>
            <h3>Total</h3>
            <h3>
              {currSymbol} {cartTotalAmount}
            </h3>
          </Total>
          <BtnsContainer>
            <Button onClick={() => viewBagHandler()} small white>
              View bag
            </Button>
            <Button onClick={() => checkoutHandler()} small>
              Checkout
            </Button>
          </BtnsContainer>
        </ContentDiv>
      </animated.div>
    </ModalDiv>
  );
};

export default CartModal;

const ModalDiv = styled.div`
  display: ${(p) => p.block && p.block};
  position: fixed;
  top: 65px;
  left: 0;
  width: 100%;
  height: 100%;
  background: #39374838;
  z-index: 1;
`;
const ContentDiv = styled.div`
  max-height: 540px;
  overflow-y: scroll;
  position: fixed;
  top: 0px;
  right: 98px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: white;
  z-index: 1;
`;

const CartItems = styled.div``;

const Total = styled.div`
  display: flex;
  justify-content: space-between;
  padding-left: 16px;
  padding-right: 16px;
  margin-top: 52px;

  > h3 {
    font-family: Roboto;
    font-weight: 500;
    font-size: 16px;
    line-height: 18px;
    color: #1d1f22;
  }
`;

const BtnsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding-left: 16px;
  padding-right: 16px;
  margin-bottom: 20px;
  margin-top: 20px;
`;
