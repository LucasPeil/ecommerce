import { Stack, Box, Typography } from '@mui/material';
import React from 'react';
import DoneAllOutlinedIcon from '@mui/icons-material/DoneAllOutlined';
const FormStepCompleted = ({ showVariable, Icon }) => {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      gap={2}
      sx={{
        height: '5vh',
        transition: '0.5s ease',
        transitionDelay: showVariable ? '0.5s' : 0,
        overflow: 'hidden',
        opacity: showVariable ? 1 : 0,
        backgroundColor: 'white',
        zIndex: 1000,
        mb: 2,
        borderBottom: '1px solid #999999',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Icon sx={{ fontSize: '2rem', color: '#999999' }} />
        <Typography
          variant="body1"
          sx={{ fontSize: '1.5rem', color: '#999999' }}
        >
          Concluído
        </Typography>
      </Box>
      <DoneAllOutlinedIcon />
    </Stack>
  );
};

export default FormStepCompleted;
