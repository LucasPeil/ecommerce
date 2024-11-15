import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Tooltip,
  Typography,
  Zoom,
} from '@mui/material';
import { Field, Form, FormikProvider, useFormik } from 'formik';
import React, { useRef, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import * as Yup from 'yup';
import { responsive } from '../../utils/carouselResponsiveness';
import SliderImagem from '../SliderImagem';
import CustomDot from './CustomDot';
import FormStepCompleted from './FormStepCompleted';
import NextStep from './NextStep';
import NoPhoto from './NoPhoto';
import ReviewProductInfos from './ReviewProductInfos';
import { useDispatch } from 'react-redux';
import { createProduct } from '../../slices/product';
/* import { useDispatch } from 'react-redux'; */
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Zoom ref={ref} {...props} />;
});
const CriarProduto = ({ open, handleClose, data }) => {
  const [files, setFiles] = useState([]);
  const [photosToDisplay, setPhotosToDisplay] = useState([]);
  const [showCarousel, setShowCarousel] = useState(true);
  const [showProductInfo, setShowProductInfo] = useState(false);
  const [showReviewArea, setShowReviewArea] = useState(false);
  const [productCondition, setProductCondition] = useState('');
  const dispatch = useDispatch();
  /*   const dispatch = useDispatch(); */
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

  const ValidationSchema = Yup.object().shape({
    name: Yup.string().required('Nome é obrigatório'),
    description: Yup.string().required('Descrição é obrigatório'),
    price: Yup.number().required('Preço é obrigatório'),
    quantity: Yup.number().required('Quantidade é obrigatório').min(1),
    available: Yup.boolean().required('Disponibilidade é obrigatório'),
    condition: Yup.string().required('Condição do produto é obrigatório'),
  });
  const closeDialog = () => {
    handleClose();
    setPhotosToDisplay([]);
    setShowProductInfo(false);
    setShowReviewArea(false);
    setShowCarousel(true);
    setProductCondition('');
  };
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: data?.id || '',
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
      /*   console.log(values); */
      values.images = files;
      console.log(values);
      dispatch(createProduct(values));
      /*  closeDialog();
      formik.resetForm(); */
    },
  });

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      onClose={() => {
        closeDialog();
        formik.resetForm();
      }}
      fullWidth
      keepMounted
      maxWidth={'xl'}
      PaperProps={{ sx: { borderRadius: '1rem' } }}
    >
      <Box
        sx={{
          height: showProductInfo || showReviewArea ? '80vh' : '60vh',
          px: 3,
          transition: '0.5s ease',
          overflow: 'auto',
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

          {showReviewArea && (
            <Typography variant="p" color="text.secondary">
              Revise os dados do produto
            </Typography>
          )}
          {showCarousel && (
            <Tooltip arrow title={'Adicionar foto'}>
              <IconButton
                disableRipple
                component="label"
                sx={{ color: 'black' }}
              >
                <AddPhotoAlternateOutlinedIcon />
                <input type="file" onChange={handleFile} multiple hidden />
              </IconButton>
            </Tooltip>
          )}
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
                    opacity: showCarousel ? 1 : 0,
                    transition: '0.5s ease',
                    overflow: 'hidden',
                  }}
                >
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
                  showVariable={showProductInfo || showReviewArea}
                  Icon={CameraAltOutlinedIcon}
                />

                <>
                  <Box
                    sx={{
                      height: showProductInfo ? '68vh' : '0vh',
                      opacity: showProductInfo ? 1 : 0,
                      transition: '0.5s ease',
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-around',
                      gap: '0.3rem',
                    }}
                  >
                    <Stack direction="row" spacing={2}>
                      <Field
                        {...formik.getFieldProps('name')}
                        label="Nome do produto"
                        variant="outlined"
                        as={TextField}
                        error={Boolean(
                          formik.touched.name && formik.errors.name
                        )}
                        helperText={formik.errors.name && formik.errors.name}
                        fullWidth
                        sx={{ width: { xs: '100%' } }}
                      />
                    </Stack>
                    <Stack direction="row" spacing={2}>
                      <Field
                        {...formik.getFieldProps('description')}
                        label="Fale mais sobre o produto"
                        variant="outlined"
                        multiline
                        minRows={15}
                        maxRows={16}
                        as={TextField}
                        error={Boolean(
                          formik.touched.description &&
                            formik.errors.description
                        )}
                        helperText={
                          formik.errors.description && formik.errors.description
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
                        helperText={formik.errors.price && formik.errors.price}
                        fullWidth
                        sx={{ width: { xs: '33%' } }}
                      />
                      <FormControl sx={{ width: { xs: '33%' } }}>
                        <InputLabel id="condition">
                          Condição do produto
                        </InputLabel>
                        <Select
                          labelId="condition"
                          id="condition"
                          value={
                            formik.values.condition
                              ? formik.values.condition
                              : productCondition
                          }
                          label="Condição do produto"
                          onChange={(e) => {
                            setProductCondition(e.target.value);
                            formik.setFieldValue('condition', e.target.value);
                          }}
                        >
                          <MenuItem value={'Novo'}>Novo</MenuItem>
                          <MenuItem value={'Usado'}>Usado</MenuItem>
                        </Select>
                        <FormHelperText sx={{ color: 'red' }}>
                          {Boolean(
                            formik.touched.condition && formik.errors.condition
                          ) && formik.errors.condition}
                        </FormHelperText>
                      </FormControl>
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
                        Revisar dados
                      </Button>
                    </Stack>
                  </Box>
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
          </>
        ) : (
          <NoPhoto />
        )}
      </Box>
    </Dialog>
  );
};

export default CriarProduto;
