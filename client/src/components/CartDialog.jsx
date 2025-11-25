import React, { useState, useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Box,
  DialogTitle,
  Typography,
  Slide,
  Stack,
  InputBase,
  Paper,
  Divider,
  CircularProgress,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CloseIcon from '@mui/icons-material/Close';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {
  getUser,
  useGetUserCartQuery,
  useUpdateUserCartMutation,
} from '../slices/apiSlice';
import { IconButton } from '@mui/material';
import EmptyCart from './EmptyCart';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});
const CartDialog = ({ open, handleClose, userDbInfo }) => {
  const [cart, setCart] = useState([]);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  /*  useEffect(() => {
    setUser(getUser());
  }, []);
 */
  const {
    data,
    isFetching: isFetchingCart,
    refetch: refetchCart,
  } = useGetUserCartQuery(
    { id: userDbInfo?._id, token: token },
    {
      skip: !userDbInfo?._id,
    }
  );

  const [
    updateUserCart,
    { isSuccess: updateCartIsSuccess, isFetching: updateCartIsFetching },
  ] = useUpdateUserCartMutation();

  const removeFromCart = (productId) => {
    updateUserCart({
      id: userDbInfo?._id,
      token: token,
      productId: productId,
      action: 'remove',
    });
  };

  useEffect(() => {
    setCart(data?.cart);
  }, [isFetchingCart]);

  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        PaperProps={{
          style: {
            position: 'absolute',
            margin: 0,
            right: 0,
            top: 0,
            height: '100vh',
            maxHeight: '100vh',
            width: '18rem',
          },
        }}
      >
        <DialogActions sx={{ p: 0 }}>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogActions>
        <Divider>
          <DialogTitle
            sx={{
              py: 0,
              pb: 1,

              display: 'flex',
              justifyContent: 'center',
            }}
          >
            {'Seu Carrinho'}
          </DialogTitle>
        </Divider>

        <DialogContent
          sx={{
            display: 'flex',
            pt: 0,
            alignItems: 'center',
            flexDirection: 'column',
            gap: 2,
            overflowX: 'hidden',
          }}
        >
          {cart?.length > 0 ? (
            <>
              <Stack
                direction={'row'}
                justifyContent={'center'}
                alignItems={'center'}
                gap={1}
              >
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  Subtotal:
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  {`R$ ${cart?.reduce(
                    (acc, currentValue) =>
                      acc + currentValue.price * currentValue.qtySelected,
                    0
                  )}`}
                </Typography>
              </Stack>
              {cart?.map((item, idx) => (
                <Box
                  key={idx}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative',
                    width: '15rem',
                  }}
                >
                  <Box
                    sx={{
                      backgroundImage: `url(${item?.images[0]})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundOrigin: 'border-box',
                      height: '14rem',
                      minWidth: '100%',
                      transition: '0.5s ease',
                    }}
                  />
                  <Stack
                    sx={{
                      borderBottom: '1px solid #CDCDCD',
                      pt: 1,
                      pb: 2,
                      gap: 1,
                      minWidth: '100%',
                      position: 'relative',
                    }}
                  >
                    <Stack
                      direction={'row'}
                      sx={{
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <Typography variant="h6" sx={{}}>
                        {item?.name}
                      </Typography>
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
                          onClick={
                            () => {
                              if (item.qtySelected == 0) {
                                removeFromCart(item._id);
                              } else {
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
                              }
                            }
                            /* qtySelected >= 2 && setQtySelected(qtySelected - 1) */
                          }
                        >
                          {item.qtySelected == 0 ? (
                            <DeleteOutlineIcon fontSize="small" />
                          ) : (
                            <RemoveIcon fontSize="small" />
                          )}
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
                    </Stack>
                    <Stack
                      direction={'row'}
                      sx={{
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <Typography
                        variant="subtitle2"
                        sx={{ fontWeight: 'bold' }}
                      >
                        {`R$ ${item?.price}`}
                      </Typography>

                      <Button
                        sx={{ p: 0 }}
                        onClick={() => removeFromCart(item._id)}
                        disabled={updateCartIsFetching}
                      >
                        {updateCartIsFetching ? (
                          <CircularProgress size={15} />
                        ) : (
                          <DeleteOutlineIcon />
                        )}
                      </Button>
                    </Stack>
                  </Stack>
                </Box>
              ))}
              <Button
                onClick={() => {
                  handleClose();
                  navigate('/confirmar-pedido');
                }}
                variant="outlined"
                disableRipple
                sx={{
                  color: 'white',
                  backgroundColor: '#000000',
                  borderRadius: '3rem',
                  fontWeight: 'bold',
                  '&:hover': {
                    backgroundColor: 'white',
                    color: '#000000',
                  },
                }}
              >
                Finalizar compra
              </Button>
            </>
          ) : (
            <EmptyCart />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
export default CartDialog;
