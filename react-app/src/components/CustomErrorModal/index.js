import React from "react";
import { useModal } from "../../context/Modal";


const CustomErrorModal = ({ modalTitle, errorMessage, newModalContent }) => {
  const { closeModal, setModalContent, setOnModalClose } = useModal();

  const handleDismiss = () => {
    closeModal();
  }

  const handleTryAgain = () => {
    setModalContent(newModalContent)
  }

  return (<div className="custom-complete-container">
    <h1>{modalTitle}</h1>
    <p>{errorMessage}</p>
    <div>
      <button className="custom-complete-button-try-again hover-shadow" onClick={handleTryAgain}>Try again</button>
      <button className="custom-complete-button-dismiss hover-shadow" onClick={handleDismiss}>Dismiss</button>
    </div>
  </div>)
}

export default CustomErrorModal