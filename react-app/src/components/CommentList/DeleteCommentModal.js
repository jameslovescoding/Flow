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

  return (<>
    <h1>Confirm Delete</h1>
    <p>Are you sure you want to delete your comment?</p>
    <div>
      <p>{comment.user.username}:</p>
      <p>"{comment.text}"</p>
      <p>{comment.created_at}</p>
    </div>
    <div>
      <button onClick={handleYesButtonClick}>Yes (Delete)</button>
      <button onClick={handleNoButtonClick}>No (Cancel)</button>
    </div>
  </>)
}

export default DeleteCommentModal