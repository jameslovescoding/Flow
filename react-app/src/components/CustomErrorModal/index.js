import React, { useState, useEffect } from "react";
import { useModal } from "../../context/Modal";


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