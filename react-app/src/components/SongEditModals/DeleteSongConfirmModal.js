import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteSong } from "../../store/song";
import { useHistory } from "react-router-dom";

const DeleteSongConfirmModal = ({ song }) => {
  const { closeModal, setModalContent, setOnModalClose } = useModal();
  const dispatch = useDispatch();
  const history = useHistory();
  const [errors, setErrors] = useState(null);

  const handleYesButtonClick = async () => {
    const resErrors = await dispatch(deleteSong(song.id));
    if (resErrors) {
      setErrors(resErrors);
    } else {
      history.push('/my-home')
      closeModal();
    }
  };

  const handleNoButtonClick = () => {
    closeModal();
  };

  return (<div className="confirm-delete-modal-container">
    <h1>Confirm Delete</h1>
    <p>Are you sure you want to delete this song?</p>
    <div className="delete-modal-buttons">
      <button className="delete-button delete-yes hover-shadow" onClick={handleYesButtonClick}>Yes (Delete)</button>
      <button className="delete-button delete-no hover-shadow" onClick={handleNoButtonClick}>No (Cancel)</button>
    </div>

  </div>)
}

export default DeleteSongConfirmModal