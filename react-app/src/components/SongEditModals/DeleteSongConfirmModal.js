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

  return (<>
    <h1>Confirm Delete</h1>
    <p>Are you sure you want to delete this song?</p>
    <div>
      <button onClick={handleYesButtonClick}>Yes (Delete)</button>
      <button onClick={handleNoButtonClick}>No (Cancel)</button>
    </div>

  </>)
}

export default DeleteSongConfirmModal