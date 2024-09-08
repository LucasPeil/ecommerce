import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Slide from '../components/Slide';
import capa1 from '../assets/capa-1.jpg';
import capa2 from '../assets/capa-2.jpg';
import capa3 from '../assets/capa-3.jpg';
import { Stack } from '@mui/material';
const Home = () => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  return (
    <>
      <Carousel
        swipeable={false}
        focusOnSelect={false}
        draggable={false}
        showDots={true}
        responsive={responsive}
        ssr={false} // means to render carousel on server-side.
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={1000}
        keyBoardControl={false}
        customTransition="all 3s ease-in-out"
        transitionDuration={4000}
        removeArrowOnDeviceType={[
          'tablet',
          'mobile',
          'desktop',
          'superLargeDesktop',
        ]}
        containerClass="carousel-container"
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
      >
        <Slide bgImage={capa1} bgPosition={'center'} />
        <Slide bgImage={capa2} bgPosition={'top'} />
        <Slide bgImage={capa3} bgPosition={'bottom'} />
      </Carousel>
      <Stack sx={{ mt: 5 }} direction={'row'} justifyContent={'center'}>
        <h3 className="title" style={{ fontSize: '1.4rem' }}>
          EM DESTAQUE
        </h3>
      </Stack>
    </>
  );
};

export default Home;
