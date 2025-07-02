import { useState, useEffect } from 'react';

import './App.css';
import axios from 'axios';
import Home from './pages/Home';
import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';
import Product from './pages/Product';
import {
  getUser,
  useGetUserCartQuery,
  useUpdateUserCartMutation,
} from './slices/apiSlice';
import Catalog from './pages/Catalog';
import ConfirmPurchase from './pages/ConfirmPurchase';
import CriarProduto from './pages/CriarProduto';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(getUser());
  }, []);
  const {
    data: userDbInfo,
    isFetching: isFetchingCart,
    isSuccess: isSuccessCart,
    refetch,
  } = useGetUserCartQuery(
    { id: user?._id },
    {
      skip: !user?._id,
    }
  );
  const [updateUserCart, { isLoaing, isSuccess: isSuccessUpdateCart }] =
    useUpdateUserCartMutation();
  return (
    <>
      <Header
        id={user ? user._id : null}
        userDbInfo={userDbInfo}
        setUser={setUser}
        user={user}
      />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/Catalog" element={<Catalog />} />
        <Route exact path="/criar-produto" element={<CriarProduto />} />
        <Route exact path="/confirmar-pedido" element={<ConfirmPurchase />} />
        <Route
          exact
          path="/produto/:id"
          element={
            <Product
              user={user}
              updateUserCart={updateUserCart}
              refetchGetUserCart={refetch}
              isFetchingCart={isFetchingCart}
              isSuccessUpdateCart={isSuccessUpdateCart}
              userDbInfo={userDbInfo}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;

/* 
<button
          onClick={async () => { */
/* const response = await axios.get(
              `/teste?query=${query}&variables=${JSON.stringify({ id: id })}`,
              {
                headers: {
                  'Content-Type': 'application/json',
                },
              }
            ); */
/*  let data = JSON.stringify({
              query: mutation,
              variables: {
                product: {
                  name: 'Produto 1',
                  image: 'image-url',
                  description: 'Criando um produto',
                  price: 50.0,
                  available: true,
                  quantity: 500,
                },
              },
            });

            const response = await axios.post(`/teste`, data, {
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
              },
            });

          
          }}
        >
          count is {count}
        </button> */
