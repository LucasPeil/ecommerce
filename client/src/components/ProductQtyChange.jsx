/* eslint-disable react/prop-types */
import { Add, Remove } from '@mui/icons-material';
import { IconButton, Paper, Typography } from '@mui/material';
import { useUpdateUserCartMutation } from '../slices/apiSlice';
import { useSelector } from 'react-redux';

const ProductQtyChange = ({ product }) => {
  const { token, user: userDb } = useSelector((state) => state.auth);
  const [updateUserCart] = useUpdateUserCartMutation();

  const handleUpdateQuantity = async (product, change) => {
    const newQuantity = product.qtySelected + change;
    if (newQuantity < 1) return;
    try {
      await updateUserCart({
        id: userDb._id,
        token,
        productId: product._id,
        qty: newQuantity,
        action: 'update_qty',
      }).unwrap();
    } catch (err) {
      console.error('Erro ao atualizar quantidade', err);
    }
  };
  return (
    <Paper
      elevation={0}
      variant="outlined"
      sx={{
        display: 'flex',
        alignItems: 'center',
        borderRadius: 5,
      }}
    >
      <IconButton
        size="small"
        onClick={() => handleUpdateQuantity(product, -1)}
        disabled={product.qtySelected <= 1}
      >
        <Remove fontSize="small" />
      </IconButton>

      <Typography sx={{ mx: 2, fontWeight: 'bold' }}>
        {product.qtySelected}
      </Typography>

      <IconButton size="small" onClick={() => handleUpdateQuantity(product, 1)}>
        <Add fontSize="small" />
      </IconButton>
    </Paper>
  );
};

export default ProductQtyChange;
