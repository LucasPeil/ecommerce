import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
const LoadingBackdrop = ({ open }) => {
  return (
    <Backdrop
      sx={(theme) => ({ color: '#fff', position: 'absolute', zIndex: 1000 })}
      open={open}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default LoadingBackdrop;
