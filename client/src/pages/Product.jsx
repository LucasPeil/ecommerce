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
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import LocalGroceryStoreOutlinedIcon from '@mui/icons-material/LocalGroceryStoreOutlined';
import RemoveShoppingCartOutlinedIcon from '@mui/icons-material/RemoveShoppingCartOutlined';
import Grid from '@mui/material/Grid2';
import { responsive } from '../utils/carouselResponsiveness';
import Carousel from 'react-multi-carousel';
import CustomDot from '../components/ProdutoModal/CustomDot';
import SliderImagem from '../components/SliderImagem';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../slices/products';
const Product = () => {
  const { id } = useParams();
  const [qtySelected, setQtySelected] = useState(1);
  const { singleProduct, getProduct: getProductState } = useSelector(
    (state) => state.products
  );
  const dispatch = useDispatch();
  let carouselRef = useRef();
  const [photosToDisplay, setPhotosToDisplay] = useState([]);
  const [showCarousel, setShowCarousel] = useState(true);
  useEffect(() => {
    dispatch(getProduct(id));
  }, [id]);

  return (
    <Container
      maxWidth="xl"
      sx={{
        flexGrow: 1,
        transform: 'translateY(100px)',

        px: 12,
        height: 'calc(100vh - 100px)',
      }}
    >
      <Grid container spacing={6} sx={{ height: '100%' }} direction>
        <Grid size={6} alignContent={'center'} sx={{}}>
          {!getProductState.isLoading && (
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
                <SliderImagem
                  imagem={photo}
                  minHeight={'35rem'}
                  minWidth={'100%'}
                />
              ))}
            </Carousel>
          )}
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
                  <IconButton>
                    <RemoveIcon
                      onClick={() =>
                        qtySelected >= 2 && setQtySelected(qtySelected - 1)
                      }
                    />
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
                  <IconButton>
                    <AddIcon
                      onClick={() =>
                        qtySelected < singleProduct?.quantity &&
                        setQtySelected(qtySelected + 1)
                      }
                    />
                  </IconButton>
                </Paper>
                {!false ? (
                  <Button
                    variant="contained"
                    onClick={() => dispatch(addProductsToCart(id))}
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
                    ADICIONAR AO CARRINHO
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    onClick={() => dispatch(removeProductsFromCart(id))}
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
                )}
              </Stack>

              <Typography
                sx={{
                  border: '1px solid blue',
                  height: '100%',
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
  );
};

export default Product;
