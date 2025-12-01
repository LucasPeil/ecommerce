import React from 'react';
import notFound from '../assets/products_not_found.png';
import { Box, Stack, Typography } from '@mui/material';
const ProductsNotFound = () => {
  return (
    <Stack
      direction={'column'}
      alignItems="center"
      justifyContent="center"
      spacing={6}
      sx={{ py: 4, width: '100%' }}
    >
      <Typography
        variant="h4"
        color="text.secondary"
        sx={{ fontWeight: 'bold', color: '#969696' }}
      >
        Nenhum produto encontrado
      </Typography>
      <Box
        component="img"
        src={notFound}
        alt={'produto não encontrado'}
        sx={{
          width: 360,
          height: 300,
          objectFit: 'cover',
          borderRadius: 2, // Use unidades do tema (8px)
          mr: 2,
          filter: 'grayscale(80%)',
        }}
      />
    </Stack>
  );
};

export default ProductsNotFound;
