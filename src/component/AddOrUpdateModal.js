import moment from "moment";
import React from "react";

const AddOrUpdateModal = ({
  selectedTodo,
  todoInputValue,
  changeTodoInputValue,
  closeAddOrUpdateModal,
  createOrUpdateTodo,
  error,
}) => {
  const currentDate = moment().format("YYYY-MM-DDTHH:mm");
  return (
    <div className="absolute mx-auto w-11/12 top-[15%] left-[4%] bg-white border-2 p-2 rounded ">
      <p className="text-lg font-semibold mb-2 2xl:text-xl 2xl:mb-4">
        {selectedTodo ? "Update" : "Add"} Todo
      </p>
      <textarea
        name="todoTitle"
        id="todoTitle"
        value={todoInputValue.todoTitle}
        onChange={changeTodoInputValue}
        className={`w-full h-32 resize-none p-2 rounded border-2 outline-none ${
          error?.title ? "border-red-500" : "border-gray-200"
        }`}
      ></textarea>
      <input
        type="datetime-local"
        name="time"
        id="time"
        value={todoInputValue.time}
        min={currentDate}
        onChange={changeTodoInputValue}
        className={`w-full rounded p-2 border-2  ${
          error?.time ? "border-red-500" : "border-gray-200"
        } 2xl:mt-2`}
      />
      <div className="w-full flex justify-between text-lg font-semibold text-blue-500 mt-3 px-4 2xl:mt-4">
        <button onClick={closeAddOrUpdateModal}>Cancel</button>
        <button onClick={createOrUpdateTodo}>Done</button>
      </div>
    </div>
  );
};

export default AddOrUpdateModal;
