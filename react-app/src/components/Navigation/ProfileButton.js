// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import * as sessionActions from '../../store/session';
import './Navigation.css';
import ProfileDropdownModalButton from './ProfileDropdownModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    // if showMenu is true, nothing happens
    if (showMenu) return;
    // if showMenu is false, set showMenu to true
    setShowMenu(true);
  };

  // when showMenu status changes
  useEffect(() => {
    //console.log('show menu triggered', showMenu);
    // if showMenu is false, do nothing
    if (!showMenu) return;
    // if showMenu is true, add event listener to whole document
    const closeMenu = (e) => {
      // check if the click comes from outside of the icon
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    // when click, set showMenu to false
    document.addEventListener('click', closeMenu);
    // return a clean up function for the event listener
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  // handleLogout
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push(`/`);
    closeMenu();
  };

  const handleProfilePage = (e) => {
    e.preventDefault();
    history.push(`/profile`);
    closeMenu();
  }

  const handleCollectionPage = (e) => {
    e.preventDefault();
    history.push(`/collection`);
    closeMenu();
  }

  const handleActivityPage = (e) => {
    e.preventDefault();
    history.push(`/activity`);
    closeMenu();
  }

  // use .hidden class and display: none in css to hide the ul
  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  // <i id="profile-button-user-icon" class="fa-regular fa-circle-user"></i>
  // <i className="profile-button-menu-icon" class="fa-solid fa-bars"></i>
  let userIcon;
  if (!user) {
    userIcon = "https://static.vecteezy.com/system/resources/previews/002/318/271/large_2x/user-profile-icon-free-vector.jpg"
  } else if (!user.profile_pic_url) {
    userIcon = "https://t3.ftcdn.net/jpg/05/65/13/74/360_F_565137466_AnFDfYMQpA04vS4IFzTB6wDy3RnZo5Zc.jpg"
  } else {
    userIcon = user.profile_pic_url
  }

  return (
    <div>
      <button className="profile-button" onClick={openMenu}>
        <div className="profile-btn-flex">
          <i className="profile-btn-menu-icon fa-solid fa-bars"></i>
          <div className="profile-btn-round-icon">
            <img src={userIcon} />
          </div>
        </div>
      </button>
      {user ? (
        <div className={ulClassName} ref={ulRef}>
          <div className="profile-dropdown-user-info">
            <p>Hello, {user.username}</p>
            <p>{user.email}</p>
          </div>
          <hr />
          <div className="profile-dropdown-buttons">
            <button className="profile-dropdown-button hover-outline" onClick={handleProfilePage}>Profile</button>
            <button className="profile-dropdown-button hover-outline" onClick={handleCollectionPage}>Collection</button>
            <button className="profile-dropdown-button hover-outline" onClick={handleActivityPage}>Activity</button>
            <button className="log-out-button hover-shadow" onClick={handleLogout}>Log Out</button>
          </div>
        </div>
      ) : (
        <div className={ulClassName} ref={ulRef}>
          <ProfileDropdownModalButton
            itemText="Log In"
            onItemClick={closeMenu}
            modalComponent={<LoginFormModal />}
          />
          <hr></hr>
          <ProfileDropdownModalButton
            itemText="Sign Up"
            onItemClick={closeMenu}
            modalComponent={<SignupFormModal />}
          />
        </div>
      )}
    </div>
  );
}

export default ProfileButton;