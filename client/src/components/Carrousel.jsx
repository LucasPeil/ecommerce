import React from 'react';
import Carousel from 'react-multi-carousel';
import { responsiveDestaque } from '../utils/carouselResponsiveness';
import { Box, Skeleton } from '@mui/material';
import DestaqueProductCard from './DestaqueProductCard';

const Carrousel = ({ loading, data }) => {
  return (
    <Carousel
      swipeable={false}
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
      {loading
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
                height={'400px'}
              />
            </Box>
          ))
        : data?.edges?.map((item, idx) => (
            <div key={idx}>
              <DestaqueProductCard product={item.node} />
            </div>
          ))}
    </Carousel>
  );
};

export default Carrousel;
