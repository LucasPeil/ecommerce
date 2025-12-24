import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Modal, 
  List, 
  ListItem, 
  ListItemText, 
  Paper,
  IconButton,
  Button
} from '@mui/material';
import { keyframes } from '@emotion/react';
import WarningIcon from '@mui/icons-material/Warning';
import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(237, 108, 2, 0.7), 0px 4px 10px rgba(0,0,0,0.1);
  }
  70% {
    box-shadow: 0 0 0 15px rgba(237, 108, 2, 0), 0px 4px 10px rgba(0,0,0,0.1);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(237, 108, 2, 0), 0px 4px 10px rgba(0,0,0,0.1);
  }
`;

const PendingImprovements = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // List of pending improvements - update this list as needed
  const improvements = [
    "Ajustar responsividade do Checkout",
    "Ajustar responsividade da página de criar produto",
    "Ajustar responsividade da página individual de cada produto",
    "Otimizar carregamento de imagens",
    "Implementar skeleton loader na página individual de cada produto",
    "Implementar notificações de sucesso/erro (criação de produto,checkout...)"
  ];

  return (
    <>
      <Box 
        sx={{ 
          position: 'fixed', 
          top: 20, 
          left: 20, 
          zIndex: 99999999999,
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#fff',
          padding: '8px 16px',
          borderRadius: '24px',
          boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',
          cursor: 'pointer',
          '&:hover': {
            backgroundColor: '#f5f5f5'
          },
          animation: `${pulse} 2s infinite`
        }}
        onClick={handleOpen}
      >
        <WarningIcon color="warning" sx={{ mr: 1 }} />
        <Typography variant="body2" fontWeight="bold">
          Melhorias pendentes
        </Typography>
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Paper sx={style}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Melhorias Pendentes
            </Typography>
            <IconButton onClick={handleClose} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
          
          <List>
            {improvements.map((item, index) => (
              <ListItem key={index} disablePadding sx={{ mb: 1 }}>
                <WarningIcon color="warning" sx={{ mr: 2, fontSize: 20 }} />
                <ListItemText primary={item} />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Modal>
    </>
  );
};

export default PendingImprovements;
