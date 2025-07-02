import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './slices/products';
import uploadImageReducer from './slices/loadingSaveImage';
import authReducer from './slices/user';
import axios from 'axios';
import { apiSlice } from './slices/apiSlice';
export const store = configureStore({
  reducer: {
    uploadImage: uploadImageReducer,
    products: productsReducer,
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  /*   devTools: process.env.NODE_ENV === "development",
   */
});
// Intercepta as responses caso o token esteja expirado
/* axios.interceptors.response.use(
  (response) => response,
  (error) => {
   
    if (error.response.status === 401) {
      // Em caso de status 401 (Não autorizado)
      // Desloga o usuário e navega para caminho root
      localStorage.removeItem('user');
      window.location.href = import.meta.env.BASE_URL + '/login';
    } else {
      return Promise.reject(error);
    }
  }
);
 */
