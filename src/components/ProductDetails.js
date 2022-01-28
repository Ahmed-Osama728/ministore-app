import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { PRODUCTS_DATA } from '../graphQl/Queries';
import { addToCart } from '../store/cartSlice';
import ImageSlider from './ImageSlider';
import { TailSpin } from 'react-loader-spinner';

const ProductDetails = ({ setSize, size, currIndex }) => {
  const [product, setProduct] = useState([]);

  const { loading, error, data } = useQuery(PRODUCTS_DATA);
  const { id } = useParams();
  const dispatch = useDispatch();

  const productData = data?.category.products.find(
    (p) => p.id.split('-')[0] === id
  );

  const productInfo = useCallback(() => {
    if (productData) {
      setProduct(productData);
    }
  }, [productData]);

  useEffect(() => {
    productInfo();
  }, [productInfo]);

  const addToCartHandler = () => {
    dispatch(addToCart(product));
  };

  const sizesArr = ['XS', 'S', 'M', 'L'];

  const selectSizeHandler = (s) => {
    setSize(s);
  };
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

      <ProductDetailsContainer key={id}>
        <ProductImages>
          <img src={productData?.gallery[0]} alt="img1" />
          <img src={productData?.gallery[1]} alt="img2" />
          <img src={productData?.gallery[2]} alt="img3" />
        </ProductImages>
        <MainImage>
          <img src={productData?.gallery[0]} alt="main img" />
        </MainImage>
        <ImageSliderContainer>
          <ImageSlider slides={productData?.gallery} />
        </ImageSliderContainer>
        <ProductInfo>
          <Name>{productData?.name}</Name>
          <Brand>{productData?.brand}</Brand>
          <Sizes>
            <H2 size={true}>Size:</H2>
            <S>
              {sizesArr.map((s, index) => (
                <A
                  size={size}
                  sizeName={s}
                  key={index}
                  onClick={() => selectSizeHandler(s)}
                >
                  {s}
                </A>
              ))}
            </S>
          </Sizes>
          <H2>Price: </H2>
          <Price price={true}>
            {productData?.prices[currIndex]?.currency.symbol}{' '}
            {productData?.prices[currIndex]?.amount}
          </Price>
          <Button type="button" big onClick={() => addToCartHandler()}>
            Add to cart
          </Button>
          <Description>
            <p>{productData?.description.replace(/<\/?[^>]+(>|$)/g, '')}</p>
          </Description>
        </ProductInfo>
      </ProductDetailsContainer>
    </>
  );
};

export default ProductDetails;

const ProductDetailsContainer = styled.div`
  display: flex;
  margin-top: 80px;
  padding-right: 100px;
  padding-left: 100px;
  @media screen and (max-width: 550px) {
    flex-direction: column;
  }
`;
const ProductImages = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0.2;
  padding-right: 15px;
  height: 80%;
  @media screen and (max-width: 550px) {
    display: none;
  }
  > img {
    width: 80%;
    min-width: 80px;
    min-height: 80px;
    padding-bottom: 20px;
    cursor: zoom-in;
  }
`;

const MainImage = styled.div`
  padding-right: 80px;
  flex: 0.5;
  @media screen and (max-width: 550px) {
    display: none;
  }
  > img {
    width: 80%;
    min-width: 80px;
    min-height: 80px;
  }
`;

const ImageSliderContainer = styled.div`
  display: none;

  @media screen and (max-width: 550px) {
    display: block;
    width: 100%;
    margin-bottom: 10px;
  }
`;

const H2 = styled.h2`
  ${(props) =>
    props.size
      ? css`
          font-family: Roboto Condensed;
        `
      : css`
          font-family: raleway;
        `};
  font-weight: bold;
  font-size: 18px;
  line-height: 18px;
  color: #1d1f22;
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0.3;
`;

const Name = styled.h3`
  font-family: raleway;
  font-style: normal;
  font-weight: 600;
  font-size: 30px;
  line-height: 27px;
  color: #1d1f22;
`;

const Brand = styled.h3`
  font-family: Raleway;
  font-style: normal;
  font-weight: normal;
  font-size: 30px;
  line-height: 27px;
  color: #1d1f22;

  margin-top: 16px;
`;

const Sizes = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 43px;
  > h2 {
    margin-bottom: 8px;
  }
`;

const S = styled.div`
  display: flex;
  margin-top: 8px;
  margin-bottom: 40px;
`;

const A = styled.div`
  :hover {
    background-color: black;
    color: white;
  }
  border: 1px solid #1d1f22;
  box-sizing: border-box;
  font-family: raleway;
  font-size: 16px;
  line-height: 18px;
  text-align: center;
  letter-spacing: 0.05em;
  margin-right: 12px;
  padding: 14px;
  cursor: pointer;
  text-decoration: none;
`;

const Price = styled.div`
  margin-top: 10px;
  font-family: Raleway;
  font-weight: bold;
  font-size: 24px;
  line-height: 18px;
  color: #1d1f22;
`;

export const Button = styled.button`
  :hover {
    transform: scale(1.1);
    transition: transform 250ms ease-in-out;
  }
  margin-top: 20px;
  ${(props) =>
    props.big &&
    css`
      padding: 16px 93px 16px 93px;
    `}
  ${(props) =>
    props.small &&
    css`
      padding: 13px 30px;
    `}
      background: #5ece7b;
  color: #ffffff;
  ${(props) =>
    props.white &&
    css`
      background-color: #ffffff;
      color: #5ece7b;
    `}
  border: none;
  outline: none;
  font-family: Raleway;
  font-weight: 600;
  font-size: 16px;
  line-height: 120%;
  text-align: center;
  text-transform: uppercase;
  cursor: pointer;
`;

const Description = styled.div`
  > p {
    padding-top: 40px;
    font-family: raleway;
    font-weight: 400;
    font-size: 16px;
    line-height: 159.96%;
    color: #1d1f22;
  }
`;
