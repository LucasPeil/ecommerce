import { Button, Stack, Typography, Box, Badge } from '@mui/material';
import React, { useState } from 'react';
import { Twirl as Hamburger } from 'hamburger-react';
import LocalGroceryStoreOutlinedIcon from '@mui/icons-material/LocalGroceryStoreOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import CriarProduto from './ProdutoModal/CriarProduto';
import { useTheme } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';

const Header = () => {
  const [isOpen, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const theme = useTheme();
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
        zIndex: 200,
        px: 3,
        boxSizing: 'border-box',
        maxHeight: '100px',
      }}
    >
      <CriarProduto
        open={openDialog}
        handleClose={() => setOpenDialog(false)}
      />
      <Hamburger toggled={isOpen} toggle={setOpen} />
      <h1 className="title" sx={{}}>
        <Link style={{ underline: 'none', color: '#000000' }} to="/">
          FORNITURE
        </Link>
      </h1>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button onClick={() => setOpenDialog(true)}>
          <Typography color="black" variant="button">
            Criar Produto
          </Typography>
        </Button>

        <NavLink to={'/login'}>
          <Typography color="black" variant="button">
            Entrar
          </Typography>
        </NavLink>

        <Button sx={{ color: 'black', px: 0 }}>
          <Badge badgeContent={4} color={'darkColor'}>
            <LocalGroceryStoreOutlinedIcon sx={{ fontSize: '1.8rem' }} />
          </Badge>
        </Button>

        <Button sx={{ color: 'black', px: 0 }}>
          <SearchOutlinedIcon sx={{ fontSize: '1.8rem' }} />
        </Button>
      </Box>
    </Stack>
  );
};

export default Header;
