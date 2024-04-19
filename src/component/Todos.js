import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { AiOutlinePlusCircle } from "react-icons/ai";
import TodoItem from "./TodoItem";
import moment from "moment";
import AddOrUpdateModal from "./AddOrUpdateModal";
import ConfirmationModal from "./ConfirmationModal";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodo,
  deleteTodo,
  setSelectedTodoId,
  updateTodo,
} from "../redux/reducer/todoReducer";
import { setShowModal } from "../redux/reducer/modalReducer";

const Todos = () => {
  const { todos } = useSelector((state) => state.todos);
  const { selectedTodoId } = useSelector((state) => state.todos);
  const { showModal } = useSelector((state) => state.showModal);

  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const [isDateValid, setIsDateValid] = useState(false);
  const [currentTimeAndDate, setCurrentTimeAndDate] = useState(
    moment().format("YYYY-MM-DDTHH:mm")
  );
  const [todoInputValue, setTodoInputValue] = useState({
    todoTitle: "",
    time: moment().format("YYYY-MM-DDTHH:mm"),
  });

  const changeTodoInputValue = (e) => {
    setTodoInputValue({ ...todoInputValue, [e.target.name]: e.target.value });
  };

  const closeTodoPopupModal = () => {
    dispatch(setShowModal({ addUpdateModal: false, deletedModal: false }));
    dispatch(setSelectedTodoId(null));
    setTodoInputValue({
      todoTitle: "",
      time: moment().format("YYYY-MM-DDTHH:mm"),
    });
    setIsDateValid(false);
    setError(false);
  };

  //This function createOrUpdateTodo
  const createOrUpdateTodo = () => {
    if (
      todoInputValue.todoTitle.trim() === "" &&
      (moment(todoInputValue.time).isValid() ||
        !moment(todoInputValue.time).isBefore(moment()))
    ) {
      setIsDateValid(false);
    }

    if (todoInputValue.todoTitle.trim() === "") {
      setError(true);
      return;
    } else {
      setError(false);
    }

    if (
      !moment(todoInputValue.time).isValid() ||
      moment(todoInputValue.time).isBefore(moment())
    ) {
      setIsDateValid(true);
      return;
    } else {
      setIsDateValid(false);
    }

    //If selectedTodoId exist then we enter in true block and perform update operation otherwise add todo
    if (selectedTodoId) {
      const updatedTodo = {
        id: selectedTodoId,
        title: todoInputValue.todoTitle,
        time: todoInputValue.time,
      };
      dispatch(updateTodo(updatedTodo));
      dispatch(setSelectedTodoId(null));
    } else {
      const newTodo = {
        id: Date.now(),
        title: todoInputValue.todoTitle,
        time: todoInputValue.time,
        isComplete: false,
        color: "purple",
      };
      dispatch(addTodo(newTodo));
    }
    setTodoInputValue({
      todoTitle: "",
      time: moment().format("YYYY-MM-DDTHH:mm"),
    });
    dispatch(setShowModal({ addUpdateModal: false, deletedModal: false }));
    setError(false);
    setIsDateValid(false);
  };

  const deleteTodoItem = (id) => {
    dispatch(deleteTodo(id));
    dispatch(setShowModal({ addUpdateModal: false, deletedModal: false }));
    dispatch(setSelectedTodoId(null));
  };

  const openConfirmationModal = (todo) => {
    dispatch(setShowModal({ addUpdateModal: false, deletedModal: true }));
    dispatch(setSelectedTodoId(todo.id));
  };

  const closeConfirmationModal = () => {
    dispatch(setShowModal({ addUpdateModal: false, deletedModal: false }));
    dispatch(setSelectedTodoId(null));
  };

  //this function set todoInputValue base on id
  const updateDataInTodoInputValue = (todo) => {
    setTodoInputValue({ todoTitle: todo.title, time: todo.time });
    dispatch(setSelectedTodoId(todo.id));
    dispatch(setShowModal({ addUpdateModal: true, deletedModal: false }));
  };

  //We use seInterval in useEffect for update currentTimeAndDate in every seconds. currenTimeAndDate used for update navbar time.
  useEffect(() => {
    setInterval(() => {
      setCurrentTimeAndDate(moment().format("YYYY-MM-DDTHH:mm"));
    }, 1000);
  }, []);

  return (
    <div className="w-full mx-auto relative pb-10 border-2 shadow-md sm:w-3/5 md:w-2/4 lg:w-2/5 2xl:w-2/6">
      <Navbar currentTimeAndDate={currentTimeAndDate} />
      <div className="flex justify-between items-center px-3 mt-2 mb-6">
        <h1 className="text-3xl font-bold">Today</h1>
        <div
          className="text-3xl text-blue-500 cursor-pointer"
          onClick={() =>
            dispatch(
              setShowModal({ addUpdateModal: true, deletedModal: false })
            )
          }
        >
          <AiOutlinePlusCircle />
        </div>
      </div>
      {todos?.length === 0 ? (
        <h1 className="text-center text-xl font-semibold">Todo is Empty</h1>
      ) : (
        todos.map((todo, index) => {
          return (
            <TodoItem
              key={index}
              todo={todo}
              openConfirmationModal={openConfirmationModal}
              updateDataInTodoInputValue={updateDataInTodoInputValue}
            />
          );
        })
      )}

      {showModal.addUpdateModal && (
        <AddOrUpdateModal
          todoInputValue={todoInputValue}
          changeTodoInputValue={changeTodoInputValue}
          closeTodoPopupModal={closeTodoPopupModal}
          createOrUpdateTodo={createOrUpdateTodo}
          error={error}
          isDateValid={isDateValid}
        />
      )}
      {showModal.deletedModal && (
        <ConfirmationModal
          modalBtnClick={deleteTodoItem}
          closeConfirmationModal={closeConfirmationModal}
          popupTitle="Delete"
          popupDesc="Are you sure you want to delete this item ?"
          btnText="Delete"
        />
      )}
    </div>
  );
};

export default Todos;
