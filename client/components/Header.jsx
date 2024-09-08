import { Button, Stack, Typography, Box } from '@mui/material';
import React, { useState } from 'react';
import { Twirl as Hamburger } from 'hamburger-react';
import LocalGroceryStoreOutlinedIcon from '@mui/icons-material/LocalGroceryStoreOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
const Header = () => {
  const [isOpen, setOpen] = useState(false);
  return (
    <Stack
      direction={'row'}
      alignItems={'center'}
      justifyContent={'space-between'}
      sx={{
        backgroundColor: 'white',
        minWidth: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 100,
        px: 3,
        boxSizing: 'border-box',
      }}
    >
      <Hamburger toggled={isOpen} toggle={setOpen} />
      <h1 className="title" sx={{}}>
        FORNITURE
      </h1>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
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
