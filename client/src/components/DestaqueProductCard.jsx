import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import quadro1 from '../assets/quadro-1.jpg';
import { ButtonBase } from '@mui/material';
const DestaqueProductCard = () => {
  return (
    <ButtonBase className="buttonBase" onClick={() => {}}>
      <Box
        sx={{
          minWidth: '75%',
          cursor: 'pointer',
          transition: '0.5s ease',
          '&:hover': {
            boxShadow:
              'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;',
          },
        }}
      >
        <Box sx={{ overflow: 'hidden' }}>
          <Box
            sx={{
              backgroundImage: `url(${quadro1})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundOrigin: 'border-box',
              minHeight: '20rem',
              minWidth: '100%',
              transition: '0.5s ease',

              '&:hover': {
                transform: 'scale(1.2)',
              },
            }}
          />
        </Box>
        <Stack sx={{ mt: 1, p: 1, borderBottom: '1px solid #CDCDCD' }}>
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
    </ButtonBase>
  );
};

export default DestaqueProductCard;
