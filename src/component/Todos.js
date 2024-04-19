import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { AiOutlinePlusCircle } from "react-icons/ai";
import TodoItem from "./TodoItem";
import moment from "moment";
import AddOrUpdateModal from "./AddOrUpdateModal";
import ConfirmationModal from "./ConfirmationModal";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, deleteTodo, updateTodo } from "../redux/reducer/todoReducer";

const Todos = () => {
  const { todos } = useSelector((state) => state.todos);

  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState({
    addUpdateModal: false,
    deletedModal: false,
  });
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [error, setError] = useState({ title: false, time: false });
  const [currentTimeAndDate, setCurrentTimeAndDate] = useState(
    moment().format("YYYY-MM-DDTHH:mm")
  );
  const [todoInputValue, setTodoInputValue] = useState({
    todoTitle: "",
    time: moment().format("YYYY-MM-DDTHH:mm"),
  });

  const changeTodoInputValue = (e) => {
    setTodoInputValue({ ...todoInputValue, [e.target.name]: e.target.value });
    let err = {
      title: false,
      time: false,
    };
    if (todoInputValue.todoTitle.trim() === "") {
      err.title = true;
    } else {
      err.title = false;
    }

    if (
      !moment(todoInputValue.time).isValid() ||
      moment(todoInputValue.time).isBefore(moment())
    ) {
      err.time = true;
    } else {
      err.time = false;
    }
    setError(err);
  };

  const closeAddOrUpdateModal = () => {
    setShowModal({ addUpdateModal: false, deletedModal: false });
    setSelectedTodo(null);
    setTodoInputValue({
      todoTitle: "",
      time: moment().format("YYYY-MM-DDTHH:mm"),
    });
    setError({ title: false, time: false });
  };

  //This function createOrUpdateTodo
  const createOrUpdateTodo = () => {
    let err = {
      title: false,
      time: false,
    };
    if (
      todoInputValue.todoTitle.trim() === "" ||
      !moment(todoInputValue.time).isValid() ||
      moment(todoInputValue.time).isBefore(moment())
    ) {
      todoInputValue.todoTitle.trim() === "" && (err.title = true);
      (!moment(todoInputValue.time).isValid() ||
        moment(todoInputValue.time).isBefore(moment())) &&
        (err.time = true);
      setError(err);
      return;
    }

    //If selectedTodo exist then we enter in true block and perform update operation otherwise add todo
    if (selectedTodo) {
      const updatedTodo = {
        id: selectedTodo.id,
        title: todoInputValue.todoTitle,
        time: todoInputValue.time,
      };
      dispatch(updateTodo(updatedTodo));
      setSelectedTodo(null);
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
    setError({ title: false, time: false });
  };

  const deleteTodoItem = () => {
    dispatch(deleteTodo(selectedTodo));
    setShowModal({ addUpdateModal: false, deletedModal: false });
    setSelectedTodo(null);
  };

  const openConfirmationModal = (todo) => {
    setShowModal({ addUpdateModal: false, deletedModal: true });
    setSelectedTodo(todo);
  };

  const closeConfirmationModal = () => {
    setShowModal({ addUpdateModal: false, deletedModal: false });
    setSelectedTodo(null);
  };

  //this function set todoInputValue base on id
  const updateDataInTodoInputValue = (todo) => {
    setTodoInputValue({ todoTitle: todo.title, time: todo.time });
    setSelectedTodo(todo);
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
          onClick={() =>
            setShowModal({ addUpdateModal: true, deletedModal: false })
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
          selectedTodo={selectedTodo}
          todoInputValue={todoInputValue}
          changeTodoInputValue={changeTodoInputValue}
          closeAddOrUpdateModal={closeAddOrUpdateModal}
          createOrUpdateTodo={createOrUpdateTodo}
          error={error}
        />
      )}
      {showModal.deletedModal && (
        <ConfirmationModal
          modalBtnClick={deleteTodoItem}
          closeConfirmationModal={closeConfirmationModal}
          modalTitle="Delete"
          modalDesc="Are you sure you want to delete this item ?"
          btnText="Delete"
        />
      )}
    </div>
  );
};

export default Todos;
