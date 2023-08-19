import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { createCommentForSong } from "../../store/comment";


const PostCommentForm = ({ song, user }) => {
  const dispatch = useDispatch();
  const [commentText, setCommentText] = useState("");
  const [counter, setCounter] = useState(0);
  const [submitDisable, setSubmitDisable] = useState(true);
  const [errors, setErrors] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(commentText)
    const formData = {
      "text": commentText,
    }
    const resErrors = await dispatch(createCommentForSong(formData, song.id));
    if (resErrors) {
      setErrors(Object.values(resErrors).join(". "));
    } else {
      setCommentText("")
    }
  }

  const handleClear = (e) => {
    e.preventDefault();
    setCommentText("")
  }

  useEffect(() => {
    setCounter(commentText.length);
    setSubmitDisable(!commentText.length);
  }, [commentText])

  return (<>
    <h2>Leave your comment here</h2>
    {errors && <p>{errors}</p>}
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Leave your comment here"
          maxLength={255}
          rows="4"
        />
        <div className="post-comment-counter-container">
          <p>{counter} / 255</p>
          <div className="post-comment-buttons">
            <button disabled={submitDisable} type="submit">Send</button>
            <button onClick={handleClear} type="clear">Clear</button>
          </div>
        </div>
      </form>

    </div>
  </>)
}

export default PostCommentForm;