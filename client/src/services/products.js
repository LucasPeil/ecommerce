import axios from 'axios';

const API_URL =
  process.env.NODE_ENV === 'production'
    ? import.meta.env.BASE_URL + '/api/products'
    : '/api/products';

const getProduct = async (id, token) => {
  const query = `query getProduct($id: String!) {
        getProduct(id: $id) {
        status
        message
        data {
        id
          name
          images
           condition 
          description
          price
          available
          quantity
        }  
        }
      
      }`;
  const config = {
    headers: {
      Authorization: `Bearer: ${token}`,
    },
  };

  const response = await axios.get(
    `/teste?query=${query}&variables=${JSON.stringify({ id: id })}`,
    config
  );

  return response.data;
};

const getAllProducts = async (options, token) => {
  const query = `query getAllProducts() {
          getAllProducts() {
          status
          message
          dataList{
            id
            condition 
            images
            description
            price
            available
            quantity
          }
          }
        
        }`;
  const config = {
    headers: {
      Authorization: `Bearer: ${token}`,
    },
  };

  const response = await axios.get(`/teste?query=${query}`, config);

  return response.data;
};

const createProduct = async (product, token) => {
  const mutation = `mutation createProduct($product: ProductInput) {
        createProduct(product: $product) {
         status
        message
        data {
        id
          images
          condition 
          description
          price
          available
          quantity
        }  
        }
     
      } `;
  console.log(product);
  const data = JSON.stringify({
    query: mutation,
    variables: {
      product,
      /*  product: {
        name: 'Produto 1',
        images: 'image-url',
        description: 'Criando um produto',
        price: 50.0,
        available: true,
        quantity: 500,
      }, */
    },
  });
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      /*   Authorization: `Bearer: ${token}`, */
    },
  };
  const response = await axios.post(API_URL, data, config);
  console.log(response?.data);

  return response?.data;
};

const productsService = {
  createProduct,
  getAllProducts,
  getProduct,
};

export default productsService;
