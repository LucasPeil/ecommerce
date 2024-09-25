import { Box, Typography } from '@mui/material';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';

import React from 'react';

const NoPhoto = () => {
  return (
    <Box
      sx={{
        height: 'calc(55vh - 4rem)',
        display: 'flex',
        justifyContent: 'center',
        mt: 2,
      }}
    >
      <Box
        sx={{
          backgroundColor: '#DCDCDC',
          width: '85%',
          height: '80%',
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
          <InsertPhotoOutlinedIcon fontSize="large" />
          <Typography variant="body1" color="text.secondary">
            Nehuma foto adicionada
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default NoPhoto;
