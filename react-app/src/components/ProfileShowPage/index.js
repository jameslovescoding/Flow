import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UploadProfilePicModal from "./UploadProfilePicModal";
import RemoveProfilePicModal from "./RemoveProfilePicModal";
import UpdateAccountInfoModal from "./UpdateAccountInfoModal";
import OpenModalButton from "../OpenModalButton";
import "./ProfilePage.css";

const ProfileShowPage = () => {
  const user = useSelector(state => state.session.user);
  const [editMode, setEditMode] = useState(false);

  const handleToggleEditMode = () => {
    setEditMode(!editMode);
  }

  const closeEditMode = () => {
    setEditMode(false)
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
    <div className="page-container-narrow">
      <h1>Profile Page</h1>
      <button onClick={handleToggleEditMode}>{editButtonTitle}</button>
      <div>
        <div>
          <h2>Your Profile Picture</h2>
          {editMode && (<>
            <OpenModalButton
              modalComponent={<UploadProfilePicModal modalTitle={modalTitle} />}
              buttonText={modalTitle}
              onModalClose={closeEditMode}
            />
            <OpenModalButton
              modalComponent={<RemoveProfilePicModal />}
              buttonText="Remove Current Profile Picture"
              onModalClose={closeEditMode}
              buttonDisable={isUsingDefaultUserIcon}
            />
          </>)}
          <div className="user-icon-container-large">
            <img className="user-icon-img" src={userIcon} alt="user icon" />
          </div>
          {isUsingDefaultUserIcon && <p>(This is default our profile picture. Upload your own in edit mode.)</p>}
        </div>
        <div>
          <h2>Your Account Information</h2>
          {editMode && (<>
            <OpenModalButton
              modalComponent={<UpdateAccountInfoModal user={user} />}
              buttonText="Update Account Information"
              onModalClose={closeEditMode}
            />
          </>)}
          <p>User Name: {user.username}</p>
          <p>Registered Email: {user.email}</p>
          <p>Full Name: {user.first_name ? user.first_name : "??"} {user.last_name ? user.last_name : "??"}</p>
          <p>Bio: {user.bio ? user.bio : "??"}</p>
        </div>
      </div>
    </div>
  </>)
}

export default ProfileShowPage