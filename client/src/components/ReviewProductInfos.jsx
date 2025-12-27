import { Grid2, Box, Typography, Button, Stack } from '@mui/material';
import React from 'react';
import Carousel from 'react-multi-carousel';
import { responsive } from '../utils/carouselResponsiveness';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';

const ReviewProductInfos = ({
  data,
  onSubmit,
  onBack,
}) => {
  
  
  return (
    <Grid2
      container
      spacing={2}
      sx={{
        width: '100%',
        overflow: 'hidden',
        }}
    >
      <Grid2 size={{ xs: 12, md: 5 }}>
        <Box sx={{ width: '100%' }}>
          <Carousel
            swipeable={false}
            focusOnSelect={false}
            draggable={false}
            showDots={false}
            responsive={responsive}
            ssr={false}
            infinite={false}
            keyBoardControl={false}
            customTransition="all 0.5s ease-in-out"
            transitionDuration={500}
            removeArrowOnDeviceType={['mobile']}
            containerClass="carousel-container"
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
          >
            {data?.images?.map((image, idx) => (
              <Box
                key={idx}
                sx={{
                  backgroundImage: `url(${image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  height: '20rem',
                  borderRadius: 2,
                }}
              />
            ))}
          </Carousel>
        </Box>
      </Grid2>
      <Grid2 size={{ xs: 12, md: 7 }} sx={{width: '100%', }}>
        <Typography variant="h4" sx={{ fontSize: { xs: '1.5rem', md: '2.125rem' } }} textAlign={'center'} gutterBottom>
          {data?.name}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            wordBreak: 'break-all',
            hyphens: 'auto',
            overflow: 'auto',
            height:{xs:'100%', md:'20rem'},
            
          }}
        >
            <Typography
              color="text.secondary"
              variant="body2"
              textAlign={'justify'}
            >
              {data?.description}
            </Typography>
        
        </Box>
          <Stack
            direction={'row'}
            justifyContent={'space-between'}
            sx={{ px: 1, mt: 2, bottom:0 }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                color: 'rgba(0,0,0,0.6)',
              }}
            >
              <AttachMoneyOutlinedIcon />
              <Typography
                sx={{ fontWeight: 'bold' }}
                variant="body2"
              >
                {data?.price}
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                color: 'rgba(0,0,0,0.6)',
              }}
            >
              <ShoppingBagOutlinedIcon />
              <Typography
                sx={{ fontWeight: 'bold' }}
                variant="body2"
              >
                {`${data?.quantity} disponíveis`}
              </Typography>
            </Box>
          </Stack>
      </Grid2>

      <Grid2
        container
        size={12}
        spacing={2}
        justifyContent="center"
      >
        <Button
          onClick={onBack}
          sx={{
            backgroundColor: '#686868',
            color: 'white',
            fontWeight: 'bold',
            flex: 1,
            '&:hover': { backgroundColor: '#555' }
          }}
        >
          Voltar
        </Button>
        <Button
          onClick={onSubmit}
          sx={{
            backgroundColor: 'black',
            color: 'white',
            fontWeight: 'bold',
            flex: 1,
            '&:hover': { backgroundColor: '#333' }
          }}
        >
          Cadastrar
        </Button>
      </Grid2>
    </Grid2>
  );
};

export default ReviewProductInfos;
