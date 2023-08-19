import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import DeleteCommentModal from "./DeleteCommentModal";
import EditCommentModal from "./EditCommentModal";


const CommentTile = ({ comment }) => {
  const sessionUser = useSelector(state => state.session.user);
  const [editMode, setEditMode] = useState(false);

  const handleToggleEditMode = () => {
    setEditMode(!editMode);
  }

  const closeEditMode = () => {
    setEditMode(false)
  }

  const user = comment.user;

  let userIcon;
  let isUsingDefaultUserIcon = false;
  if (!user.profile_pic_url) {
    isUsingDefaultUserIcon = true;
    userIcon = "https://t3.ftcdn.net/jpg/05/65/13/74/360_F_565137466_AnFDfYMQpA04vS4IFzTB6wDy3RnZo5Zc.jpg"
  } else {
    userIcon = user.profile_pic_url;
  }
  const commentEdited = comment.created_at !== comment.updated_at;
  const showEditModeButton = comment.user_id === sessionUser.id;

  return (<div className="comment-tile-container">

    <div className="user-icon-container-small comment-tile-icon">
      <img className="user-icon-img" src={userIcon} alt="user icon" />
    </div>
    <p className="comment-tile-username"><i className="fa-solid fa-user"></i> {user.username}</p>
    <p className="comment-tile-timestamp">{comment.created_at}</p>
    <p className="comment-tile-text">{comment.text}{commentEdited && <span> (edited)</span>}</p>
    {showEditModeButton && <button className="comment-tile-edit hover-shadow" onClick={handleToggleEditMode}><i className="fa-solid fa-square-caret-down"></i></button>}
    {editMode && (<div className="comment-tile-edit-button-section">
      <OpenModalButton
        modalComponent={<EditCommentModal comment={comment} />}
        buttonText={"Edit"}
        onModalClose={closeEditMode}
        addedClassName={"hover-shadow"}
      />
      <OpenModalButton
        modalComponent={<DeleteCommentModal comment={comment} />}
        buttonText={"Delete"}
        onModalClose={closeEditMode}
        addedClassName={"hover-shadow"}
      />
    </div>)}
  </div>)
}

export default CommentTile;