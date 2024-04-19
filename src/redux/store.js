import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "./reducer/todoReducer";

export const store = configureStore({
  reducer: todoSlice.reducer,
});
