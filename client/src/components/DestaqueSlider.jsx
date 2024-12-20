import React, { useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Stack } from '@mui/material';
import DestaqueProductCard from './DestaqueProductCard';
import { responsiveDestaque } from '../utils/carouselResponsiveness';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../slices/products';
import { useGetAllProductsQuery } from '../slices/apiSlice';
const DestaqueSlider = ({ products }) => {
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
      {products?.edges?.map((item, idx) => (
        <div key={idx}>
          <DestaqueProductCard product={item.node} />
        </div>
      ))}
    </Carousel>
  );
};

export default DestaqueSlider;
