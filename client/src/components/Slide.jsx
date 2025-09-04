import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Slide = ({ bgImage, bgPosition }) => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: 'flex',
        maxWidth: '100vw',
        zIndex: 1000,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      <Box
        sx={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: bgPosition,
          backgroundOrigin: 'border-box',
          minHeight: '90vh',
          minWidth: '100vw',
          filter: 'brightness(33%)',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
        }}
      >
        <h4
          className="title"
          style={{
            zIndex: 1200000,
            color: 'white',
            fontSize: '2.6rem',
          }}
        >
          REVOLUCIONANDO SUA CASA
        </h4>
        <p
          style={{
            color: 'white',
            textAlign: 'center',
            fontStyle: 'italic',
            fontWeight: 'bold',
            fontSize: '1.3rem',
          }}
        >
          Desde 1995
        </p>
      </Box>

      <Button
        variant="contained"
        onClick={async () => navigate('/catalogo')}
        sx={{
          color: 'black',
          border: '1px solid black',
          position: 'absolute',
          bottom: '5rem',
          backgroundColor: 'white',
          fontWeight: 'bold',
          fontSize: '1.2rem',
          px: 5,
          py: 1,
          letterSpacing: 6,
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            backgroundColor: 'black',
            color: 'white',
            transform: 'scale(110%)',
          },
        }}
      >
        <span className="slideButton">Confira</span>
      </Button>
    </Box>
  );
};

export default Slide;
