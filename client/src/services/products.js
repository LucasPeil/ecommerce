import axios from 'axios';

const API_URL =
  process.env.NODE_ENV === 'production'
    ? import.meta.env.BASE_URL + '/api/products'
    : '/api/products';
const UPLOAD_IMAGES_API_URL =
  process.env.NODE_ENV === 'production'
    ? import.meta.env.BASE_URL + '/api/uploadFile'
    : '/api/uploadFile';

const uploadImages = async (imgs) => {
  console.log(imgs);
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Accept: 'multipart/form-data',
      /*   Authorization: `Bearer: ${token}`, */
    },
  };

  const formData = new FormData();
  console.log(imgs);
  for (let i = 0; i < imgs.length; i++) {
    formData.append(`file_${i}`, imgs[i]);
  }

  const response = await axios.post(UPLOAD_IMAGES_API_URL, formData, config);
  return response.data;
};
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

const createProduct = async (data, token) => {
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

  const urls = await uploadImages(data.images);
  const product = { ...data, ...{ images: urls } };

  const dataToSend = JSON.stringify({
    query: mutation,
    variables: {
      product: product,
    },
  });
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      /*   Authorization: `Bearer: ${token}`, */
    },
  };
  const response = await axios.post(API_URL, dataToSend, config);
  console.log(response?.data);

  return response?.data;
};

const productsService = {
  createProduct,
  getAllProducts,
  getProduct,
};

export default productsService;
