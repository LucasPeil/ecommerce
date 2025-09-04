import React from 'react';
import { Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
const SliderImagem = ({
  imagem,
  minHeight,
  minWidth,
  showCloseButton,
  closeFunction,
}) => {
  return (
    <Box sx={{ position: 'relative' }}>
      <Box
        sx={{
          backgroundImage: `url(${imagem})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundOrigin: 'border-box',
          minHeight: minHeight,
          minWidth: minWidth,
        }}
      />
      {showCloseButton && (
        <IconButton
          sx={{ position: 'absolute', top: 0, right: 0 }}
          onClick={closeFunction}
        >
          <CloseIcon sx={{ color: 'black' }} />
        </IconButton>
      )}
    </Box>
  );
};

export default SliderImagem;
