import React, { useState, useEffect } from "react";
import { useModal } from "../../context/Modal";


const CustomCompleteModal = ({ modalTitle, modalText, actionText, seconds, redirectCallBack }) => {
  const { closeModal } = useModal();
  const [secondsLeft, setSecondsLeft] = useState(seconds);

  const handleDismiss = () => {
    if (redirectCallBack) {
      redirectCallBack();
    }
    closeModal();
  }

  useEffect(() => {
    if (secondsLeft > 0) {
      const timer = setTimeout(() => {
        console.log(secondsLeft)
        setSecondsLeft(secondsLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      if (redirectCallBack) {
        redirectCallBack();
      }
      closeModal();
    }
  }, [secondsLeft])

  return (<div className="custom-complete-container">
    <h1>{modalTitle}</h1>
    <p>{modalText}</p>
    <p>{actionText} in <span>{secondsLeft}</span> s</p>
    <button className="hover-shadow custom-complete-button-dismiss" onClick={handleDismiss}>Dismiss</button>
  </div>)
}

export default CustomCompleteModal