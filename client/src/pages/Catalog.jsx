import {
  Grid2,
  Paper,
  Box,
  Pagination,
  Stack,
  Typography,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormControl,
  FormLabel,
  Divider,
} from '@mui/material';
import React, { useEffect, useState, useMemo, useCallback } from 'react';
import {
  useGetAllProductsQuery,
  useGetPricesRangeQuery,
  useGetRoomsQuery,
} from '../slices/apiSlice';
import DestaqueProductCard from '../components/DestaqueProductCard';
import ProductSimpleCard from '../components/ProductSimpleCard';

const groupPerStack = (products, itemsPerStack = 4) => {
  const groupedProducts = [];
  for (let i = 0; i < products?.edges?.length; i += itemsPerStack) {
    groupedProducts.push(products?.edges?.slice(i, i + itemsPerStack));
  }
  return groupedProducts;
};

const Catalog = () => {
  const [checkboxes, setCheckboxes] = useState({
    prices: {},
    rooms: {},
  });

  const [filters, setFilters] = useState({
    prices: [],
    rooms: [],
    disponibility: [],
  });

  const {
    data: products = [],
    isFetching,
    refetch,
  } = useGetAllProductsQuery({
    first: 25,
    after: null,
    filter: filters,
    searchText: null,
  });
  useEffect(() => {
    refetch();
  }, [filters]);

  const { data: rooms } = useGetRoomsQuery({});
  const { data: prices } = useGetPricesRangeQuery({});
  const [page, setPage] = useState('');

  const productsStacked = useMemo(() => groupPerStack(products, 4), [products]);

  // Inicializamos os estados dos checkboxes quando os dados são carregados
  useEffect(() => {
    if (prices?.data) {
      const pricesObj = {};
      prices.data?.forEach((price) => {
        pricesObj[price.price] = false;
      });

      setCheckboxes((prev) => ({
        ...prev,
        prices: pricesObj,
      }));
    }
  }, [prices]);

  useEffect(() => {
    if (rooms?.data) {
      const roomsObj = {};
      rooms.data?.forEach((room) => {
        roomsObj[room] = false;
      });

      setCheckboxes((prev) => ({
        ...prev,
        rooms: roomsObj,
      }));
    }
  }, [rooms]);

  // Função para lidar com a mudança de um checkbox
  const handleCheckboxChange = useCallback((category, value) => {
    // Atualizamos o estado dos checkboxes de forma imutável
    setCheckboxes((prev) => {
      const newState = {
        ...prev,
        [category]: {
          ...prev[category],
          [value]: !prev[category][value],
        },
      };

      // Atualizamos os filtros com base no novo estado dos checkboxes
      updateFilters(category, value, newState[category][value]);

      return newState;
    });
  }, []);

  // Função para atualizar os filtros com base na ação do checkbox
  const updateFilters = useCallback((category, value, isChecked) => {
    setFilters((prev) => {
      // Se o checkbox foi marcado, adicionamos o valor ao filtro
      if (isChecked) {
        return {
          ...prev,
          [category]: [...prev[category], value],
        };
      }
      // Se o checkbox foi desmarcado, removemos o valor do filtro
      else {
        return {
          ...prev,
          [category]: prev[category].filter((item) => item !== value),
        };
      }
    });
  }, []);

  return (
    <Grid2
      container
      spacing={12}
      direction={'row'}
      justifyContent={'center'}
      sx={{
        transform: 'translateY(100px)',
        pb: 5,
        flexGrow: 1,
      }}
    >
      <Grid2 size={3} sx={{ pl: 2 }}>
        <Paper sx={{ minHeight: '100%', p: 3 }}>
          <Typography color="text.secondary">
            Encontre o que você procura com mais facilidade!
          </Typography>

          {/* Filtro de Preços */}
          <FormControl
            sx={{ mt: 2, minWidth: '100%' }}
            component="fieldset"
            variant="standard"
          >
            <FormLabel
              sx={{ color: 'black', fontWeight: 'bold', pb: '0.4rem' }}
            >
              Faixa de preço
            </FormLabel>
            <Divider />
            <FormGroup>
              {prices?.data?.map((priceRange) => (
                <FormControlLabel
                  key={priceRange.price}
                  control={
                    <Checkbox
                      checked={!!checkboxes.prices[priceRange.price]}
                      onChange={() =>
                        handleCheckboxChange('prices', priceRange.price)
                      }
                      name={priceRange.price}
                    />
                  }
                  label={
                    <Stack direction="row" alignItems={'center'} gap={1}>
                      <Typography variant="body1">
                        {priceRange.price}
                      </Typography>
                      <Typography
                        color="text.secondary"
                        component={'span'}
                        variant="caption"
                      >
                        {`(${priceRange.qty})`}
                      </Typography>
                    </Stack>
                  }
                />
              ))}
            </FormGroup>
          </FormControl>

          {/* Filtro de Cômodos */}
          <FormControl
            sx={{ mt: 2, minWidth: '100%' }}
            component="fieldset"
            variant="standard"
          >
            <FormLabel
              sx={{ color: 'black', fontWeight: 'bold', pb: '0.4rem' }}
            >
              Cômodos
            </FormLabel>
            <Divider />
            <FormGroup>
              {rooms?.data?.map((room) => (
                <FormControlLabel
                  key={room}
                  control={
                    <Checkbox
                      checked={!!checkboxes.rooms[room]}
                      onChange={() => handleCheckboxChange('rooms', room)}
                      name={room}
                    />
                  }
                  label={<Typography variant="body1">{room}</Typography>}
                />
              ))}
            </FormGroup>
          </FormControl>
        </Paper>
      </Grid2>

      {/* Exibição de Produtos */}
      <Grid2
        size={9}
        direction={'row'}
        justifyContent={'center'}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 8,
        }}
      >
        {productsStacked?.map((products, idx) => (
          <Box key={idx} sx={{ display: 'flex', gap: 8 }}>
            {products.map((product, idx) => (
              <ProductSimpleCard key={idx} product={product?.node} />
            ))}
          </Box>
        ))}
      </Grid2>

      {/* Paginação */}
      <Stack spacing={2}>
        <Pagination count={10} />
      </Stack>
    </Grid2>
  );
};

export default Catalog;
