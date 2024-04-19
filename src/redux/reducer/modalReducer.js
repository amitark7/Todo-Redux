import { createSlice } from "@reduxjs/toolkit";

const modalReducer = createSlice({
  name: "showModal",
  initialState: {
    showModal: {
      addUpdateModal: false,
      deletedModal: false,
    },
  },
  reducers: {
    setShowModal: (state, action) => {
      state.showModal = action.payload;
    },
  },
});

export const { setShowModal } = modalReducer.actions;
export default modalReducer.reducer;
