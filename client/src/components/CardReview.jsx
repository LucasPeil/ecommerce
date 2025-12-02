import {
  Avatar,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from '@mui/material';
import React from 'react';

const CardReview = ({ review }) => {
  return (
    <Card
      sx={{
        display: 'flex',
        alignItems: 'start',

        width: '48%',
        minHeight: 250,
      }}
    >
      <CardContent sx={{}}>
        <Stack
          direction={'row'}
          sx={{ justifyContent: 'start', alignItems: 'center', gap: 2 }}
        >
          <Avatar
            src={review.image}
            alt={review.name}
            sx={{ width: 56, height: 56 }}
          />
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            {review.name}
          </Typography>
        </Stack>
        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 2 }}>
          {review.review}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CardReview;
