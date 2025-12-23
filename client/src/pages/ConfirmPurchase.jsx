import DeleteIcon from '@mui/icons-material/Delete';
import {
  Box,
  Button,
  Link,
  Divider,
  Grid2 as Grid,
  IconButton,
  Paper,
  Typography,
} from '@mui/material';
import EmptyCart from '../components/EmptyCart';
import {
  useGetUserCartQuery,
  useUpdateUserCartMutation,
} from '../slices/apiSlice';
import { useSelector } from 'react-redux';
import LoadingSpinner from '../components/LoadingSpinner';
import CartItem from '../components/CartItem';
import { formatCurrency } from '../utils/formatCurrency';

const ConfirmPurchase = () => {
  const { token, user: userDb } = useSelector((state) => state.auth);
  const { data, isFetching: isFetchingCart } = useGetUserCartQuery(
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
      updateUserCart({
        id: userDb._id,
        token,
        productId,
        action: 'remove',
      });
    } catch (err) {
      console.error('Falha ao remover item', err);
    }
  };
  const handleCleanCart = async () => {
    try {
      updateUserCart({
        id: userDb._id,
        token,
        productId: null,
        action: 'remove_all',
      });
    } catch (err) {
      console.error('Falha ao remover item', err);
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
            <IconButton
              onClick={() => handleCleanCart()}
              disabled={cartItems?.length === 0 || isUpdating}
            >
              <DeleteIcon />
            </IconButton>
          </Box>

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
                    />
                  ))}
                  <Box display="flex" justifyContent="flex-end" mt={2}>
                    <Typography variant="body1">
                      Subtotal ({cartItems?.length} produtos):{' '}
                      <b>{formatCurrency(totalValue)}</b> &nbsp;
                    </Typography>
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
              <Link
                {...(cartItems?.length < 1 || isUpdating
                  ? { href: undefined, 'aria-disabled': 'true', tabIndex: -1 }
                  : { href:'/finalizar-compra' })}
                /* href="/finalizar-compra" */
                underline="none"
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
              </Link>
            </>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
};
export default ConfirmPurchase;
