import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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

  return (<>
    <h1>Confirm Delete</h1>
    <p>Are you sure you want to remove current thumbnail picture?</p>
    <div>
      <button onClick={handleYesButtonClick}>Yes (Delete)</button>
      <button onClick={handleNoButtonClick}>No (Cancel)</button>
    </div>

  </>)
}

export default RemoveSongThumbnailModal