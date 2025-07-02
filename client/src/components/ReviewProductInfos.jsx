import { Grid2, Box, Typography, Button, Stack } from '@mui/material';
import React from 'react';
import Carousel from 'react-multi-carousel';
import { responsive } from '../utils/carouselResponsiveness';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
const ReviewProductInfos = ({
  data,
  onSubmit,
  showReviewArea,
  returnToDescription,
}) => {
  return (
    <Grid2
      container
      rowSpacing={1}
      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      sx={{
        height: showReviewArea ? '60vh' : '0vh',
        opacity: showReviewArea ? 1 : 0,
        transition: '0.5s ease',
        overflow: 'auto',
      }}
    >
      <Grid2 size={5}>
        <Box sx={{}}>
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
            {data?.images.map((image, idx) => (
              <Box
                sx={{
                  backgroundImage: `url(${image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundOrigin: 'border-box',
                  minHeight: '20rem',
                  minWidth: '100%',
                }}
              />
            ))}
          </Carousel>
        </Box>
      </Grid2>
      <Grid2 size={7}>
        <Typography className="title" variant="h4" textAlign={'center'}>
          {data?.name}
        </Typography>
        <Box
          sx={{
            height: '92%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <Box
            sx={{
              height: '25rem',
              mt: 2,
              px: 2,
              overflow: 'auto',
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
            sx={{ px: 1 }}
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
                textAlign={'justify'}
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
                textAlign={'justify'}
              >
                {`${data?.quantity} disponíveis`}
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Grid2>

      <Grid2
        container
        direction={'row'}
        justifyContent={'center'}
        alignItems={'center'}
        columnSpacing={2}
        size={12}
      >
        <Button
          onClick={() => {
            returnToDescription();
          }}
          sx={{
            backgroundColor: '#686868',
            color: 'white',
            fontWeight: 'bold',
            minWidth: '49%',
          }}
        >
          Voltar
        </Button>
        <Button
          onClick={() => {
            onSubmit();
          }}
          sx={{
            backgroundColor: 'black',
            color: 'white',
            fontWeight: 'bold',
            minWidth: '49%',
          }}
        >
          Cadastrar
        </Button>
      </Grid2>
    </Grid2>
  );
};

export default ReviewProductInfos;
