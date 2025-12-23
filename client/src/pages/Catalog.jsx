/* eslint-disable react/prop-types */
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TextFormatIcon from '@mui/icons-material/TextFormat';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import {
  Box,
  Checkbox,
  Chip,
  CircularProgress,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid2,
  Icon,
  IconButton,
  InputBase,
  Paper,
  Stack,
  Typography,
} from '@mui/material';

import { useCallback, useEffect, useRef, useState } from 'react';
import ProductSimpleCard from '../components/ProductSimpleCard';
import {
  useGetPricesRangeQuery,
  useGetRoomsQuery,
  useLazyGetAllProductsQuery,
} from '../slices/apiSlice';
import { useParams } from 'react-router-dom';
import ProductsNotFound from '../components/ProductsNotFound';

const Catalog = () => {
  const [productsState, setProductsState] = useState([]);
  const [orderBy, setOrderBy] = useState(null);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [after, setAfter] = useState(null);
  const { area } = useParams();
  // Busca
  const [text, setText] = useState('');
  const [textFilter, setTextFilter] = useState(''); // O que realmente dispara a busca

  const [filters, setFilters] = useState({
    price: [],
    category: [],
    available: [],
  });
  const [
    getProducts,
    { data: productsData, isFetching, originalArgs, isError },
  ] = useLazyGetAllProductsQuery();

  const { data: rooms } = useGetRoomsQuery({});
  const { data: prices } = useGetPricesRangeQuery({});
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    setAfter(null);
    setHasNextPage(true);
    getProducts({
      first: 5,
      after: null,
      sort: orderBy,
      filter: filters,
      searchText: textFilter,
    });
  }, [filters, orderBy, textFilter, getProducts]);

  const loadMoreRef = useRef();

  useEffect(() => {
    if (productsData?.edges) {
      const isLoadMore = !!originalArgs?.after;
      setProductsState((prev) => {
        if (isLoadMore) {
          const newIds = new Set(prev.map((p) => p.node._id));
          const uniqueNewEdges = productsData.edges.filter(
            (edge) => !newIds.has(edge.node._id)
          );
          return [...prev, ...uniqueNewEdges];
        } else {
          // Filtro Novo ou Busca (Replace)
          // Substituímos tudo pelo que veio da API
          return productsData.edges;
        }
      });
      setAfter(productsData.pageInfo.endCursor);
      setHasNextPage(productsData.pageInfo.hasNextPage);
    } else if (productsData?.edges?.length === 0 && !isFetching) {
      // Se a busca retornou vazio
      setHasNextPage(false);
    }
    setLoadingMore(false);
  }, [productsData, isFetching]);

  useEffect(() => {
    if (!hasNextPage || loadingMore || isFetching || isError) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoadingMore(true);
          getProducts({
            first: 5,
            after,
            sort: orderBy,
            filter: filters,
            searchText: textFilter,
          });
        }
      },
      { threshold: 0.5 }
    );
    const currentRef = loadMoreRef.current;
    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
      setLoadingMore(false);
    };
  }, [
    hasNextPage,
    loadingMore,
    isFetching,
    after,
    filters,
    textFilter,
    getProducts,
    orderBy,
  ]);

  useEffect(() => {
    if (area) {
      setFilters((prev) => ({
        ...prev,
        category: [area[0].toUpperCase() + area.slice(1)],
      }));
    }
  }, [area]);

  // 5. Handler Unificado e Otimizado
  const handleToggleFilter = useCallback((category, value) => {
    setFilters((prev) => {
      const currentList = prev[category];
      const isAlreadySelected = currentList.includes(value);

      if (isAlreadySelected) {
        // Remove
        return {
          ...prev,
          [category]: currentList.filter((item) => item !== value),
        };
      } else {
        // Adiciona
        return { ...prev, [category]: [...currentList, value] };
      }
    });
  }, []);

  // Helper para verificar se está marcado (substitui o estado 'checkboxes')
  /* const isChecked = (category, value) => filters[category].includes(value); */

  const isChecked = (category, value) => filters[category].includes(value);

  const handleSearch = () => {
    if (textFilter) {
      setTextFilter('');
      setText('');
    } else {
      setTextFilter(text);
    }
  };

  return (
    <Box sx={{ pt: '100px', pb: 5 }}>
      {/* Use padding ao invés de transform para layout */}
      {/* Search Bar */}
      <Stack direction="row" justifyContent="center" sx={{ mb: 6 }}>
        <Paper
          elevation={3}
          sx={{
            display: 'flex',
            alignItems: 'center',
            width: { xs: '90%', md: '50%' },
            p: '2px 4px',
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="O que você está procurando?"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && setTextFilter(text)}
          />
          <IconButton onClick={handleSearch} sx={{ p: '10px' }}>
            {textFilter ? <CloseIcon /> : <SearchIcon />}
          </IconButton>
        </Paper>
      </Stack>
      <Grid2 container spacing={4} sx={{ px: { xs: 2, md: 6 } }}>
        {/* Sidebar Filtros */}
        <Grid2 size={{ xs: 12, md: 3 }}>
          <Paper sx={{ p: 3, position: 'sticky', top: '110px' }}>
            <Stack direction="row" justifyContent="start" alignItems="center">
              <Typography variant="h6">Ordenar por</Typography>
              <IconButton
                onClick={() => {
                  setOrderBy(null);
                }}
                size="small"
                sx={{ ml: 1, display: orderBy ? 'inline-flex' : 'none' }}
              >
                <RestartAltIcon fontSize="small" />
              </IconButton>
            </Stack>
            <Stack direction={'row'} spacing={1} sx={{ mt: 1, mb: 2 }}>
              <Chip
                onClick={() => {
                  setOrderBy('price');
                }}
                icon={<AttachMoneyIcon />}
                label="Valor"
                color={orderBy === 'price' ? 'darkColor' : 'default'}
              />
              <Chip
                onClick={() => {
                  setOrderBy('name');
                }}
                icon={<TextFormatIcon />}
                label="Nome"
                color={orderBy === 'name' ? 'darkColor' : 'default'}
              />
            </Stack>
            <Typography variant="h6" gutterBottom>
              Filtros
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Encontre o que você procura!
            </Typography>
            {/* Filtro Dinâmico: Preço */}
            <FilterGroup
              label="Faixa de Preço"
              items={prices?.data}
              category="price"
              valueKey="price"
              labelKey="price"
              subLabelKey="qty"
              isChecked={isChecked}
              onToggle={handleToggleFilter}
            />
            {/* Filtro Dinâmico: Cômodos */}
            <FilterGroup
              label="Cômodos"
              items={rooms?.data} // Assumindo que rooms.data é um array de strings
              category="category"
              simpleStringArray={true}
              isChecked={isChecked}
              onToggle={handleToggleFilter}
            />
          </Paper>
        </Grid2>

        {/* Lista de Produtos */}
        <Grid2
          size={{ xs: 12, md: 9 }}
          sx={{
            justifyContent: 'center',
          }}
        >
          {productsState?.length === 0 && !isFetching ? (
            <ProductsNotFound />
          ) : (
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: 4,
                width: '100%',
              }}
            >
              {productsState.map((edge) => (
                // Remova o Grid2 wrapper do card, use o componente direto ou um Box simples
                <Box
                  key={edge.node.id}
                  sx={{ display: 'flex', justifyContent: 'center' }}
                >
                  <ProductSimpleCard product={edge.node} />
                </Box>
              ))}
            </Box>
          )}

          {/* Loader */}
          {(hasNextPage || isFetching) && !isError && (
            <Box
              ref={loadMoreRef}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                mt: 4,
                width: '100%',
              }}
            >
              <CircularProgress />
            </Box>
          )}

          {!hasNextPage && productsState?.length > 0 && (
            <Typography
              align="center"
              sx={{ mt: 4, width: '100%' }}
              color="text.secondary"
            >
              Você chegou ao fim da lista.
            </Typography>
          )}
        </Grid2>
      </Grid2>
    </Box>
  );
};

//
const FilterGroup = ({
  label,
  items,
  category,
  valueKey,
  labelKey,
  subLabelKey,
  isChecked,
  onToggle,
  simpleStringArray,
}) => (
  <FormControl
    component="fieldset"
    variant="standard"
    sx={{ mt: 2, width: '100%' }}
  >
    <FormLabel component="legend" sx={{ fontWeight: 'bold' }}>
      {label}
    </FormLabel>
    <Divider sx={{ my: 1 }} />
    <FormGroup>
      {items?.map((item) => {
        const value = simpleStringArray ? item : item[valueKey];
        const displayLabel = simpleStringArray ? item : item[labelKey];
        const subLabel = subLabelKey ? `(${item[subLabelKey]})` : '';

        return (
          <FormControlLabel
            key={value}
            control={
              <Checkbox
                checked={isChecked(category, value)}
                onChange={() => onToggle(category, value)}
                name={String(value)}
              />
            }
            label={
              <Typography variant="body2">
                {displayLabel}{' '}
                <Typography
                  component="span"
                  variant="caption"
                  color="text.secondary"
                >
                  {subLabel}
                </Typography>
              </Typography>
            }
          />
        );
      })}
    </FormGroup>
  </FormControl>
);

export default Catalog;
