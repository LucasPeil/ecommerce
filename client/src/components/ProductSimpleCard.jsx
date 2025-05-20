import { Box, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';

const ProductSimpleCard = ({ product }) => {
  return (
    <Box sx={{ width: '20%' }}>
      <Box sx={{ overflow: 'hidden' }}>
        <Box
          sx={{
            backgroundImage: `url(${product?.images[0]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundOrigin: 'border-box',
            minHeight: '18rem',
            maxWidth: '100%',
            transition: '0.5s ease',
          }}
        />
      </Box>
      <Stack sx={{ mt: 1, p: 1, borderBottom: '1px solid #CDCDCD' }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
          {product.name}
        </Typography>
        <Typography
          variant="caption"
          color="text.secondary"
          gutterBottom
          sx={{}}
        >
          {`R$ ${product.price}`}
        </Typography>
      </Stack>
    </Box>
  );
};

export default ProductSimpleCard;
