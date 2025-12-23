import { useState } from 'react';
import 'react-multi-carousel/lib/styles.css';
import { useGetAllProductsQuery } from '../slices/apiSlice';
import Carrousel from './Carrousel';
const DestaqueSlider = ({}) => {
  const {
    data: products = [],

    isFetching,
  } = useGetAllProductsQuery({
    first: 5,
    after: null,
    filter: {},
    searchText: '',
  });
  return <Carrousel data={products} loading={isFetching} />;
};

export default DestaqueSlider;
