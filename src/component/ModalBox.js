import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShowModal } from "../redux/reducer/modalReducer";
import { setSelectedTodoId } from "../redux/reducer/todoReducer";

const ModalBox = ({ modalBtnClick, popupTitle, popupDesc }) => {
  const { selectedTodoId } = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  const closeDeleteModal = () => {
    dispatch(setShowModal({ addUpdateModal: false, deletedModal: false }));
    dispatch(setSelectedTodoId(null));
  };
  return (
    <div className="absolute text-center mx-auto w-[80%] top-[30%] left-[10%] bg-white border-2 px-2 py-4 rounded">
      <p className="text-2xl text-left w-[80%] mx-auto mb-6">{popupTitle}</p>
      <p className="text-base text-left w-[80%] mx-auto mb-6">{popupDesc}</p>
      <div className="flex justify-between w-[80%] mx-auto text-lg">
        <button className="px-4 py-1 border rounde" onClick={closeDeleteModal}>
          Cancel
        </button>
        <button
          className="px-4 py-1 border rounded bg-red-500 text-white"
          onClick={() => modalBtnClick(selectedTodoId)}
        >
          {popupTitle}
        </button>
      </div>
    </div>
  );
};

export default ModalBox;
