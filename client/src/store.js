import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './slices/products';
import authReducer from './slices/user';
import axios from 'axios';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    auth: authReducer,
  },
  /*   devTools: process.env.NODE_ENV === "development",
   */
});
// Intercepta as responses caso o token esteja expirado
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(error);
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
