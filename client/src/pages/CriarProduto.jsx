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
import { useRef, useState, useEffect } from 'react';
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
import { useNavigate } from 'react-router-dom';
import LoadingBackdrop from '../components/LoadingBackdrop';

const UPLOAD_IMAGES_API_URL =
  process.env.NODE_ENV === 'production'
    ? import.meta.env.BASE_URL + '/api/uploadFile'
    : '/api/uploadFile';

const CriarProduto = ({ open, handleClose, data }) => {
  const [files, setFiles] = useState([]);
  const [photosToDisplay, setPhotosToDisplay] = useState([]);
  const [activeStep, setActiveStep] = useState(0); // 0: Upload, 1: Details, 2: Review
  const [productcategory, setProductcategory] = useState('');
  
  const { uploadImageIsLoading } = useSelector((state) => state.uploadImage);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  // const dispatch = useDispatch();

  const handleFile = async (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (!selectedFiles.length) return;

    // Append new files to existing ones
    setFiles((prev) => [...prev, ...selectedFiles]);

    const fileReaders = selectedFiles.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    });

    try {
      const newPhotos = await Promise.all(fileReaders);
      setPhotosToDisplay((prev) => [...prev, ...newPhotos]);
    } catch (error) {
      console.error("Error reading files:", error);
    }
  };

  let carouselRef = useRef();
  const [createProduct, { isSuccess, isLoading }] = useCreateProductMutation();
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
      const product = { ...values,};
      createProduct({ product, token: token });
      
     
    },
  });
  useEffect(() => {
    if (isSuccess  ) {
       navigate('/');
      formik.resetForm(); 
    }
  }, [isSuccess]);
  return (
    <>
      <LoadingBackdrop open={isLoading} />
      <Container
        maxWidth="xl"
        sx={{
          minHeight: '100vh',
          py: 10, // Padding top/bottom instead of fixed translate
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            backgroundColor: 'white',
            borderRadius: '1.5rem',
            width: '100%',
            maxWidth: '1200px', // Restrict max width on large screens
            p: { xs: 2, md: 4 }, // Responsive padding
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            minHeight: '70vh', 
          }}
        >
            <Box
              sx={{
                minHeight: '4rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                mb: 2
              }}
            >
              {activeStep === 0 && (
                <Typography variant="h6" color="text.secondary">
                  ADICIONE AS FOTOS DO SEU PRODUTO
                </Typography>
              )}
              {photosToDisplay.length > 0 && activeStep === 1 && (
                  <Typography variant="h6" color="text.secondary">
                    Descreva o produto
                  </Typography>
                )}

              {activeStep === 2 && (
                <Typography variant="h6" color="text.secondary">
                  Revise os dados do produto
                </Typography>
              )}
            </Box>

            <FormikProvider value={formik}>
              <Form
                style={{ width: '100%' }}
                autoComplete="off"
                noValidate
                onSubmit={formik.handleSubmit}
              >
                {/* Step 0: Image Upload & Carousel */}
                <Box
                  sx={{
                    height: activeStep === 0 ? { xs: '50vh', md: '60vh' } : '0vh', 
                    opacity: activeStep === 0 ? 1 : 0,
                    overflow: 'hidden',
                    transition: '0.5s ease',
                  }}
                >
                  {photosToDisplay.length > 0 ? (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <Carousel
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
                            showCarousel={true}
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
                      <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                         {/* Clear Button ? Or minimal back ? */}
                        <Button
                            onClick={() => {
                                setPhotosToDisplay([]);
                                setFiles([]);
                            }}
                            fullWidth
                            sx={{
                                backgroundColor: '#000000ff',
                                color: 'white',
                                fontWeight: 'bold',
                                '&:hover': { backgroundColor: '#000000ff'}
                            }}
                        >
                            Limpar Fotos
                        </Button>
                        <Button
                          onClick={() => {
                            setActiveStep(1);
                            formik.setFieldValue('images', photosToDisplay);
                          }}
                          fullWidth
                          sx={{
                            backgroundColor: 'black',
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: '1rem',
                            '&:hover': { backgroundColor: '#333'}
                          }}
                        >
                          Próximo passo
                        </Button>
                      </Stack>
                    </Box>
                  ) : (
                    <IconButton
                      component="label"
                      sx={{
                        color: 'black',
                        borderRadius: 2,
                        width: '100%',
                        height: '50vh', // Significant height for dropzone feel
                        border: '4px dashed #979797ff',
                        backgroundColor: '#d1d1d1ff',
                        '&:hover': { backgroundColor: '#b1b1b1ff', border: '4px dashed #000' }
                      }}
                    >
                      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', height: '100%' }}>
                         <NoPhoto />
                         <Typography variant="body1" sx={{ mt: 2 }}>Clique para adicionar fotos</Typography>
                      </Box>
                      <input
                        type="file"
                        onChange={handleFile}
                        multiple
                        hidden
                        accept="image/*"
                      />
                    </IconButton>
                  )}
                </Box>

                <FormStepCompleted
                  showVariable={activeStep > 0} 
                  Icon={CameraAltOutlinedIcon}
                />

                <InsertProductInfos
                    visible={activeStep === 1}
                    formik={formik}
                    setProductcategory={setProductcategory}
                    productcategory={productcategory}
                    onBack={() => setActiveStep(0)}
                    onNext={() => {
                        formik.setFieldValue('images', photosToDisplay); // Ensure images are set
                        setActiveStep(2);
                    }}
                  />

                <FormStepCompleted
                  showVariable={activeStep > 1} 
                  Icon={DescriptionOutlinedIcon}
                />

                <ReviewProductInfos
                  data={formik.values}
                  onSubmit={() => formik.handleSubmit()}
                  visible={activeStep === 2}
                  onBack={() => setActiveStep(1)}
                />
              </Form>
            </FormikProvider>
        </Paper>
      </Container>
      </>
  );
};

export default CriarProduto;
