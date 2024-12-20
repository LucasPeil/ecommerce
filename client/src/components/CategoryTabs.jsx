import { useState } from 'react';
import { Tabs, Tab, Box, useTheme, CircularProgress } from '@mui/material';
import DestaqueSlider from './DestaqueSlider';
import { useGetAllProductsQuery } from '../slices/apiSlice';

const CategoryTabs = () => {
  const [value, setValue] = useState('Sala');
  const theme = useTheme();
  const {
    data: products = [],
    isLoading,
    isSuccess,
    isError,
    isFetching,
    error,
    refetch,
  } = useGetAllProductsQuery({ first: 3, after: null, searchText: value });
  const handleChange = (event, newValue) => {
    setValue(newValue);
    refetch();
  };
  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={value}
        centered
        onChange={handleChange}
        sx={{
          my: 2,
          '& .MuiTabs-indicator': {
            backgroundColor: '#000000',
            fontFamily: 'Dela Gothic One',
          },
          '& .MuiTab-root': {
            color: '#000000',
            fontFamily: 'Dela Gothic One',
          },
          '& .MuiTab-root.Mui-selected': {
            color: '#000000',
            fontFamily: 'Dela Gothic One',
          },
        }}
      >
        <Tab value="Sala" label="Sala" disableRipple />
        <Tab value="Quarto" label="Quarto" disableRipple />
        <Tab value="Cozinha" label="Cozinha" disableRipple />
        <Tab value="Banheiro" label="Banheiro" disableRipple />
      </Tabs>

      {!isFetching ? (
        <DestaqueSlider products={products} />
      ) : (
        <Box
          sx={{
            minHeight: '410px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
};

export default CategoryTabs;
