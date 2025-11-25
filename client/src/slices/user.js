import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    user: null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    clearToken: (state) => {
      state.token = null;
    },
    setUser: (state, action) => {
      console.log(action.payload);
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
});
export const { setToken, clearToken, setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
