import { Box, Skeleton } from '@mui/material';
import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { responsiveDestaque } from '../utils/carouselResponsiveness';
import DestaqueProductCard from './DestaqueProductCard';
const DestaqueSlider = ({ products, isFetching = false }) => {
  return (
    <Carousel
      swipeable={false}
      O
      focusOnSelect={false}
      draggable={false}
      showDots={false}
      responsive={responsiveDestaque}
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
      {isFetching
        ? [...Array(4).keys()].map((item, idx) => (
            <Box
              item={idx}
              sx={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Skeleton
                variant="rectangular"
                animation="wave"
                width={'340px'}
                height={'408px'}
              />
            </Box>
          ))
        : products?.edges?.map((item, idx) => (
            <div key={idx}>
              <DestaqueProductCard product={item.node} />
            </div>
          ))}
    </Carousel>
  );
};

export default DestaqueSlider;
