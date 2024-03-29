import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllComments } from "../../store/comment";
import CommentList from "../CommentList";

const ShowCommentSection = ({ song, user }) => {
  const dispatch = useDispatch();
  const [loadStatus, setLoadStatus] = useState("loading");
  const allComments = useSelector(state => state.comment.allComments);

  useEffect(async () => {
    if (song) {
      const errors = await dispatch(getAllComments(song.id))
      if (errors) {
        setLoadStatus("error");
      } else {
        setLoadStatus("done");
      }
    }
  }, [song])

  return (<>
    <h2>All Comments</h2>
    {loadStatus === "error" && <p>An error occurred</p>}
    {loadStatus === "done" && (<CommentList commentList={allComments} />)}
  </>)
}

export default ShowCommentSection;