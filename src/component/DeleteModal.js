import React from "react";

const DeleteModal = ({
  showModal,
  setShowModal,
  deleteTodoItem,
  selectedTodoId,
  setSelectedTodoId,
}) => {
  const closeDeleteModal = () => {
    setShowModal({ addUpdateModal: false, deletedModal: false });
    setSelectedTodoId(null);
  };
  return (
    showModal.deletedModal && (
      <div className="absolute text-center mx-auto w-[80%] top-[30%] left-[10%] bg-white border-2 px-2 py-4 rounded">
        <p className="text-2xl text-left w-[80%] mx-auto mb-6">Delete</p>
        <p className="text-base text-left w-[80%] mx-auto mb-6">
          Are you sure you want to delete this item ?
        </p>
        <div className="flex justify-between w-[80%] mx-auto text-lg">
          <button
            className="px-4 py-1 border rounde"
            onClick={closeDeleteModal}
          >
            Cancel
          </button>
          <button
            className="px-4 py-1 border rounded bg-red-500 text-white"
            onClick={() => deleteTodoItem(selectedTodoId)}
          >
            Delete
          </button>
        </div>
      </div>
    )
  );
};

export default DeleteModal;
