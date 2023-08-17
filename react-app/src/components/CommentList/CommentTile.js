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

  return (<>

    <div className="user-icon-container-small">
      <img className="user-icon-img" src={userIcon} alt="user icon" />
    </div>
    <div>
      <p><i className="fa-solid fa-user"></i> {user.username}</p>
      <p><i className="fa-solid fa-clock"></i> {comment.created_at}</p>
      <p><i className="fa-solid fa-comment"></i> {comment.text}{commentEdited && <span> (edited)</span>}</p>
    </div>
    {showEditModeButton && <button onClick={handleToggleEditMode}><i className="fa-solid fa-square-caret-down"></i></button>}
    {editMode && (<>
      <OpenModalButton
        modalComponent={<EditCommentModal comment={comment} />}
        buttonText={"Edit Comment"}
        onModalClose={closeEditMode}
      />
      <OpenModalButton
        modalComponent={<DeleteCommentModal comment={comment} />}
        buttonText={"Delete Comment"}
        onModalClose={closeEditMode}
      />
    </>)}
  </>)
}

export default CommentTile;