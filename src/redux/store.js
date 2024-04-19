import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./reducer/todoReducer";
import modalReducer from "./reducer/modalReducer";

export const store = configureStore({
  reducer: {
    todos: todoReducer,
    showModal: modalReducer,
  },
});
