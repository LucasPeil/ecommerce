import {
  Button,
  Stack,
  Typography,
  Box,
  Badge,
  useMediaQuery,
  IconButton,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Twirl as Hamburger } from 'hamburger-react';
import LocalGroceryStoreOutlinedIcon from '@mui/icons-material/LocalGroceryStoreOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import CriarProduto from './ProdutoModal/CriarProduto';
import { useTheme } from '@mui/material/styles';
import { useSelector, useDispatch } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { logout } from '../slices/user';
import SearchBackdrop from './SearchBackdrop';

import CartDialog from './CartDialog';
import { useGetUserCartQuery } from '../slices/apiSlice';

const Header = ({ id, userDbInfo, user, setUser }) => {
  const [isOpen, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openCartDialog, setOpenCartDialog] = useState(false);
  const [openSearchBackdrop, setOpenSearchBackdrop] = useState(false);
  const { refetch } = useGetUserCartQuery(
    { id: user?._id },
    {
      skip: !user?._id,
    }
  );
  const theme = useTheme();
  const dispatch = useDispatch();
  const downMd = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Stack
      direction={'row'}
      alignItems={'center'}
      justifyContent={downMd ? 'space-between' : 'end'}
      sx={{
        backgroundColor: 'white',
        minWidth: '100%',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 200,
        /* px: 3, */
        boxSizing: 'border-box',
        height: '80px',
      }}
    >
      <CartDialog
        open={openCartDialog}
        handleClose={() => setOpenCartDialog(false)}
      />
      <SearchBackdrop
        open={openSearchBackdrop}
        setOpen={setOpenSearchBackdrop}
      />
      <CriarProduto
        open={openDialog}
        handleClose={() => setOpenDialog(false)}
      />
      {downMd && <Hamburger toggled={isOpen} toggle={setOpen} />}
      <h1
        className="title"
        style={{
          width: '100%',
          position: 'absolute',
          textAlign: 'center',
        }}
      >
        <Link
          style={{
            textDecoration: 'none',
            color: '#000000',
          }}
          to="/"
        >
          FORNITURE
        </Link>
      </h1>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          px: 2,
          zIndex: 5,
        }}
      >
        <Button onClick={() => setOpenDialog(true)}>
          <Typography color="black" variant="button">
            Criar Produto
          </Typography>
        </Button>
        {id ? (
          <Button
            onClick={() => {
              dispatch(logout());
              setUser(null);
            }}
          >
            <Typography color="black" variant="button">
              Logout
            </Typography>
          </Button>
        ) : (
          <NavLink style={{ textDecoration: 'none' }} to={'/login'}>
            <Typography color="black" variant="button">
              Entrar
            </Typography>
          </NavLink>
        )}

        <IconButton
          sx={{ color: 'black', px: 0 }}
          onClick={() => {
            refetch();
            setOpenCartDialog(true);
          }}
        >
          <Badge
            badgeContent={user ? userDbInfo?.cart.length : 0}
            color={'darkColor'}
          >
            <LocalGroceryStoreOutlinedIcon sx={{ fontSize: '1.8rem' }} />
          </Badge>
        </IconButton>

        <IconButton
          sx={{ color: 'black', px: 0 }}
          onClick={() => setOpenSearchBackdrop(true)}
        >
          <SearchOutlinedIcon sx={{ fontSize: '1.8rem' }} />
        </IconButton>
      </Box>
    </Stack>
  );
};

export default Header;
