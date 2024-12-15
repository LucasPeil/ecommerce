import React, { useRef, useEffect, useState } from 'react';
import {
  Backdrop,
  IconButton,
  TextField,
  Stack,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
const SearchBackdrop = ({ open, setOpen }) => {
  const textInput = useRef(null);
  const [autoFocus, setAutoFocus] = useState(true);
  useEffect(() => {
    textInput.current.focus();
  }, [open]);
  return (
    <Backdrop
      sx={{ zIndex: 10, backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
      open={open}
      onClick={() => {}}
    >
      <IconButton
        sx={{ color: 'white', position: 'absolute', top: 0, left: 0 }}
        onClick={() => setOpen(false)}
      >
        <CloseIcon fontSize="large" />
      </IconButton>
      <Stack
        sx={{
          width: '80%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <input
          ref={textInput}
          className="search-input"
          type="search"
          placeholder="Pesquisar"
          autoFocus={true}
          onBlur={({ target }) => target.focus()}
          onKeyDown={(e) => {
            if (e.key == 'Enter') {
              console.log('aquiii');
              setOpen(false);
            }
          }}
        />
        <Typography
          sx={{
            color: 'white',
            fontFamily: 'Dela Gothic One',
            width: '70%',
            textAlign: 'end',
            py: 2,
          }}
        >
          {' '}
          Aperte enter para pesquisar
        </Typography>
      </Stack>
    </Backdrop>
  );
};

export default SearchBackdrop;
