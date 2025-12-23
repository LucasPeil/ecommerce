import {
  Button,
  Stack,
  Typography,
  Box,
  Badge,
  useMediaQuery,
  IconButton,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Twirl as Hamburger } from 'hamburger-react';
import LocalGroceryStoreOutlinedIcon from '@mui/icons-material/LocalGroceryStoreOutlined';

import { useTheme } from '@mui/material/styles';

import { NavLink } from 'react-router-dom';
// import { logout } from '../slices/user';

import CartDialog from './CartDialog';

import { useAuth0 } from '@auth0/auth0-react';

const Header = ({ refetch, userDbInfo }) => {
  const { getAccessTokenSilently, loginWithRedirect, isAuthenticated, logout } =
    useAuth0();
  const [isOpen, setOpen] = useState(false);
  const [openCartDialog, setOpenCartDialog] = useState(false);
  useEffect(() => {
    const getToken = async () => {
      await getAccessTokenSilently({
        authorizationParams: {
          audience: 'https://ecommerce-api',
        },
      });
    };
    getToken();
  }, []);

  const theme = useTheme();
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
        zIndex: 1000000,

        boxSizing: 'border-box',
        height: '80px',
      }}
    >
      <CartDialog
        userDbInfo={userDbInfo}
        open={openCartDialog}
        handleClose={() => setOpenCartDialog(false)}
      />

      {downMd && <Hamburger toggled={isOpen} toggle={setOpen} />}

      <h1
        className="title"
        style={{
          textAlign: 'center',
          margin: 'auto auto',
        }}
      >
        <NavLink
          style={{
            color: '#000000',
          }}
          to="/"
        >
          FORNITURE
        </NavLink>
      </h1>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          px: 2,
          zIndex: 5,
          position: 'absolute',
          right: 0,
        }}
      >
        <NavLink to="criar-produto">
          <Typography color="black" variant="button">
            Criar Produto
          </Typography>
        </NavLink>
        <NavLink to="catalogo">
          <Typography color="black" variant="button">
            Catalogo
          </Typography>
        </NavLink>

        {isAuthenticated ? (
          <Button
            onClick={() => {
              logout({
                logoutParams: {
                  returnTo: window.location.origin,
                },
              });
            }}
          >
            <Typography color="black" variant="button">
              Logout
            </Typography>
          </Button>
        ) : (
          <Button
            onClick={() => {
              loginWithRedirect({
                authorizationParams: {
                  audience: 'https://ecommerce-api',
                },
              });
            }}
          >
            <Typography color="black" variant="button">
              Entrar
            </Typography>
          </Button>
        )}

        <IconButton
          sx={{ color: 'black', '&:hover': { backgroundColor: 'transparent' } }}
          onClick={() => {
            refetch();
            setOpenCartDialog(true);
          }}
        >
          <Badge
            badgeContent={isAuthenticated ? userDbInfo?.cart?.length : 0}
            color={'darkColor'}
            sx={{}}
          >
            <LocalGroceryStoreOutlinedIcon
              sx={{
                fontSize: '1.8rem',
              }}
            />
          </Badge>
        </IconButton>
      </Box>
    </Stack>
  );
};

export default Header;
