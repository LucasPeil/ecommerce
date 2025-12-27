import { useState, useEffect } from 'react';

import './App.css';
import Home from './pages/Home';
import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';
import Product from './pages/Product';
import { 
  useCreateProductMutation, 
  useGetUserCartQuery, 
  useLazyGetUserQuery,
} from './slices/apiSlice';
import Catalog from './pages/Catalog';
import ConfirmPurchase from './pages/ConfirmPurchase';
import CriarProduto from './pages/CriarProduto';
import PrivateRoute from './components/PrivateRoute';
import { useAuth0 } from '@auth0/auth0-react';
import { setToken, setUser } from './slices/user';
import { useDispatch, useSelector } from 'react-redux';
import Checkout from './components/Checkout';
import { toast } from "react-toastify";
function App() {
  const { user, getAccessTokenSilently } = useAuth0();
 const [tempStripeSuccess, setTempStripeSuccess] = useState(false);
  const getToken = async () => {
    let token = await getAccessTokenSilently({
      authorizationParams: {
        audience: 'https://ecommerce-api',
      },
    });

    return token;
  };
  const [getUser, { data: userDb }] = useLazyGetUserQuery();
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const {
    data: userDbInfo,
    isFetching: isFetchingCart,
    isSuccess: isSuccessCart,
    isError: isErrorCart,
    refetch,
  } = useGetUserCartQuery(
    { id: userDb?._id, token: token },
    {
      skip: !userDb?._id,
    }
  );
  const [_, { isSuccess: isSuccessCreateProduct, isError: isErrorCreateProduct, reset } ] = useCreateProductMutation({ fixedCacheKey: 'shared-create-product' });

  

  useEffect(() => {
    if (user) {
      getToken().then((result) => {
        dispatch(setToken(result));
        getUser({ email: user?.email, token: result });
      });
    }
  }, [user, getAccessTokenSilently]);

  useEffect(() => {
    if (userDb) {
      dispatch(setUser(userDb));
    }
  }, [userDb]);
  useEffect(() => {
    if (isSuccessCreateProduct) {
      toast.success("Produto criado com sucesso!");
    }
    if (isErrorCreateProduct) {
      toast.error("Erro ao criar produto.");
    }
    return () => {
      reset();
    };
  }, [isSuccessCreateProduct, isErrorCreateProduct]);

  useEffect(() => {
    if (tempStripeSuccess) {
      toast.success("Pagamento realizado com sucesso!");
    }
    return () => {
      setTempStripeSuccess(false);
    };
  }, [tempStripeSuccess]);

  return (
    <>
      <Header refetch={refetch} userDbInfo={userDbInfo} />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/catalogo/:area" element={<Catalog />} />
        <Route path="/catalogo" element={<Catalog />} />
        <Route path="/finalizar-compra" element={<Checkout setTempStripeSuccess={setTempStripeSuccess}/>} />
        <Route
          exact
          path="/criar-produto"
          element={
            <PrivateRoute>
              <CriarProduto />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/confirmar-pedido"
          element={
            <PrivateRoute>
              <ConfirmPurchase />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/produto/:id"
          element={
            <Product
              userDbInfo={userDbInfo}
              refetchGetUserCart={refetch}
              isFetchingCart={isFetchingCart}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
