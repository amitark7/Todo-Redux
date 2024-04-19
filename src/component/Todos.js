import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { AiOutlinePlusCircle } from "react-icons/ai";
import TodoItem from "./TodoItem";
import moment from "moment";
import PopUpModal from "./PopUpModal";
import DeleteModal from "./DeleteModal";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, deleteTodo, updateTodo } from "../redux/reducer/todoReducer";

const Todos = () => {
  const { todos } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState({
    addUpdateModal: false,
    deletedModal: false,
  });
  const [error, setError] = useState(false);
  const [isDateValid, setIsDateValid] = useState(false);
  const [selectedTodoId, setSelectedTodoId] = useState(null);
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

  const openTodoPopupModal = () => {
    setShowModal({ addUpdateModal: true, deletedModal: false });
  };

  const closeTodoPopupModal = () => {
    setShowModal({ addUpdateModal: false, deletedModal: false });
    setSelectedTodoId(null);
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
      setSelectedTodoId(null);
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
    setShowModal({ addUpdateModal: false, deletedModal: false });
    setError(false);
    setIsDateValid(false);
  };

  const deleteTodoItem = (id) => {
    dispatch(deleteTodo(id));
    setShowModal({ addUpdateModal: false, deletedModal: false });
    setSelectedTodoId(false);
  };

  const openDeletedModal = (id) => {
    setShowModal({ addUpdateModal: false, deletedModal: true });
    setSelectedTodoId(id);
  };

  //this function set todoInputValue base on id
  const updateDataInTodoInputValue = (todo) => {
    setTodoInputValue({ todoTitle: todo.title, time: todo.time });
    setSelectedTodoId(todo.id);
    setShowModal({ addUpdateModal: true, deletedModal: false });
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
          onClick={openTodoPopupModal}
        >
          <AiOutlinePlusCircle />
        </div>
      </div>
      {todos.length === 0 && (
        <h1 className="text-center text-xl font-semibold">Todo is Empty</h1>
      )}
      {todos?.map((todo, index) => {
        return (
          <TodoItem
            key={index}
            todo={todo}
            openDeletedModal={openDeletedModal}
            updateDataInTodoInputValue={updateDataInTodoInputValue}
            // isTodoComplete={isTodoComplete}
          />
        );
      })}

      <PopUpModal
        showModal={showModal}
        selectedTodoId={selectedTodoId}
        todoInputValue={todoInputValue}
        changeTodoInputValue={changeTodoInputValue}
        closeTodoPopupModal={closeTodoPopupModal}
        createOrUpdateTodo={createOrUpdateTodo}
        error={error}
        isDateValid={isDateValid}
      />
      <DeleteModal
        showModal={showModal}
        setShowModal={setShowModal}
        deleteTodoItem={deleteTodoItem}
        selectedTodoId={selectedTodoId}
        setSelectedTodoId={setSelectedTodoId}
      />
    </div>
  );
};

export default Todos;
