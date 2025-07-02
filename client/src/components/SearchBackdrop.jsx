import React, { useRef, useEffect, useState } from 'react';
import {
  Backdrop,
  IconButton,
  TextField,
  Stack,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { resetTextFiler, setTextFilter } from '../slices/products';
import { useDispatch, useSelector } from 'react-redux';
import { useLazyGetAllProductsQuery } from '../slices/apiSlice';
import { useNavigate } from 'react-router-dom';
const SearchBackdrop = ({ open, setOpen }) => {
  const textInput = useRef(null);
  const [text, setText] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [getProducts, { data: products, isFetching }] =
    useLazyGetAllProductsQuery();
  useEffect(() => {
    textInput.current.focus();
    return () => {
      if (!open) dispatch(resetTextFiler());
    };
  }, [open]);
  console.log(products);
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
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="search-input"
          type="search"
          placeholder="Qual produto você procura?"
          autoFocus={true}
          onBlur={({ target }) => target.focus()}
          onKeyDown={(e) => {
            if (e.key == 'Enter') {
              setOpen(false);

              getProducts({
                first: 5,
                after: null,
                filter: [],
                searchText: text,
              });
              setText('');
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
          Aperte enter para pesquisar
        </Typography>
      </Stack>
    </Backdrop>
  );
};

export default SearchBackdrop;
