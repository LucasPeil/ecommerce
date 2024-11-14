import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import productsService from '../services/products';

const initialState = {
  products: [],
  singleProduct: [],
  getAllProducts: {
    isSuccess: false,
    isLoading: false,
    isError: false,
    message: '',
  },
  getProduct: {
    isSuccess: false,
    isLoading: false,
    isError: false,
    message: '',
  },
  createProduct: {
    isSuccess: false,
    isLoading: false,
    isError: false,
    message: '',
  },
  updateProduct: {
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
  },
  deleteProduct: {
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
  },
};
export const getAllProducts = createAsyncThunk(
  'getAllProducts/get',
  async (options, thunkAPI) => {
    //const token = thunkAPI.getState().auth.user.token;
    const token = 'jf9qwikl3';
    try {
      return await productsService.getAllProducts(options, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const getProduct = createAsyncThunk(
  'getProduct/get',
  async (id, thunkAPI) => {
    //const token = thunkAPI.getState().auth.user.token;
    const token = 'jf9qwikl3';
    try {
      return await productsService.getProduct(id, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const createProduct = createAsyncThunk(
  'createProduct/post',
  async (product, thunkAPI) => {
    //const token = thunkAPI.getState().auth.user.token;
    const token = 'jf9qwikl3';
    try {
      return await productsService.createProduct(product, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const productsSlice = createSlice({
  name: 'productsSlice',
  initialState,
  reducers: {
    resetProducts: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
    },
    resetCreate: (state) => {
      state.createProduct.isLoading = false;
      state.createProduct.isSuccess = false;
      state.createProduct.isError = false;
    },
    resetUpdate: (state) => {
      state.updateProduct.isLoading = false;
      state.updateProduct.isSuccess = false;
      state.updateProduct.isError = false;
    },
    resetDelete: (state) => {
      state.deleteProduct.isLoading = false;
      state.deleteProduct.isSuccess = false;
      state.deleteProduct.isError = false;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.createProduct.isLoading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.createProduct.isLoading = false;
        state.createProduct.isSuccess = true;
        state.createProduct.isError = false;
        state.singleProduct = action.payload;
        /* 
        // Verifica se o item já existe na lista
        const existingIndex = state.users.results?.findIndex(
          (item) => item._id === action.payload.singleUser._id
        );
        // Se o item não existir na lista, adiciona-o
        if (existingIndex === -1) {
          state.users.results.unshift(action.payload.singleUser);
        }
 */
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.createProduct.isLoading = false;
        state.createProduct.isSuccess = false;
        state.createProduct.isError = true;
        state.createProduct.message = action.payload;
      })

      .addCase(getAllProducts.pending, (state) => {
        state.getAllProducts.isLoading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.getAllProducts.isLoading = false;
        state.getAllProducts.isSuccess = true;
        state.getAllProducts.isError = false;
        state.products = action.payload;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.getAllProducts.isLoading = false;
        state.getAllProducts.isSuccess = false;
        state.getAllProducts.isError = true;
        state.getAllProducts.message = action.payload;
      })

      .addCase(getProduct.pending, (state) => {
        state.getProduct.isLoading = true;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.getProduct.isLoading = false;
        state.getProduct.isSuccess = true;
        state.getProduct.isError = false;
        state.singleProduct = action.payload;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.getProduct.isLoading = false;
        state.getProduct.isSuccess = false;
        state.getProduct.isError = true;
        state.getProduct.message = action.payload;
      });
  },
});

export const { resetCreate, resetDelete, resetUpdate, resetProducts } =
  productsSlice.actions;

export default productsSlice.reducer;
