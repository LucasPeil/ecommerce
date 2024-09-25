import React, { useEffect, useRef, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import SouthIcon from '@mui/icons-material/South';
import {
  IconButton,
  DialogTitle,
  Dialog,
  Box,
  Zoom,
  Button,
  Typography,
  Tooltip,
  Stack,
  TextField,
} from '@mui/material';
import Carousel from 'react-multi-carousel';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import 'react-multi-carousel/lib/styles.css';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import { responsive } from '../../utils/carouselResponsiveness';
import SliderImagem from '../SliderImagem';
import * as Yup from 'yup';
import ArrowRightAltOutlinedIcon from '@mui/icons-material/ArrowRightAltOutlined';
import { Field, Form, FormikProvider, getIn, useFormik } from 'formik';
import NoPhoto from './NoPhoto';
import CustomDot from './CustomDot';
import DoneAllOutlinedIcon from '@mui/icons-material/DoneAllOutlined';
import FormStepCompleted from './FormStepCompleted';
import NextStep from './NextStep';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Zoom ref={ref} {...props} />;
});
const CriarProduto = ({ open, handleClose, data }) => {
  const [files, setFiles] = useState([]);
  const [photosToDisplay, setPhotosToDisplay] = useState([]);
  const [showCarousel, setShowCarousel] = useState(true);
  const [showProductInfo, setShowProductInfo] = useState(false);
  const [showReviewArea, setShowReviewArea] = useState(false);
  const handleFile = (e) => {
    for (let photo of e.target.files) {
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
    /*  const photo = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(photo);
    reader.onload = () => {
      setPhotosToDisplay(reader.result);
      formik.setFieldValue('images', reader.result);
    };
    reader.onerror = (error) => {
      console.log(error);
    };
    if (formik.values.images?.length > 0) {
      setPhotosToDisplay(formik.values.foto);
    } else {
      setPhotosToDisplay(photo);
    } */
  };
  let carouselRef = useRef();

  const ValidationSchema = Yup.object().shape({
    name: Yup.string().required('Nome é obrigatório'),
    description: Yup.string()
      .email('Deve conter um endereço de e-mail válido')
      .required('E-mail é obrigatório'),
  });
  useEffect(() => {
    console.log(showReviewArea);
  }, [showReviewArea]);

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
      condition: data?.condition || '',
    },
    validationSchema: ValidationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      onClose={() => {
        handleClose();
        setPhotosToDisplay('');
      }}
      fullWidth
      keepMounted
      maxWidth={'xl'}
      PaperProps={{ sx: { borderRadius: '1rem' } }}
    >
      <Box
        sx={{
          height: showProductInfo ? '70vh' : '60vh',
          px: 3,
          transition: '0.5s ease',
        }}
      >
        <DialogTitle
          sx={{
            height: '4rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxSizing: 'border-box',
          }}
        >
          {photosToDisplay?.length > 0 && showCarousel ? (
            <NextStep
              actionFuncToShow={setShowProductInfo}
              actionFuncToHide={setShowCarousel}
            />
          ) : (
            !showProductInfo &&
            !showReviewArea && (
              <Typography variant="p" color="text.secondary">
                Adicionar foto(s)
              </Typography>
            )
          )}
          {photosToDisplay?.length > 0 &&
            showProductInfo &&
            !showReviewArea && (
              <Typography variant="p" color="text.secondary">
                Descreva o produto
              </Typography>
            )}

          <Tooltip arrow title={'Adicionar foto'}>
            <IconButton disableRipple component="label" sx={{ color: 'black' }}>
              <AddPhotoAlternateOutlinedIcon />
              <input type="file" onChange={handleFile} multiple hidden />
            </IconButton>
          </Tooltip>
        </DialogTitle>
        {/* URL.createObjectURL(previewImage) */}
        {photosToDisplay?.length > 0 ? (
          <>
            <FormikProvider value={formik}>
              <Form
                autoComplete="off"
                noValidate
                onSubmit={formik.handleSubmit}
              >
                <Box
                  sx={{
                    height: showCarousel ? '35vh' : '0vh',
                    transition: '0.5s ease',
                    overflow: 'hidden',
                  }}
                >
                  <Carousel
                    style={{ border: '1px solid red', display: 'none' }}
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
                      />
                    }
                  >
                    {photosToDisplay.map((photo, idx) => (
                      <SliderImagem
                        imagem={photo}
                        minHeight={'20rem'}
                        minWidth={'100%'}
                        closeFunction={() => {
                          const arrCopy = [...photosToDisplay];
                          arrCopy.splice(idx, 1);
                          setPhotosToDisplay(arrCopy);
                          if (photosToDisplay.length >= 1) {
                            carouselRef.current.previous();
                          }
                        }}
                      />
                    ))}
                  </Carousel>
                </Box>
                <FormStepCompleted
                  showVariable={showCarousel}
                  Icon={CameraAltOutlinedIcon}
                />

                {showProductInfo && (
                  <>
                    <Box
                      sx={{
                        height: showProductInfo ? '54vh' : '0vh',
                        transition: '0.5s ease',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-around',
                      }}
                    >
                      <Stack direction="row" spacing={2}>
                        <Field
                          {...formik.getFieldProps('description')}
                          label="Fale mais sobre o produto"
                          variant="outlined"
                          multiline
                          minRows={15}
                          maxRows={50}
                          as={TextField}
                          error={Boolean(
                            formik.touched.description &&
                              formik.errors.description
                          )}
                          helperText={
                            formik.errors.description &&
                            formik.errors.description
                          }
                          fullWidth
                          sx={{ width: { xs: '100%' } }}
                        />
                      </Stack>

                      <Stack direction="row" spacing={2}>
                        <Field
                          {...formik.getFieldProps('quantity')}
                          label="Quantidade disponível"
                          type="number"
                          variant="outlined"
                          as={TextField}
                          error={Boolean(
                            formik.touched.quantity && formik.errors.quantity
                          )}
                          helperText={
                            formik.errors.quantity && formik.errors.quantity
                          }
                          fullWidth
                          sx={{ width: { xs: '33%' } }}
                        />
                        <Field
                          {...formik.getFieldProps('price')}
                          label="Preço"
                          variant="outlined"
                          type="number"
                          min="0"
                          max="1000"
                          step="0.50"
                          as={TextField}
                          error={Boolean(
                            formik.touched.price && formik.errors.price
                          )}
                          helperText={
                            formik.errors.price && formik.errors.price
                          }
                          fullWidth
                          sx={{ width: { xs: '33%' } }}
                        />
                        <Field
                          {...formik.getFieldProps('condition')}
                          label="Condição"
                          variant="outlined"
                          type="text"
                          as={TextField}
                          error={Boolean(
                            formik.touched.condition && formik.errors.condition
                          )}
                          helperText={
                            formik.errors.condition && formik.errors.condition
                          }
                          fullWidth
                          sx={{ width: { xs: '33%' } }}
                        />
                      </Stack>
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
                            setShowProductInfo(false);
                            setShowReviewArea(true);
                          }}
                          fullWidth
                          sx={{
                            backgroundColor: 'black',
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: '1rem',
                          }}
                        >
                          Revisar dados
                        </Button>
                      </Stack>
                    </Box>
                  </>
                )}
                {/* ARRUMAR AQUIIII */}
                <FormStepCompleted
                  showVariable={!showReviewArea && !showProductInfo} // se for true ele esconde
                  Icon={DescriptionOutlinedIcon}
                />
              </Form>
            </FormikProvider>
          </>
        ) : (
          <NoPhoto />
        )}
      </Box>
    </Dialog>
  );
};

export default CriarProduto;
