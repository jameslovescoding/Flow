import React, { useState } from "react";
import { useSelector } from "react-redux";
import UploadProfilePicModal from "./UploadProfilePicModal";
import RemoveProfilePicModal from "./RemoveProfilePicModal";
import UpdateAccountInfoModal from "./UpdateAccountInfoModal";
import OpenModalButton from "../OpenModalButton";
import "./ProfilePage.css";
import EditModeButton from "../EditModeButton";

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
  if (!user.profile_pic_url) {
    isUsingDefaultUserIcon = true;
    userIcon = "https://t3.ftcdn.net/jpg/05/65/13/74/360_F_565137466_AnFDfYMQpA04vS4IFzTB6wDy3RnZo5Zc.jpg"
  } else {
    userIcon = user.profile_pic_url;
  }

  const editButtonTitle = editMode ? "Done Editing" : "Edit Profile"

  const modalTitle = isUsingDefaultUserIcon ? "Upload Your Own Profile Picture" : "Replace Current Profile Picture"

  return (<>
    <div className="page-container-narrow profile-page-container">
      <h1 className="profile-page-heading">My Profile</h1>
      <EditModeButton
        buttonText={"Edit Mode"}
        onButtonClick={handleToggleEditMode}
        buttonState={editMode ? "on" : "off"}
        addedClassName={"profile-page-edit"}
      />
      <div className="profile-page-card">
        <div className="profile-page-left">
          <h3>Profile Picture</h3>
          <div className="user-icon-container-large">
            <img className="user-icon-img" src={userIcon} alt="user icon" />
          </div>
          {isUsingDefaultUserIcon && <p>(This is default profile picture)</p>}
          {editMode && (<div className="profile-page-picture-edit-section">
            <OpenModalButton
              modalComponent={<UploadProfilePicModal modalTitle={modalTitle} />}
              buttonText={(<>
                <i className="fa-solid fa-camera"></i><span> Upload</span>
              </>)}
              onModalClose={closeEditMode}
              addedClassName="hover-shadow"
            />
            <OpenModalButton
              modalComponent={<RemoveProfilePicModal />}
              buttonText={(<>
                <i className="fa-solid fa-trash"></i><span> Remove</span>
              </>)}
              onModalClose={closeEditMode}
              buttonDisable={isUsingDefaultUserIcon}
              addedClassName="hover-shadow"
            />
          </div>)}
        </div>
        <div className="profile-page-right">
          <h3>Account Information</h3>
          <h4>Username</h4>
          <p>{user.username}</p>
          <h4>Email</h4>
          <p>{user.email}</p>
          <h4>Full Name</h4>
          <p>{user.first_name ? user.first_name : "??"} {user.last_name ? user.last_name : "??"}</p>
          <h4>Bio</h4>
          <p>{user.bio ? user.bio : "??"}</p>
          {editMode && (<div className="profile-page-edit-button-container">
            <OpenModalButton
              modalComponent={<UpdateAccountInfoModal user={user} />}
              buttonText={(<>
                <i class="fa-solid fa-pen"></i><span> Edit</span>
              </>)}
              onModalClose={closeEditMode}
              addedClassName="hover-shadow profile-page-edit-button"
            />
          </div>)}
        </div>
      </div>
    </div>
  </>)
}

export default ProfileShowPage