import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Slide from '../components/Slide';
import capa1 from '../assets/capa-1.jpg';
import capa2 from '../assets/capa-2.jpg';
import capa3 from '../assets/capa-3.jpg';

import quartoCapa from '../assets/quarto-capa.jpg';
import { Stack, Box, Button, Grid2 } from '@mui/material';
import DestaqueSlider from '../components/DestaqueSlider';
import Footer from '../components/Footer';
import { responsive } from '../utils/carouselResponsiveness';
import CategoryTabs from '../components/CategoryTabs';
import { useNavigate } from 'react-router-dom';
import ReviewSection from '../components/ReviewSection';

const Home = () => {
  const navigate = useNavigate();
  return (
    <Grid2 container spacing={5} sx={{ alignItems: 'flex-start' }}>
      <Grid2 size={12}>
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
      </Grid2>
       <Grid2 size={12}>
        <Stack rowGap={'2rem'}>
          <Stack sx={{}} direction={'row'} justifyContent={'center'}>
            <h3 className="title" style={{ fontSize: '1.4rem' }}>
              EM DESTAQUE
            </h3>
          </Stack>

          <DestaqueSlider />
        </Stack>
      </Grid2> 
      <Grid2 size={12}>
        <Box sx={{ position: 'relative' }}>
          <Box
            sx={{
              backgroundImage: `url(${quartoCapa})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundOrigin: 'border-box',
              minHeight: '90vh',
              minWidth: '100%',
              filter: 'brightness(33%)',
            }}
          />
          <Box
            sx={{
              height: '100%',
              width: '100%',
              position: 'absolute',
              top: 0,
              left: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              rowGap: '5rem',
            }}
          >
            <Stack flexDirection={'row'} justifyContent={'center'} sx={{}}>
              <Box sx={{ width: '70%' }}>
                <h3
                  className="title"
                  style={{
                    fontSize: '2.5rem',
                    color: 'white',
                    textAlign: 'center',
                  }}
                >
                  FAÇA SEU QUARTO UM LUGAR MAIS CONFORTÁVEL
                </h3>
              </Box>
            </Stack>
            <Stack flexDirection={'row'} justifyContent={'center'} sx={{}}>
              <Button
                variant="contained"
                onClick={() => navigate('/catalogo/quarto')}
                sx={{
                  color: 'black',
                  backgroundColor: 'white',
                  fontWeight: 'bold',
                  fontSize: '1.2rem',
                  px: 5,
                  py: 1,
                  letterSpacing: 6,
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    backgroundColor: 'black',
                    color: 'white',
                    transform: 'scale(110%)',
                  },
                }}
              >
                <span className="slideButton">Confira</span>
              </Button>
            </Stack>
          </Box>
        </Box>
      </Grid2>
       <Grid2 size={12}>
        <CategoryTabs />
      </Grid2> 

      <ReviewSection />
 
      <Grid2 size={{ xs: 12, md: 12 }}>
        <Footer />
      </Grid2>
    </Grid2>
  );
};

export default Home;
