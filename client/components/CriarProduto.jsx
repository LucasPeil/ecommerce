import React, { useEffect, useRef, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import {
  IconButton,
  DialogTitle,
  Dialog,
  Box,
  Zoom,
  Button,
  Typography,
  Tooltip,
} from '@mui/material';
import Carousel from 'react-multi-carousel';
import capa1 from '../assets/capa-1.jpg';
import capa2 from '../assets/capa-2.jpg';
import capa3 from '../assets/capa-3.jpg';
import 'react-multi-carousel/lib/styles.css';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import { responsive } from '../utils/carouselResponsiveness';
import SliderImagem from './SliderImagem';
import * as Yup from 'yup';
import ArrowRightAltOutlinedIcon from '@mui/icons-material/ArrowRightAltOutlined';
import { Field, Form, FormikProvider, getIn, useFormik } from 'formik';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Zoom ref={ref} {...props} />;
});
const CriarProduto = ({ open, handleClose, data }) => {
  const [files, setFiles] = useState([]);
  const [photosToDisplay, setPhotosToDisplay] = useState([]);
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
  useEffect(() => {
    console.log(photosToDisplay);
  }, [photosToDisplay]);
  const CustomDot = ({ onClick, ...rest }) => {
    const {
      onMove,
      index,
      active,
      carouselState: { currentSlide, deviceType },
    } = rest;

    const carouselItems = photosToDisplay.map((photo) => (
      <SliderImagem
        imagem={photo}
        minHeight={'5rem'}
        minWidth={'5rem'}
        closeFunction={() => {}}
      />
    ));

    // onMove means if dragging or swiping in progress.
    // active is provided by this lib for checking if the item is active or not.
    return (
      <Button
        sx={{ border: active ? '1px solid black' : 'none' }}
        onClick={() => onClick()}
      >
        <Box>{React.Children.toArray(carouselItems)[index]}</Box>
      </Button>
    );
  };
  const ValidationSchema = Yup.object().shape({
    nome: Yup.string('Nome').required('Nome é obrigatório'),
    email: Yup.string('E-mail')
      .email('Deve conter um endereço de e-mail válido')
      .required('E-mail é obrigatório'),
    habilidades: Yup.string('Habilidades').required(
      'Habilidades é obrigatório'
    ),
    graduacao: Yup.array().of(
      Yup.object().shape({
        curso: Yup.string('Curso de graduação')
          .required('Curso é obrigatório')
          .nullable(),
        instituicao: Yup.string('Instituição de graduação')
          .required('Instituição é obrigatório')
          .nullable(),
        ano: Yup.number('Ano de graduação')
          .required()
          .test(
            'len',
            'Formato AAAA.',
            (val) => val && val.toString().length === 4
          )
          .required()
          .nullable(),
      })
    ),
    posGraduacao: Yup.array().of(
      Yup.object().shape({
        curso: Yup.string('Curso de pós-graduação').nullable(),
        instituicao: Yup.string('Instituição de pós-graduação').nullable(),
        ano: Yup.number('Ano de pós-graduação').nullable(),
        tipo: Yup.string('Tipo de pós-graduação').nullable(),

        valid: Yup.boolean().when(['curso', 'instituicao', 'ano', 'tipo'], {
          is: (curso, instituicao, ano, tipo) => {
            // todos são false
            const all = !curso && !instituicao && !ano && !tipo;

            // todos true
            const atLeastOne = Boolean(curso && instituicao && ano && tipo);

            return !(all || atLeastOne);
          },
          then: Yup.bool().required(
            'Selecione uma opção da lista ou insira uma nova.'
          ),
          otherwise: Yup.bool(),
        }),
      })
    ),
    resumoInterno: Yup.string('Resumo')
      .required('Resumo é obrigatório')
      .nullable()
      .test('len', '', (val) => val && val.length <= 1000),
    resumoExterno: Yup.string('Resumo')
      .required('Resumo é obrigatório')
      .nullable()
      .test('len', '', (val) => val && val.length <= 1000),
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
    },
    /* validationSchema: ValidationSchema, */
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
      maxWidth={'md'}
      PaperProps={{ sx: { borderRadius: '1rem' } }}
    >
      <Box sx={{ height: '55vh' }}>
        <DialogTitle
          sx={{
            height: '4rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxSizing: 'border-box',
          }}
        >
          {photosToDisplay?.length > 0 ? (
            <Button
              sx={{ display: 'flex', alignItems: 'center', gap: 2 }}
              onClick={() => {}}
            >
              <Typography variant="body1" color="text.secondary">
                Próximo passo
              </Typography>
              <ArrowRightAltOutlinedIcon />
            </Button>
          ) : (
            <Typography variant="p" color="text.secondary">
              Adicionar foto(s)
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
            customDot={<CustomDot />}
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
            {/*    <SliderImagem
              imagem={capa2}
              minHeight={'20rem'}
              minWidth={'100%'}
            />
            <SliderImagem
              imagem={capa3}
              minHeight={'20rem'}
              minWidth={'100%'}
            /> */}
          </Carousel>
        ) : (
          <Box
            sx={{
              height: 'calc(55vh - 4rem)',
              display: 'flex',
              justifyContent: 'center',
              mt: 2,
            }}
          >
            <Box
              sx={{
                backgroundColor: '#DCDCDC',
                width: '85%',
                height: '80%',
                border: '4px dashed #5D5D5D',
                borderRadius: '1rem',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 2,
                }}
              >
                <InsertPhotoOutlinedIcon fontSize="large" />
                <Typography variant="body1" color="text.secondary">
                  Nehuma foto adicionada
                </Typography>
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </Dialog>
  );
};

export default CriarProduto;

/*      dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px" */
{
  /* <Carousel
          customTransition="all 0.5s ease-in-out"
          transitionDuration={500}
          removeArrowOnDeviceType={['mobile']}
        
          showDots
          slidesToSlide={1}
          containerClass="carousel-with-custom-dots"
          responsive={responsive}
          partialVisible
          renderDotsOutside={true}
          customDot={<CustomDot />}
        >
          <SliderImagem imagem={capa1} minHeight={'20rem'} minWidth={'100%'} />
          <SliderImagem imagem={capa2} minHeight={'20rem'} minWidth={'100%'} />
          <SliderImagem imagem={capa3} minHeight={'20rem'} minWidth={'100%'} />
        </Carousel> */
}
