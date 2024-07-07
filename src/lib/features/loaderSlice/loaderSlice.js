const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  isLoaderOpen: false,
}

const loaderSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    openLoader: (state, action) => {
      state.isLoaderOpen = true;
    },
    closeLoader: (state, action) => {
      state.isLoaderOpen = false;
    },
    toggleLoader: (state, action) => {
      if (action.payload === 'SIGN_IN') {
        state.isLoaderOpen = !state.isLoaderOpen;
      } else if (action.payload === 'SIGN_UP') {
        state.isLoaderOpen = !state.isLoaderOpen;
      }
    }
  }
});

export const { openLoader, closeLoader, toggleLoader } = loaderSlice.actions;
export default loaderSlice.reducer;