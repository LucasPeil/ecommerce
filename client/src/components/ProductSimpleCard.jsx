import { Box, Skeleton, Stack, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import useImageIsLoading from '../hooks/useImageIsLoading';

const ProductSimpleCard = ({ product }) => {
  const imageIsLoading = useImageIsLoading({ image: product?.images[0] });
  return (
    <Box sx={{ width: 280 }}>
      {!imageIsLoading ? (
        <Box>
          <Skeleton variant="rectangular" width="100%" height={300} />
          <Skeleton variant="text" width="60%" sx={{ mt: 2 }} />
          <Skeleton variant="text" width="40%" />
          <Skeleton variant="text" width="80%" />
        </Box>
      ) : (
        <>
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
            <Typography variant="caption" color="text.secondary" gutterBottom>
              {`R$ ${product.price}`}
            </Typography>
          </Stack>
        </>
      )}
    </Box>
  );
};

export default ProductSimpleCard;
