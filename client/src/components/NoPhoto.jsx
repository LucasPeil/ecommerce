import { Box, Button, Typography } from '@mui/material';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';

import React from 'react';

const NoPhoto = ({ handleFile }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        '&:hover': { backgroundColor: 'transparent' },
      }}
    >
      <Box
        sx={{
          backgroundColor: '#DCDCDC',
          width: '100%',
          height: '100%',
          border: '4px dashed #5D5D5D',
          borderRadius: '1rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <InsertPhotoOutlinedIcon sx={{ fontSize: '2.5rem' }} />

          <Typography variant="h5" color="text.secondary">
            Nehuma foto adicionada
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default NoPhoto;
