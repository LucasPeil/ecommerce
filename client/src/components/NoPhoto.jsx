import { Box, Button, Typography } from '@mui/material';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';

import React from 'react';

const NoPhoto = ({ handleFile }) => {
  return (
   
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            
          }}
        >
          <InsertPhotoOutlinedIcon sx={{ fontSize: '2.5rem' }} />

          <Typography variant="h5" color="text.secondary">
            Nehuma foto adicionada
          </Typography>
        </Box>
     
  );
};

export default NoPhoto;
