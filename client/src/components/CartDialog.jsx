import React from 'react';
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
  Divider,
  CircularProgress,
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {
  useGetUserCartQuery,
  useUpdateUserCartMutation,
} from '../slices/apiSlice';
import { IconButton } from '@mui/material';
import EmptyCart from './EmptyCart';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProductQtyChange from './ProductQtyChange';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});
const CartDialog = ({ open, handleClose, userDbInfo }) => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  /*  useEffect(() => {
    setUser(getUser());
  }, []);
 */
  const { data } = useGetUserCartQuery(
    { id: userDbInfo?._id, token: token },
    {
      skip: !userDbInfo?._id,
    }
  );

  const [updateUserCart, { isFetching: updateCartIsFetching }] =
    useUpdateUserCartMutation();

  const removeFromCart = async (productId) => {
    try {
      await updateUserCart({
        id: userDbInfo?._id,
        token: token,
        productId: productId,
        action: 'remove',
      }).unwrap();
    } catch (error) {
      console.log('erro ao remover do carrinho', error);
    }
  };

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
          {data?.cart?.length > 0 ? (
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
                  {`R$ ${data?.cart?.reduce(
                    (acc, currentValue) =>
                      acc + currentValue.price * currentValue.qtySelected,
                    0
                  )}`}
                </Typography>
              </Stack>
              {data?.cart?.map((item, idx) => (
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
                      <ProductQtyChange product={item} />
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
                        onClick={async () => await removeFromCart(item._id)}
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
