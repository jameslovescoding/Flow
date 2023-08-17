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
      handleClear()
    }
  }

  const handleClear = () => {
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
        <p>Leave a comment</p>
        <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Leave your comment here"
          maxLength={255}
        />
        <p>{counter} / 255</p>
        <button disabled={submitDisable} type="submit">Send</button>
        <button onClick={handleClear}>Clear</button>
      </form>
    </div>
  </>)
}

export default PostCommentForm;