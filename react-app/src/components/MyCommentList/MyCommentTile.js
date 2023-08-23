import React, { useState } from "react";
import { useSelector } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import DeleteCommentModal from "./DeleteCommentModal";
import EditCommentModal from "./EditCommentModal";


const MyCommentTile = ({ comment }) => {
  const sessionUser = useSelector(state => state.session.user);
  const [editMode, setEditMode] = useState(false);

  const handleToggleEditMode = () => {
    setEditMode(!editMode);
  }

  const closeEditMode = () => {
    setEditMode(false)
  }

  const user = comment.user;

  const song = comment.song;

  let thumbnail;
  let isUsingDefaultThumbnail = false;
  if (song.thumbnail_url) {
    thumbnail = song.thumbnail_url;
  } else {
    thumbnail = "https://s3.us-east-2.amazonaws.com/app-academy.capstone-project.sound-cloud-clone.flow/default-image-song-thumbnail.jpg";
    isUsingDefaultThumbnail = true;
  }

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

  return (<div className="my-comment-tile-container">

    <div className="song-thumbnail-container-small my-comment-tile-icon">
      <img className="song-thumbnail-img" src={thumbnail} alt="thumbnail icon" />
    </div>
    <div className="my-comment-tile-song-meta">
      <h3>Title: {song.title}</h3>
      <p>Artist: {song.artist}</p>
      <p>Album: {song.album}</p>
    </div>
    <div className="my-comment-tile-comment-content">

      <p className="my-comment-tile-text">"{comment.text}"{commentEdited && <span> (edited)</span>}</p>
      <p className="my-comment-tile-timestamp">Created At: {comment.created_at}</p>
    </div>
    {showEditModeButton && <button className="my-comment-tile-edit hover-shadow" onClick={handleToggleEditMode}><i className="fa-solid fa-square-caret-down"></i></button>}
    {editMode && (<div className="my-comment-tile-edit-button-section">
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

export default MyCommentTile;