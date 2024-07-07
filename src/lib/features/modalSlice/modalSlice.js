const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  isModalOpen: false,
}

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isModalOpen = true;
    },
    closeModal: (state, action) => {
      state.isModalOpen = false;
    },
    toggleModal: (state, action) => {
      if (action.payload === 'SIGN_IN') {
        state.isSigninModal = !state.isSigninModal;
      } else if (action.payload === 'SIGN_UP') {
        state.isSignupModal = !state.isSignupModal;
      }
    }
  }
});

export const { openModal, closeModal, toggleModal } = modalSlice.actions;
export default modalSlice.reducer;