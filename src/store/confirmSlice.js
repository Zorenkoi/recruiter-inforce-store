import { createSlice } from "@reduxjs/toolkit";

const confirmSlice = createSlice({
  name: "confirm",
  initialState: {
    isOpen: false,
    question: "",
    productId: null,
  },
  reducers: {
    openConfirm: (state, action) => {
      state.isOpen = true;
      state.question = action.payload.question;
      state.productId = action.payload.productId;
    },
    closeConfirm: (state) => {
      state.isOpen = false;
      state.question = "";
      state.productId = null;
    },
  },
});

export const { openConfirm, closeConfirm } = confirmSlice.actions;
export default confirmSlice.reducer;
