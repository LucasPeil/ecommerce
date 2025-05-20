import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authServices from '../services/user';

// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user#19dg23'));

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  register: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: '',
  },
  message: '',
  forgotPassword: {
    stage1: {
      // solicita código de recuperação
      isLoading: false,
      isError: false,
      isSuccess: false,
      message: '',
    },
    stage2: {
      // recebe código de recuperação
      expireDate: '',
      isLoading: false,
      isError: false,
      isSuccess: false,
      message: '',
    },
    stage3: {
      // verifica código de recuperação
      isLoading: false,
      isError: false,
      isSuccess: false,
      message: '',
    },
  },
};

export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  try {
    return await authServices.login(user);
  } catch (error) {
    const message = error.response.data.message;

    return thunkAPI.rejectWithValue(message);
  }
});

export const logout = createAsyncThunk('auth/logout', async () => {
  return await authServices.logout();
});

export const resetPassword = createAsyncThunk(
  'auth/reset-password',
  async (newPassword, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await authServices.resetPassword(newPassword, token);
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
export const createUser = createAsyncThunk(
  'createUser/post',
  async (data, thunkAPI) => {
    try {
      return await authServices.createUser(data);
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

export const forgotPassword = createAsyncThunk(
  'auth/forgot-password',
  async (body, thunkAPI) => {
    try {
      return await authServices.forgotPassword(body);
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

export const verifyCode = createAsyncThunk(
  'auth/verify-code',
  async (body, thunkAPI) => {
    try {
      return await authServices.verifyCode(body);
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

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetRegister: (state) => {
      state.register.isLoading = false;
      state.register.isSuccess = false;
      state.register.isError = false;
    },
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
    },
    resetForgotPassword: (state) => {
      state.forgotPassword.stage1.isLoading = false;
      state.forgotPassword.stage1.isSuccess = false;
      state.forgotPassword.stage1.isError = false;
      state.forgotPassword.stage1.message = '';
      state.forgotPassword.stage2.isLoading = false;
      state.forgotPassword.stage2.isSuccess = false;
      state.forgotPassword.stage2.isError = false;
      state.forgotPassword.stage2.message = '';
      state.forgotPassword.stage2.expireDate = '';
      state.forgotPassword.stage3.isLoading = false;
      state.forgotPassword.stage3.isSuccess = false;
      state.forgotPassword.stage3.isError = false;
      state.forgotPassword.stage3.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.register.isLoading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.register.isLoading = false;
        state.register.isSuccess = true;
        state.register.isError = false;
        state.user = action.payload.data;
        state.register.message = action.payload.message;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.register.isLoading = false;
        state.register.isSuccess = false;
        state.register.isError = true;
        state.register.message = action.payload;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;

        state.message = action.payload;
      })
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.forgotPassword.stage1.isLoading = true;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.forgotPassword.stage1.isLoading = false;
        state.forgotPassword.stage1.isSuccess = true;
        state.forgotPassword.stage1.message = action.payload.message;
        state.forgotPassword.stage2.expireDate = action.payload.expireDate;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.forgotPassword.stage1.isLoading = false;
        state.forgotPassword.stage1.isSuccess = false;
        state.forgotPassword.stage1.isError = true;
        state.forgotPassword.stage1.message = action.payload;
      })
      .addCase(verifyCode.pending, (state) => {
        state.forgotPassword.stage3.isLoading = true;
      })
      .addCase(verifyCode.fulfilled, (state, action) => {
        state.forgotPassword.stage3.isLoading = false;
        state.forgotPassword.stage3.isSuccess = true;
        state.forgotPassword.stage3.message = action.payload.message;
        state.user = action.payload;
      })
      .addCase(verifyCode.rejected, (state, action) => {
        state.forgotPassword.stage3.isLoading = false;
        state.forgotPassword.stage3.isSuccess = false;
        state.forgotPassword.stage3.isError = true;
        state.forgotPassword.stage3.message = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isLoading = false;
      });
  },
});

export const { reset, resetForgotPassword, resetRegister } = authSlice.actions;
export default authSlice.reducer;
