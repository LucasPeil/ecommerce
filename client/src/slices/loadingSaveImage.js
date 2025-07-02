import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  uploadImageIsLoading: false, // valor inicial
};

const uploadImageIsLoadingSlice = createSlice({
  name: 'uploadImageIsLoading',
  initialState,
  reducers: {
    setUploadImageIsLoading: (state, action) => {
      state.uploadImageIsLoading = action.payload;
    },
  },
});

export const { setLoadingSaveImage } = uploadImageIsLoadingSlice.actions;
export default uploadImageIsLoadingSlice.reducer;
