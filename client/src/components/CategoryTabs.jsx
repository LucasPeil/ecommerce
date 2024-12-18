import { useState } from 'react';
import { Tabs, Tab, Box, useTheme } from '@mui/material';

const CategoryTabs = () => {
  const [value, setValue] = useState('Sala');
  const theme = useTheme();
  const handleChange = (event, newValue) => {
    setValue(newValue);
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
    </Box>
  );
};

export default CategoryTabs;
