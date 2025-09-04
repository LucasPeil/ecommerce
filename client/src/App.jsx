import { useState, useEffect } from 'react';

import './App.css';
import Home from './pages/Home';
import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';
import Product from './pages/Product';
import { useGetUserCartQuery, useLazyGetUserQuery } from './slices/apiSlice';
import Catalog from './pages/Catalog';
import ConfirmPurchase from './pages/ConfirmPurchase';
import CriarProduto from './pages/CriarProduto';
import PrivateRoute from './components/PrivateRoute';
import { useAuth0 } from '@auth0/auth0-react';
import { setToken, setUser } from './slices/user';
import { useDispatch, useSelector } from 'react-redux';

function App() {
  const { user, getAccessTokenSilently } = useAuth0();
  const getToken = async () => {
    let token = await getAccessTokenSilently({
      authorizationParams: {
        audience: 'https://ecommerce-api',
      },
    });

    return token;
  };
  const [getUser, { data: userDb, isFetching }] = useLazyGetUserQuery();
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const {
    data: userDbInfo,
    isFetching: isFetchingCart,
    isSuccess: isSuccessCart,
    refetch,
  } = useGetUserCartQuery(
    { id: userDb?._id, token: token },
    {
      skip: !userDb?._id,
    }
  );

  useEffect(() => {
    if (user) {
      getToken().then((result) => {
        dispatch(setToken(result));
        getUser({ email: user?.email, token: result });

        // You may want to do setState here as well
      });
      // console.log(token);
    }
  }, [user, getAccessTokenSilently]);

  /*   useEffect(() => {
    if (userDb) {
      dispatch(setUser(userDb));
    }
  }, [userDb]); */

  return (
    <>
      <Header refetch={refetch} userDbInfo={userDbInfo} />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/catalogo" element={<Catalog />} />
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
