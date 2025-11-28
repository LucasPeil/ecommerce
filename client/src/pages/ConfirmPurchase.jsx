import DeleteIcon from '@mui/icons-material/Delete';
import {
  Box,
  Button,
  Divider,
  Grid2 as Grid,
  IconButton,
  InputBase,
  Paper,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import EmptyCart from '../components/EmptyCart';
import {
  getUser,
  useGetUserCartQuery,
  useUpdateUserCartMutation,
} from '../slices/apiSlice';
import { useSelector } from 'react-redux';
import LoadingSpinner from '../components/LoadingSpinner';
import CartItem from '../components/CartItem';
import { formatCurrency } from '../utils/formatCurrency';

const ConfirmPurchase = () => {
  const { token, user: userDb } = useSelector((state) => state.auth);
  const {
    data,
    isFetching: isFetchingCart,
    isSuccess: getCartSuccess,
  } = useGetUserCartQuery(
    { id: userDb?._id, token: token },
    {
      skip: !token,
    }
  );

  const cartItems = data?.cart || [];

  const [updateUserCart, { isLoading: isUpdating }] =
    useUpdateUserCartMutation();

  const handleRemoveItem = async (productId) => {
    try {
      await updateUserCart({
        id: userDb._id,
        token,
        productId,
        action: 'remove',
      }).unwrap();
    } catch (err) {
      console.error('Falha ao remover item', err);
    }
  };
  const handleUpdateQuantity = async (product, change) => {
    const newQuantity = product.qtySelected + change;
    console.log(product._id);
    if (newQuantity < 1) return;
    try {
      updateUserCart({
        id: userDb._id,
        token,
        productId: product._id,
        qty: newQuantity, // Envia a nova qtd
        action: 'update_qty',
      });
    } catch (err) {
      console.error('Erro ao atualizar quantidade', err);
    }
  };
  // 4. Cálculos Derivados (Memoization implícita na renderização é ok aqui)
  const totalValue = cartItems.reduce(
    (acc, item) => acc + item.price * item.qtySelected,
    0
  );
  return (
    <Grid
      container
      spacing={4}
      p={4}
      sx={{
        transform: 'translateY(100px)',
        height: 'calc(100vh - 100px)',
      }}
    >
      {/* Carrinho */}
      <Grid size={{ xs: 12, md: 9 }}>
        <Paper
          elevation={3}
          sx={{
            borderRadius: 3,
            p: 3,
          }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6" fontWeight="bold">
              Seu carrinho
            </Typography>
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </Box>

          <Typography variant="body2" color="text.secondary" mt={1} mb={2}>
            Desmarcar todos itens
          </Typography>

          <Divider />

          {cartItems?.length == 0 ? (
            <EmptyCart />
          ) : (
            <Box
              sx={{
                minHeight: 300,
                mt: 2,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Lista de produtos */}
              {isFetchingCart ? (
                <LoadingSpinner />
              ) : (
                <>
                  {cartItems?.map((product) => (
                    <CartItem
                      key={product._id}
                      product={product}
                      onRemove={handleRemoveItem}
                      onUpdateQuantity={handleUpdateQuantity}
                    />
                  ))}
                  <Box display="flex" justifyContent="flex-end" mt={2}>
                    <Typography variant="body1">
                      Subtotal ({cartItems?.length} produtos):{' '}
                      <b>{formatCurrency(totalValue)}</b> &nbsp;
                    </Typography>
                    {/*   <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                      {`R$ ${cartItems?.reduce(
                        (acc, currentValue) =>
                          acc + currentValue.price * currentValue.qtySelected,
                        0
                      )}`}
                    </Typography> */}
                  </Box>
                </>
              )}
            </Box>
          )}
        </Paper>
      </Grid>

      {/* Resumo */}
      <Grid size={{ xs: 12, md: 3 }}>
        <Paper
          elevation={3}
          sx={{
            borderRadius: 3,
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
          }}
        >
          {isFetchingCart ? (
            <LoadingSpinner />
          ) : (
            <>
              <Box>
                <Typography component={'span'} variant="body1">
                  Total:&nbsp;
                </Typography>
                <Typography
                  component={'span'}
                  variant="body1"
                  sx={{ fontWeight: 'bold' }}
                >
                  {formatCurrency(totalValue)}
                </Typography>
              </Box>
              <Button
                variant="contained"
                disabled={cartItems?.length < 1 || isUpdating}
                sx={{
                  backgroundColor: '#000',
                  color: '#fff',
                  borderRadius: 10,
                  fontWeight: 'bold',
                  px: 4,
                  py: 1,
                  display: 'flex',
                  '&:hover': {
                    backgroundColor: '#333',
                  },
                }}
              >
                {isUpdating ? 'ATUALIZANDO...' : 'FINALIZAR COMPRA'}
              </Button>
            </>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
};
export default ConfirmPurchase;
