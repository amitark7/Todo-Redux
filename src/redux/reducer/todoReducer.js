import { createSlice } from "@reduxjs/toolkit";

const todoReducer = createSlice({
  name: "todos",
  initialState: { todos: [] },
  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload);
    },

    updateTodo: (state, action) => {
      state.todos = state.todos.map((todo) => {
        if (todo.id === action.payload.id) {
          return {
            ...todo,
            title: action.payload.title,
            time: action.payload.time,
          };
        } else {
          return todo;
        }
      });
    },

    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload.id);
    },

    isTodoComplete: (state, action) => {
      state.todos = state.todos.map((todo) => {
        if (todo.id === action.payload) {
          return { ...todo, isComplete: !todo.isComplete };
        } else {
          return todo;
        }
      });
    },
  },
});

export const { addTodo, updateTodo, deleteTodo, isTodoComplete } =
  todoReducer.actions;

export default todoReducer.reducer;
