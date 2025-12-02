import React from 'react';
import reviewSectionImg from '../assets/mesinha-espelho.jpg';
import { Box, Grid2, Stack } from '@mui/material'; // Removi Typography não usado
import CardReview from './CardReview';
import DoubleArrowOutlinedIcon from '@mui/icons-material/DoubleArrowOutlined';
const ReviewSection = () => {
  const modules = import.meta.glob('../assets/avatar/*.{jpg,jpeg,png,webp}', {
    eager: true,
  });

  const reviews = Object.values(modules).map((module, idx) => {
    return {
      name: `Avaliador ${idx + 1}`,
      image: module.default,
      review:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ultricies nisi diam, ut interdum mi luctus ac.'.repeat(
          Math.floor(Math.random() * 3) + 1
        ),
    };
  });

  return (
    <Grid2
      container
      spacing={4}
      sx={{
        mt: 6,

        alignItems: 'flex-start',
      }}
    >
      {/* --- COLUNA DA IMAGEM --- */}
      <Grid2 size={{ xs: 12, md: 7 }} sx={{ position: 'relative' }}>
        <Box
          sx={{
            flexDirection: 'row',
            justifyContent: 'center',
            position: 'absolute',
            top: 0,
            width: '100%',
            height: '100%',
            pt: 2,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Stack direction={'row'} alignItems="center" sx={{ width: '100%' }}>
            <h3
              className="title"
              style={{
                fontSize: '2.5rem',
                color: 'white',
                textAlign: 'center',
              }}
            >
              SAIBA O QUE NOSSOS CLIENTES ESTÃO DIZENDO
            </h3>
            <DoubleArrowOutlinedIcon
              sx={{
                fontSize: '3rem',
                color: 'white',
                animation: 'bounce 2s infinite',
                '@keyframes bounce': {
                  '0%, 100%': { transform: 'translateX(0)' },
                  '50%': { transform: 'translateX(-15px)' },
                },
              }}
            />
          </Stack>
        </Box>
        <Box
          component="img"
          src={reviewSectionImg}
          alt={'review section'}
          sx={{
            width: '100%',
            height: { xs: '300px', md: '840px' },
            display: 'block',
            borderRadius: 2,
            objectFit: 'cover',
          }}
        />
      </Grid2>

      {/* --- COLUNA DOS REVIEWS --- */}
      <Grid2
        size={{ xs: 12, md: 5 }}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Stack
          direction={'row'}
          sx={{
            gap: 2,
            px: 2,
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            width: '100%',
          }}
        >
          {reviews.map((review, index) => (
            <CardReview key={index} review={review} />
          ))}
        </Stack>
      </Grid2>
    </Grid2>
  );
};

export default ReviewSection;
