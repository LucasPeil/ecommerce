import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import quadro1 from '../assets/quadro-1.jpg';
const DestaqueProductCard = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        /* border: '1px solid blue', */
        justifyContent: 'center',
      }}
    >
      <Box sx={{ minWidth: '80%' }}>
        <Box
          sx={{
            backgroundImage: `url(${quadro1})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundOrigin: 'border-box',
            minHeight: '20rem',
            minWidth: '100%',
          }}
        />
        <Stack sx={{ mt: 1 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
            Produto 1
          </Typography>
          <Typography
            variant="caption"
            color="text.secondary"
            gutterBottom
            sx={{}}
          >
            R$ 199,00
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
};

export default DestaqueProductCard;
