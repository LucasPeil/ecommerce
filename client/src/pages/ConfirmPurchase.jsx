import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveIcon from '@mui/icons-material/Remove';
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
import React, { useEffect, useState } from 'react';
import EmptyCard from '../components/EmptyCard';
import {
  getUser,
  useGetUserCartQuery,
  useUpdateUserCartMutation,
} from '../slices/apiSlice';

const ConfirmPurchase = () => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [productsIds, setProductsIds] = useState([]);
  useEffect(() => {
    setUser(getUser());
  }, []);
  const {
    data,
    isFetching: isFetchingCart,
    isSuccess: getCartSuccess,
    refetch: refetchCart,
  } = useGetUserCartQuery(
    { id: user?._id },
    {
      skip: !user?._id,
    }
  );

  useEffect(() => {
    setCart(data?.cart);
  }, [isFetchingCart, getCartSuccess]);
  console.log('cart', cart);
  const [
    updateUserCart,
    { isSuccess: updateCartIsSuccess, isFetching: updateCartIsFetching },
  ] = useUpdateUserCartMutation();
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
        <Paper elevation={3} sx={{ borderRadius: 3, p: 3 }}>
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

          {cart?.length == 0 ? (
            <EmptyCard />
          ) : (
            <>
              {/* Lista de produtos */}

              {cart?.map((product, idx) => (
                <Box
                  key={idx}
                  display="flex"
                  py={2}
                  borderBottom="1px solid #e0e0e0"
                >
                  <img
                    src={product?.images[0]}
                    alt="Produto"
                    style={{
                      width: 120,
                      height: 90,
                      objectFit: 'cover',
                      borderRadius: 8,
                      marginRight: 16,
                    }}
                  />
                  <Box flexGrow={1}>
                    <Typography variant="h6" fontWeight="bold">
                      {product?.name}
                    </Typography>
                    {product?.available ? (
                      <Typography color="green">Em estoque</Typography>
                    ) : (
                      <Typography color="error">Esgotado</Typography>
                    )}

                    <Box mt={1}>
                      <Typography variant="body2">Quantidade</Typography>
                      <Paper
                        elevation={2}
                        sx={{
                          width: '5rem',
                          py: 1,
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}
                      >
                        <IconButton
                          sx={{ p: 0 }}
                          onClick={() => {
                            const cartItem = { ...product };
                            if (cartItem.qtySelected > 1) {
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
                          value={product.qtySelected /* qtySelected */}
                          onChange={
                            (e) => {
                              const cartItem = { ...product };
                              const cartCopy = [...cart];
                              const cartItemIndex = cartCopy.findIndex(
                                (obj) => obj._id == cartItem._id
                              );
                              cartItem.qtySelected =
                                e.target.value /* e.target.value */;

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
                          onClick={() => {
                            const cartItem = { ...product };
                            const cartCopy = [...cart];
                            const cartItemIndex = cartCopy.findIndex(
                              (obj) => obj._id == cartItem._id
                            );
                            cartItem.qtySelected += 1;
                            /* e.target.value */

                            cartCopy.splice(cartItemIndex, 1, cartItem);
                            setCart(cartCopy);
                          }}
                        >
                          <AddIcon fontSize="small" />
                        </IconButton>
                      </Paper>
                    </Box>
                    <Button
                      mt={1}
                      onClick={() => {
                        updateUserCart({
                          id: user._id,
                          productId: product._id,
                          action: 'remove',
                        });
                      }}
                      sx={{
                        textTransform: 'none',
                        p: 0,
                        color: 'black',
                        justifyContent: 'start',
                        '&:hover': {
                          backgroundColor: 'transparent',
                        },
                      }}
                    >
                      <Typography
                        variant="caption"
                        sx={{ cursor: 'pointer', p: 0, m: 0 }}
                      >
                        Excluir
                      </Typography>
                    </Button>
                  </Box>
                  <Typography fontWeight={500} alignSelf="flex-start">
                    R$ {product?.price}
                  </Typography>
                </Box>
              ))}

              <Box display="flex" justifyContent="flex-end" mt={2}>
                <Typography variant="body1">
                  Subtotal ({cart?.length} produtos):&nbsp;
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  {`R$ ${cart?.reduce(
                    (acc, currentValue) =>
                      acc + currentValue.price * currentValue.qtySelected,
                    0
                  )}`}
                </Typography>
              </Box>
            </>
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
          <Box>
            <Typography component={'span'} variant="body1">
              Total:&nbsp;
            </Typography>
            <Typography
              component={'span'}
              variant="body1"
              sx={{ fontWeight: 'bold' }}
            >
              {`R$ ${cart?.reduce(
                (acc, currentValue) =>
                  acc + currentValue.price * currentValue.qtySelected,
                0
              )}`}
            </Typography>
          </Box>
          <Button
            variant="contained"
            disabled={cart?.length < 1}
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
            FINALIZAR COMPRA
          </Button>
        </Paper>
      </Grid>
    </Grid>
  );
};
export default ConfirmPurchase;
