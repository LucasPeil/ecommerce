import { useState } from 'react';

import './App.css';
import axios from 'axios';
import Home from './pages/Home';
import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';
import Product from './pages/Product';

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route exact path="/" element={<Home />} />

        <Route exact path="/produto/:id" element={<Product />} />
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

            console.log(response.data);
          }}
        >
          count is {count}
        </button> */
