import { Button, Box } from '@mui/material';
import React from 'react';
import SliderImagem from './SliderImagem';

const CustomDot = ({ onClick, ...rest }) => {
  const {
    onMove,
    index,
    active,
    photosToDisplay,
    setPhotosToDisplay,
    showCarousel,
    carouselRef,
    showCloseButton = true,

    carouselState: { currentSlide, deviceType },
  } = rest;
  const closeFunction = (index) => {
    const arrCopy = [...photosToDisplay];
    arrCopy.splice(index, 1);
    setPhotosToDisplay(arrCopy);
    if (photosToDisplay?.length >= 1) {
      carouselRef.current.previous();
    }
  };

  const carouselItems = photosToDisplay.map((photo) => (
    <SliderImagem
      imagem={photo}
      minHeight={'5rem'}
      minWidth={'5rem'}
      closeFunction={() => closeFunction(index)}
      showCloseButton={showCloseButton}
    />
  ));

  // onMove means if dragging or swiping in progress.
  // active is provided by this lib for checking if the item is active or not.
  return (
    <Button
      sx={{
        border: 'none',
        display: showCarousel ? 'block' : 'none',
      }}
      onClick={() => onClick()}
    >
      <Box sx={{}}>{React.Children.toArray(carouselItems)[index]}</Box>
    </Button>
  );
};

export default CustomDot;
