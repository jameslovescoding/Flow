import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import ProfilePageOpenModalButton from "./ProfilePageOpenModalButton"
import UploadProfilePicModal from "./UploadProfilePicModal";
import RemoveProfilePicModal from "./RemoveProfilePicModal";

const ProfileShowPage = () => {
  const user = useSelector(state => state.session.user);
  const [editMode, setEditMode] = useState(false);

  const handleToggleEditMode = () => {
    setEditMode(!editMode);
  }

  const closeEditMode = () => {
    console.log("close edit mode triggered")
    setEditMode(false)
    return "the close edit mode callback function got runned"
  }

  let userIcon;
  let isUsingDefaultUserIcon = false;
  if (!user) {
    userIcon = "https://static.vecteezy.com/system/resources/previews/002/318/271/large_2x/user-profile-icon-free-vector.jpg"
  } else if (!user.profile_pic_url) {
    isUsingDefaultUserIcon = true;
    userIcon = "https://t3.ftcdn.net/jpg/05/65/13/74/360_F_565137466_AnFDfYMQpA04vS4IFzTB6wDy3RnZo5Zc.jpg"
  } else {
    userIcon = user.profile_pic_url;
  }

  const editButtonTitle = editMode ? "Done Editing" : "Enter Edit Mode"

  const modalTitle = isUsingDefaultUserIcon ? "Upload Your Own Profile Picture" : "Replace Current Profile Picture"

  return (<>
    <h1>Profile Page</h1>
    <button onClick={handleToggleEditMode}>{editButtonTitle}</button>
    <div>
      <div>
        <h2>Your Profile Picture</h2>
        {editMode && (<>
          <ProfilePageOpenModalButton
            modalComponent={<UploadProfilePicModal modalTitle={modalTitle} />}
            buttonText={modalTitle}
            onModalClose={closeEditMode}
          />
          <ProfilePageOpenModalButton
            modalComponent={<RemoveProfilePicModal />}
            buttonText="Remove Current Profile Picture"
            onModalClose={closeEditMode}
            buttonDisable={isUsingDefaultUserIcon}
          />
        </>)}
        <div>
          <img src={userIcon} />
          {isUsingDefaultUserIcon && <p>This is default our profile picture. Upload your own in edit mode.</p>}
        </div>
      </div>
      <div>
        <h2>Your Account Info</h2>
        {editMode && (<>
          <ProfilePageOpenModalButton
            modalComponent={<h1>Edit Account Form</h1>}
            buttonText="Update Account Info"
            onModalClose={closeEditMode}
          />
        </>)}
        <p>User Name: {user.username}</p>
        <p>Registered Email: {user.email}</p>
        <p>Full Name: {user.firstname ? user.firstname : "??"} {user.lastname ? user.lastname : "??"}</p>
        <p>Bio: {user.bio ? user.bio : "??"}</p>
      </div>
    </div>
  </>)
}

export default ProfileShowPage