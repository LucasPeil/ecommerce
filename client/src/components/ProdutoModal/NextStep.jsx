import { Button, Typography } from '@mui/material';
import React from 'react';

const NextStep = ({ actionFuncToShow, actionFuncToHide }) => {
  return (
    <Button
      sx={{ display: 'flex', alignItems: 'center', gap: 2 }}
      onClick={() => {}}
    >
      <Button
        disableRipple
        onClick={() => {
          actionFuncToShow(true);
          actionFuncToHide(false);
        }}
      >
        <Typography
          variant="body1"
          sx={{
            color: '#000000',
            borderBottom: '1px solid black',
            overflow: 'hidden',
          }}
        >
          Próximo passo
        </Typography>
      </Button>
    </Button>
  );
};

export default NextStep;
