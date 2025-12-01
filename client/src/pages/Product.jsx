import React, { useRef, useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  InputBase,
  Paper,
  IconButton,
  Button,
  Stack,
  TextField,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import LocalGroceryStoreOutlinedIcon from '@mui/icons-material/LocalGroceryStoreOutlined';
import RemoveShoppingCartOutlinedIcon from '@mui/icons-material/RemoveShoppingCartOutlined';
import Grid from '@mui/material/Grid2';
import { responsive } from '../utils/carouselResponsiveness';
import Carousel from 'react-multi-carousel';
import CustomDot from '../components/CustomDot';
import SliderImagem from '../components/SliderImagem';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  useGetProductQuery,
  useUpdateUserCartMutation,
} from '../slices/apiSlice';
import { useNavigate } from 'react-router-dom';
const Product = ({ refetchGetUserCart, isFetchingCart, userDbInfo }) => {
  const { id } = useParams();
  const { token } = useSelector((state) => state.auth);
  const [qtySelected, setQtySelected] = useState(1);
  const navigate = useNavigate();
  let carouselRef = useRef();
  const [showCarousel] = useState(true);
  const [updateUserCart, { isSuccess: isSuccessUpdateCart }] =
    useUpdateUserCartMutation();
  const { data: singleProduct, isFetching } = useGetProductQuery(id);

  useEffect(() => {
    if (isSuccessUpdateCart) {
      refetchGetUserCart();
    }
  }, [isSuccessUpdateCart]);

  return (
    <>
      {isFetching ? (
        <TextField>Loading</TextField>
      ) : (
        <Container
          maxWidth="xl"
          sx={{
            flexGrow: 1,
            transform: 'translateY(100px)',

            px: 12,
            height: 'calc(100vh - 100px)',
          }}
        >
          <Grid container spacing={6} sx={{ height: '100%' }}>
            <Grid size={6} alignContent={'center'} sx={{}}>
              <Carousel
                style={{ display: 'none' }}
                ref={carouselRef}
                customTransition="all 0.5s ease-in-out"
                transitionDuration={500}
                removeArrowOnDeviceType={['mobile']}
                showDots
                slidesToSlide={1}
                containerClass="carousel-with-custom-dots"
                responsive={responsive}
                partialVisible
                renderDotsOutside={true}
                customDot={
                  <CustomDot
                    photosToDisplay={
                      singleProduct?.images ? singleProduct?.images : []
                    }
                    showCarousel={showCarousel}
                    showCloseButton={false}
                  />
                }
              >
                {singleProduct?.images?.map((photo, idx) => (
                  <Box key={idx}>
                    <SliderImagem
                      imagem={photo}
                      minHeight={'35rem'}
                      minWidth={'100%'}
                    />
                  </Box>
                ))}
              </Carousel>
            </Grid>

            <Grid size={6} alignContent={'center'}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                  height: '80%',
                }}
              >
                <Typography
                  component={'h1'}
                  className="product-title"
                  sx={{ fontSize: '2.5rem', fontWeight: 600 }}
                >
                  {singleProduct?.name}
                </Typography>

                <Typography
                  component={'p'}
                  className="product-title"
                  sx={{ fontSize: '1.8rem', fontWeight: 500 }}
                >
                  {`R$ ${singleProduct?.price}`}
                </Typography>
                <Box
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                  }}
                >
                  <Typography
                    component={'span'}
                    variant="caption"
                    color="text.secondary"
                  >
                    {`Disponível: ${singleProduct?.quantity} `}
                  </Typography>

                  <Stack flexDirection={'row'} justifyContent={'space-between'}>
                    <Paper
                      elevation={2}
                      sx={{
                        width: '7rem',
                        display: 'flex',

                        justifyContent: 'space-between',
                      }}
                    >
                      <IconButton
                        onClick={() =>
                          qtySelected >= 2 && setQtySelected(qtySelected - 1)
                        }
                      >
                        <RemoveIcon />
                      </IconButton>

                      <InputBase
                        sx={{ flex: 1 }}
                        value={qtySelected}
                        onChange={(e) => setQtySelected(e.target.value)}
                        slotProps={{
                          input: {
                            style: { textAlign: 'center' },
                            type: 'number',
                            min: 1,
                            disabled: true,
                          },
                        }}
                      />
                      <IconButton
                        onClick={() =>
                          qtySelected < singleProduct?.quantity &&
                          setQtySelected(qtySelected + 1)
                        }
                      >
                        <AddIcon />
                      </IconButton>
                    </Paper>
                    {userDbInfo?.cart.some((item) => item._id == id) ? (
                      <Button
                        variant="contained"
                        onClick={() =>
                          userDbInfo._id
                            ? updateUserCart({
                                id: userDbInfo._id,
                                token: token,
                                productId: id,
                                action: 'remove',
                              })
                            : navigate(import.meta.env.BASE_URL + '/login')
                        }
                        startIcon={<RemoveShoppingCartOutlinedIcon />}
                        sx={{
                          borderRadius: 10,
                          backgroundColor: 'black',
                          fontWeight: 'bold',
                          transition: '0.3s ease',
                          '&:hover': {
                            backgroundColor: 'white',
                            color: 'black',
                          },
                        }}
                      >
                        REMOVER DO CARRINHO
                      </Button>
                    ) : (
                      <Button
                        disabled={isFetchingCart}
                        variant="contained"
                        onClick={() => {
                          userDbInfo?._id &&
                            updateUserCart({
                              id: userDbInfo._id,
                              token: token,
                              productId: id,
                              qty: qtySelected,
                              action: 'add',
                            });
                        }}
                        startIcon={<LocalGroceryStoreOutlinedIcon />}
                        sx={{
                          borderRadius: 10,
                          backgroundColor: 'black',
                          fontWeight: 'bold',
                          transition: '0.3s ease',
                          '&:hover': {
                            backgroundColor: 'white',
                            color: 'black',
                          },
                        }}
                      >
                        {/* AINDA NÃO ESTÁ TOTALMENTE PRONTA. AS VEZES NÃO SINCRONIZA/ATUALIZA O NUMERO DE PRODUTOS NO CARRINHO. O POPULATE PARECE ESTÁ RELACIONADO, POIS AS VEZES VEM COM OS DADOS CERTOS, AS VEZES VEM NULL */}
                        ADICIONAR AO CARRINHO
                      </Button>
                    )}
                  </Stack>

                  <Typography
                    sx={{
                      /*  border: '1px solid blue', */
                      height: '100%',
                      mt: 3,
                      overflow: 'auto',
                    }}
                  >
                    {singleProduct?.description}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      )}
    </>
  );
};

export default Product;
