import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { getMyComments } from "../../store/comment";
import MyCommentList from "../MyCommentList";

function ActivityPage() {
  const dispatch = useDispatch();
  const [loadStatus, setLoadStatus] = useState("loading");
  const allComments = useSelector(state => state.comment.allComments);

  useEffect(async () => {
    const errors = await dispatch(getMyComments())
    if (errors) {
      setLoadStatus("error");
    } else {
      setLoadStatus("done");
    }
  }, [])

  return (<div className="page-container-narrow">
    <h1>Activity Page</h1>
    <h2>My Comments</h2>
    {loadStatus === "error" && <p>An error occurred</p>}
    {loadStatus === "done" && (<MyCommentList commentList={allComments} />)}
  </div>)
}

export default ActivityPage