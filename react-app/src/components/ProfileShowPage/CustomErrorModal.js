import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { removeProfilePic } from "../../store/session";

const CustomErrorModal = ({ modalTitle, errorMessage, newModalContent }) => {
  const { closeModal, setModalContent, setOnModalClose } = useModal();

  const handleDismiss = () => {
    closeModal();
  }

  const handleTryAgain = () => {
    setModalContent(newModalContent)
  }

  return (<>
    <h1>{modalTitle}</h1>
    <p>{errorMessage}</p>
    <div>
      <button onClick={handleTryAgain}>Try again</button>
      <button onClick={handleDismiss}>Dismiss</button>
    </div>
  </>)
}

export default CustomErrorModal