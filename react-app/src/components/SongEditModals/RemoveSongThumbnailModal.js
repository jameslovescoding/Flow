import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { removeCurrentThumbnail } from "../../store/song";

const RemoveSongThumbnailModal = ({ song }) => {
  const { closeModal, setModalContent, setOnModalClose } = useModal();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState(null);

  const handleYesButtonClick = async () => {
    const resErrors = await dispatch(removeCurrentThumbnail(song.id));
    if (resErrors) {
      setErrors(resErrors);
    } else {
      closeModal();
    }
  };

  const handleNoButtonClick = () => {
    closeModal();
  };

  return (<div className="confirm-delete-modal-container">
    <h1>Confirm Delete</h1>
    <p>Are you sure you want to remove current thumbnail picture?</p>
    <div className="delete-modal-buttons">
      <button
        className="delete-button delete-yes hover-shadow"
        onClick={handleYesButtonClick}
      >
        Yes (Delete)
      </button>
      <button
        className="delete-button delete-no hover-shadow"
        onClick={handleNoButtonClick}
      >
        No (Cancel)
      </button>
    </div>

  </div>)
}

export default RemoveSongThumbnailModal