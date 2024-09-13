import { Button, Stack, Typography, Box } from '@mui/material';
import React, { useState } from 'react';
import { Twirl as Hamburger } from 'hamburger-react';
import LocalGroceryStoreOutlinedIcon from '@mui/icons-material/LocalGroceryStoreOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import CriarProduto from './CriarProduto';
const Header = () => {
  const [isOpen, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  return (
    <Stack
      direction={'row'}
      alignItems={'center'}
      justifyContent={'space-between'}
      sx={{
        backgroundColor: 'white',
        minWidth: '100%',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 200000000,
        px: 3,
        boxSizing: 'border-box',
      }}
    >
      <CriarProduto
        open={openDialog}
        handleClose={() => setOpenDialog(false)}
      />
      <Hamburger toggled={isOpen} toggle={setOpen} />
      <h1 className="title" sx={{}}>
        FORNITURE
      </h1>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button onClick={() => setOpenDialog(true)}>
          <Typography color="black" variant="button">
            Criar Produto
          </Typography>
        </Button>
        <Button>
          <Typography color="black" variant="button">
            Entrar
          </Typography>
        </Button>
        <Button sx={{ color: 'black', px: 0 }}>
          <LocalGroceryStoreOutlinedIcon sx={{ fontSize: '1.8rem' }} />
        </Button>
        <Button sx={{ color: 'black', px: 0 }}>
          <SearchOutlinedIcon sx={{ fontSize: '1.8rem' }} />
        </Button>
      </Box>
    </Stack>
  );
};

export default Header;
