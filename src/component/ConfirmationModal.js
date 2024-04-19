import React from "react";

const ConfirmationModal = ({
  modalBtnClick,
  modalTitle,
  modalDesc,
  closeConfirmationModal,
  btnText,
}) => {
  return (
    <div className="absolute text-center mx-auto w-[80%] top-[30%] left-[10%] bg-white border-2 px-2 py-4 rounded">
      <p className="text-2xl text-left w-[80%] mx-auto mb-6">{modalTitle}</p>
      <p className="text-base text-left w-[80%] mx-auto mb-6">{modalDesc}</p>
      <div className="flex justify-between w-[80%] mx-auto text-lg">
        <button
          className="px-4 py-1 border rounde"
          onClick={closeConfirmationModal}
        >
          Cancel
        </button>
        <button
          className="px-4 py-1 border rounded bg-red-500 text-white"
          onClick={() => modalBtnClick()}
        >
          {btnText}
        </button>
      </div>
    </div>
  );
};

export default ConfirmationModal;
