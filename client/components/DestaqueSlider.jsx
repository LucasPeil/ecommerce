import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Stack } from '@mui/material';
import DestaqueProductCard from './DestaqueProductCard';
const DestaqueSlider = () => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  return (
    <Carousel
      swipeable={false}
      focusOnSelect={false}
      draggable={false}
      showDots={false}
      responsive={responsive}
      ssr={false} // means to render carousel on server-side.
      infinite={false}
      keyBoardControl={false}
      customTransition="all 0.5s ease-in-out"
      transitionDuration={500}
      removeArrowOnDeviceType={['mobile']}
      containerClass="carousel-container"
      dotListClass="custom-dot-list-style"
      itemClass="carousel-item-padding-40-px"
    >
      {[...Array(6)].map((_, idx) => (
        <DestaqueProductCard />
      ))}
    </Carousel>
  );
};

export default DestaqueSlider;
