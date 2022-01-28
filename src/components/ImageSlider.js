import React, { useState } from 'react';
import styled from 'styled-components';
import leftArrow from '../assets/leftArrow.svg';
import rightArrow from '../assets/rightArrow.svg';
const ImageSlider = ({ slides }) => {
  const [current, setCurrent] = useState(0);

  const length = slides?.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  return (
    <SliderContainer>
      <LeftArrow>
        <a onClick={prevSlide}>
          <img src={leftArrow} alt="prevArrow" />
        </a>
      </LeftArrow>
      <RightArrow>
        <a onClick={nextSlide}>
          <img src={rightArrow} alt="rightArrow" />
        </a>
      </RightArrow>
      {slides?.map((slide, index) => (
        <Slide key={index}>
          {index === current && <img src={slide} alt="img" />}
        </Slide>
      ))}
    </SliderContainer>
  );
};

export default ImageSlider;

const SliderContainer = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LeftArrow = styled.div`
  position: absolute;
  top: 28%;
  left: 0;
  font-size: 3rem;
  color: #000;
  z-index: 10;
  cursor: pointer;
  user-select: none;
`;

const RightArrow = styled.div`
  position: absolute;
  left: 93%;
  top: 28%;
  font-size: 3rem;
  color: #000;
  z-index: 10;
  cursor: pointer;
  user-select: none;
`;

const Slide = styled.div`
  opacity: 1;

  > img {
    width: 100%;
    height: 100%;
    border-radius: 5px;
  }
`;
