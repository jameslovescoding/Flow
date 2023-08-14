import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { removeProfilePic } from "../../store/session";

const RemoveProfilePicModal = () => {
  const { closeModal, setModalContent, setOnModalClose } = useModal();
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [errors, setErrors] = useState(null);

  const handleYesButtonClick = async () => {
    const resErrors = await dispatch(removeProfilePic(sessionUser.id));
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
    <p>Are you sure you want to remove your current profile picture?</p>
    <div>
      <button onClick={handleYesButtonClick}>Yes (Delete)</button>
      <button onClick={handleNoButtonClick}>No (Cancel)</button>
    </div>

  </>)
}

export default RemoveProfilePicModal