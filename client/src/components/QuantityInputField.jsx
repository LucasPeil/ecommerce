import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import RemoveIcon from '@mui/icons-material/Remove';
import { IconButton, InputBase, Paper } from '@mui/material';
import React, { useEffect, useState } from 'react';

const QuantityInputField = ({ cart, refetchCart }) => {
  return (
    <Paper
      elevation={2}
      sx={{
        width: '5rem',
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <IconButton
        sx={{ p: 0 }}
        onClick={() => {
          const cartItem = { ...item };
          if (cartItem.qtySelected > 0) {
            const cartCopy = [...cart];
            const cartItemIndex = cartCopy.findIndex(
              (obj) => obj._id == cartItem._id
            );
            cartItem.qtySelected -= 1;
            /* e.target.value */

            cartCopy.splice(cartItemIndex, 1, cartItem);
            setCart(cartCopy);
          }
        }}
      >
        <RemoveIcon fontSize="small" />
      </IconButton>

      <InputBase
        sx={{
          flex: 1,
          fontSize: '1rem',
          '& .MuiInputBase-input': {
            padding: '0',
          },
        }}
        value={item.qtySelected /* qtySelected */}
        onChange={
          (e) => {
            const cartItem = { ...item };
            const cartCopy = [...cart];
            const cartItemIndex = cartCopy.findIndex(
              (obj) => obj._id == cartItem._id
            );
            cartItem.qtySelected = e.target.value /* e.target.value */;

            cartCopy.splice(cartItemIndex, 1, cartItem);
            setCart(cartCopy);
          } /* setQtySelected(e.target.value) */
        }
        slotProps={{
          input: {
            style: {
              textAlign: 'center',
            },
            type: 'number',
            min: 1,
            disabled: true,
          },
        }}
      />
      <IconButton
        sx={{ p: 0 }}
        onClick={
          () => {
            const cartItem = { ...item };
            const cartCopy = [...cart];
            const cartItemIndex = cartCopy.findIndex(
              (obj) => obj._id == cartItem._id
            );
            cartItem.qtySelected += 1;
            /* e.target.value */

            cartCopy.splice(cartItemIndex, 1, cartItem);
            setCart(cartCopy);
          }
          /*  qtySelected < singleProduct?.quantity &&
    setQtySelected(qtySelected + 1) */
        }
      >
        <AddIcon fontSize="small" />
      </IconButton>
    </Paper>
  );
};

export default QuantityInputField;
