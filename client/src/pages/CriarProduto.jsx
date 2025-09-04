import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import {
  Box,
  Button,
  Container,
  IconButton,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { Form, FormikProvider, useFormik } from 'formik';
import { useRef, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import CustomDot from '../components/CustomDot';
import FormStepCompleted from '../components/FormStepCompleted';
import InsertProductInfos from '../components/InsertProductInfos';
import NoPhoto from '../components/NoPhoto';
import ReviewProductInfos from '../components/ReviewProductInfos';
import SliderImagem from '../components/SliderImagem';
import { useCreateProductMutation } from '../slices/apiSlice';
import { responsive } from '../utils/carouselResponsiveness';
/* import { useDispatch } from 'react-redux'; */
import { useNavigate } from 'react-router-dom';
import LoadingBackdrop from '../components/LoadingBackdrop';

const UPLOAD_IMAGES_API_URL =
  process.env.NODE_ENV === 'production'
    ? import.meta.env.BASE_URL + '/api/uploadFile'
    : '/api/uploadFile';

const uploadImages = async (imgs) => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Accept: 'multipart/form-data',
      /*   Authorization: `Bearer: ${token}`, */
    },
  };

  const formData = new FormData();
  for (let i = 0; i < imgs.length; i++) {
    formData.append(`file_${i}`, imgs[i]);
  }

  const response = await axios.post(UPLOAD_IMAGES_API_URL, formData, config);
  return response.data;
};
const CriarProduto = ({ open, handleClose, data }) => {
  const [files, setFiles] = useState([]);
  const [photosToDisplay, setPhotosToDisplay] = useState([]);
  const [showCarousel, setShowCarousel] = useState(true);
  const [showProductInfo, setShowProductInfo] = useState(false);
  const [showReviewArea, setShowReviewArea] = useState(false);
  const [productcategory, setProductcategory] = useState('');
  const [saveImagesIsLoading, setSaveImagesIsLoading] = useState(false);
  const { uploadImageIsLoading } = useSelector((state) => state.uploadImage);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleFile = (e) => {
    for (let photo of e.target.files) {
      setFiles([...files, photo]);
      const reader = new FileReader();
      reader.readAsDataURL(photo);
      reader.onload = () => {
        setPhotosToDisplay([...photosToDisplay, reader.result]);
        // formik.setFieldValue('images', reader.result);
      };
      reader.onerror = (error) => {
        console.log(error);
      };
      /*   setPhotosToDisplay([...photosToDisplay, photo]); */
    }
  };

  let carouselRef = useRef();
  const [createProduct, { isSuccess, isFetching }] = useCreateProductMutation();
  const ValidationSchema = Yup.object().shape({
    name: Yup.string().required('Nome é obrigatório'),
    description: Yup.string().required('Descrição é obrigatório'),
    price: Yup.number().required('Preço é obrigatório'),
    quantity: Yup.number().required('Quantidade é obrigatório').min(1),
    available: Yup.boolean().required('Disponibilidade é obrigatório'),
    category: Yup.string().required('Categoria do produto é obrigatório'),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      _id: data?.id || '',
      name: data?.name || '',
      description: data?.description || '',
      images: data?.images || [],
      price: data?.price || 0.0,
      quantity: data?.quantity || 1,
      available: data?.available || true,
      category: data?.category || '',
    },
    validationSchema: ValidationSchema,
    onSubmit: async (values) => {
      setSaveImagesIsLoading(true);
      const urls = await uploadImages(files);
      setSaveImagesIsLoading(false);
      const product = { ...values, ...{ images: urls } };
      createProduct({ product, token: token });
      formik.resetForm();
      navigate('/');
    },
  });

  return (
    <>
      <LoadingBackdrop open={saveImagesIsLoading} />
      <Container
        maxWidth="xl"
        sx={{
          transform: 'translateY(80px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',

          height: 'calc(100vh - 80px)',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            backgroundColor: 'white',
            borderRadius: '1.5rem',
            height: showProductInfo || showReviewArea ? '80vh' : '70vh',
            margin: 'auto auto',
            minWidth: '100%',

            transition: '0.5s ease',
            px: 4,
          }}
        >
          <Box
            sx={{
              height: '100%',
              px: 3,
              transition: '0.5s ease',
              overflow: showProductInfo || showReviewArea ? 'auto' : 'hidden',
            }}
          >
            <Box
              sx={{
                height: '4rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                boxSizing: 'border-box',
              }}
            >
              {/*  {photosToDisplay?.length > 0 && showCarousel ? (
              <NextStep
                actionFuncToShow={setShowProductInfo}
                actionFuncToHide={setShowCarousel}
              />
            ) : ( */}
              {!showProductInfo && !showReviewArea && (
                <Typography variant="P" color="text.secondary">
                  ADICIONE AS FOTOS DO SEU PRODUTO
                </Typography>
              )}
              {photosToDisplay?.length > 0 &&
                showProductInfo &&
                !showReviewArea && (
                  <Typography variant="p" color="text.secondary">
                    Descreva o produto
                  </Typography>
                )}

              {showReviewArea && (
                <Typography variant="p" color="text.secondary">
                  Revise os dados do produto
                </Typography>
              )}
            </Box>

            <FormikProvider value={formik}>
              <Form
                style={{}}
                autoComplete="off"
                noValidate
                onSubmit={formik.handleSubmit}
              >
                <Box
                  sx={{
                    height: showCarousel ? '60vh' : '0vh',
                    opacity: showCarousel ? 1 : 0,
                    transition: '0.5s ease',
                    overflow: 'hidden',
                  }}
                >
                  {photosToDisplay?.length > 0 ? (
                    <>
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
                            photosToDisplay={photosToDisplay}
                            showCarousel={showCarousel}
                            setPhotosToDisplay={setPhotosToDisplay}
                            carouselRef={carouselRef}
                          />
                        }
                      >
                        {photosToDisplay.map((photo, idx) => (
                          <SliderImagem
                            key={idx}
                            imagem={photo}
                            minHeight={'25rem'}
                            minWidth={'100%'}
                          />
                        ))}
                      </Carousel>
                      <Stack direction="row" spacing={2}>
                        <Button
                          onClick={() => {
                            setShowProductInfo(false);
                            setShowCarousel(true);
                          }}
                          fullWidth
                          sx={{
                            backgroundColor: '#686868',
                            color: 'white',
                            fontWeight: 'bold',
                          }}
                        >
                          Voltar
                        </Button>
                        <Button
                          onClick={() => {
                            setShowProductInfo(true);
                            setShowCarousel(false);
                            formik.setFieldValue('images', photosToDisplay);
                          }}
                          fullWidth
                          sx={{
                            backgroundColor: 'black',
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: '1rem',
                          }}
                        >
                          Próximo passo
                        </Button>
                      </Stack>
                    </>
                  ) : (
                    <IconButton
                      component="label"
                      sx={{
                        color: 'black',

                        borderRadius: 0,
                        width: '100%',
                        height: '90%',
                        p: 0,
                      }}
                    >
                      <NoPhoto />
                      <input
                        type="file"
                        onChange={handleFile}
                        multiple
                        hidden
                      />
                    </IconButton>
                  )}
                </Box>
                <FormStepCompleted
                  showVariable={showProductInfo || showReviewArea}
                  Icon={CameraAltOutlinedIcon}
                />

                <>
                  <InsertProductInfos
                    showProductInfo={showProductInfo}
                    formik={formik}
                    setProductcategory={setProductcategory}
                    setShowProductInfo={setShowProductInfo}
                    setShowCarousel={setShowCarousel}
                    setShowReviewArea={setShowReviewArea}
                    photosToDisplay={photosToDisplay}
                    productcategory={productcategory}
                  />
                </>

                {/* ARRUMAR AQUIIII */}
                <FormStepCompleted
                  showVariable={showReviewArea} // se for true ele esconde
                  Icon={DescriptionOutlinedIcon}
                />

                <ReviewProductInfos
                  data={formik.values}
                  onSubmit={() => formik.handleSubmit()}
                  showReviewArea={showReviewArea}
                  returnToDescription={() => {
                    setShowProductInfo(true);
                    setShowReviewArea(false);
                  }}
                />
              </Form>
            </FormikProvider>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default CriarProduto;
