import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton, DialogTitle, Dialog, Zoom } from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Zoom ref={ref} {...props} />;
});
const CriarProduto = ({ open, handleClose }) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      onClose={handleClose}
      fullWidth
      keepMounted
      maxWidth={'md'}
    >
      <DialogTitle>Set backup account</DialogTitle>
    </Dialog>
  );
};

export default CriarProduto;
