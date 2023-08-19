import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteComment } from "../../store/comment";

const DeleteCommentModal = ({ comment }) => {
  const { closeModal, setModalContent, setOnModalClose } = useModal();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState(null);

  const handleYesButtonClick = async () => {
    const resErrors = await dispatch(deleteComment(comment.id))
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
    <p>Are you sure you want to delete your comment?</p>
    <div>
      <p>Username: {comment.user.username}</p>
      <p>Comment: "{comment.text}"</p>
      <p>Create at: {comment.created_at}</p>
    </div>
    <div className="delete-modal-buttons">
      <button className="delete-button delete-yes hover-shadow" onClick={handleYesButtonClick}>Yes (Delete)</button>
      <button className="delete-button delete-no hover-shadow" onClick={handleNoButtonClick}>No (Cancel)</button>
    </div>
  </div>)
}

export default DeleteCommentModal