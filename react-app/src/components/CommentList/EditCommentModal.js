import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { editComment } from "../../store/comment";

const EditCommentModal = ({ comment }) => {
  const dispatch = useDispatch();
  const [commentText, setCommentText] = useState(comment.text);
  const [counter, setCounter] = useState(comment.text.length);
  const [submitDisable, setSubmitDisable] = useState(false);
  const [errors, setErrors] = useState(null);
  const { closeModal, setModalContent, setOnModalClose } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newComment = {
      text: commentText,
    }
    const resErrors = await dispatch(editComment(newComment, comment.id));
    if (resErrors) {
      setErrors(errors);
    } else {
      closeModal();
    }
  }

  const handleCancel = () => {
    closeModal();
  }

  useEffect(() => {
    setCounter(commentText.length);
    setSubmitDisable(!commentText.length);
  }, [commentText])

  return (<div className="edit-comment-modal-container">
    <h2>Edit Your Comment</h2>
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Leave your comment here"
          maxlength={255}
          rows="5"
        />
        <p>{counter} / 255</p>
        <button className="hover-shadow" disabled={submitDisable} type="submit">Send</button>
      </form>
      <button className="hover-shadow" onClick={handleCancel}>Cancel</button>
    </div>
  </div>)
}

export default EditCommentModal;