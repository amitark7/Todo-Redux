import { createSlice } from "@reduxjs/toolkit";

const todoReducer = createSlice({
  name: "todos",
  initialState: { todos: [] },
  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload);
    },

    updateTodo: (state, action) => {
      const todoIndex = state.todos.findIndex(
        (todo) => todo.id === action.payload.id
      );
      state.todos[todoIndex] = {
        ...state.todos[todoIndex],
        title: action.payload.title,
        time: action.payload.time,
      };
    },

    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload.id);
    },

    isTodoComplete: (state, action) => {
      const todoIndex = state.todos.findIndex(
        (todo) => todo.id === action.payload
      );
      state.todos[todoIndex] = {
        ...state.todos[todoIndex],
        isComplete: !state.todos[todoIndex].isComplete,
      };
    },
  },
});

export const { addTodo, updateTodo, deleteTodo, isTodoComplete } =
  todoReducer.actions;

export default todoReducer.reducer;
