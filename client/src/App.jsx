import { useState } from 'react';

import './App.css';
import axios from 'axios';
import Home from './pages/Home';
import Header from './components/Header';
function App() {
  const [count, setCount] = useState(0);
  const id = '300';
  const query = `query getProduct($id: String!) {
    getProduct(id: $id) {
    status
    message
    data {
    id
      image
      description
      price
      available
      quantity
    }  
    }
  
  }`;
  const mutation = `mutation createProduct($product: ProductInput) {
    createProduct(product: $product) {
     status
    message
    data {
    id
      image
      description
      price
      available
      quantity
    }  
    }
 
  } `;
  /*  const url = new URL('http://localhost:4000/teste');
  url.searchParams.append('query', query);
  url.searchParams.append('variables', JSON.stringify({ id: id })); */

  return (
    <>
      <Header />
      <Home />
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
