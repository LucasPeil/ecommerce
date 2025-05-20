import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Box, Typography } from '@mui/material';
import React from 'react';
import cartIcon from '../assets/shopping_cart_icon_2.svg';
const EmptyCard = () => {
  return (
    <Box
      sx={{
        flexDirection: 'column',
        display: 'flex',
        alignItems: 'center',
        gap: 2,
      }}
    >
      <ShoppingCartOutlinedIcon
        sx={{ fontSize: '8rem', mt: 1, color: '#999999' }}
      />
      <Typography variant="h6" color="text.secondary">
        Seu carrinho está vazio
      </Typography>
    </Box>
  );
};

export default EmptyCard;
