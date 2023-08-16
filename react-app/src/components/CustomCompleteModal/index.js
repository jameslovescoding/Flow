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

  return (<>
    <h1>{modalTitle}</h1>
    <p>{modalText}</p>
    <p>{actionText} in {secondsLeft}s</p>
    <button onClick={handleDismiss}>Dismiss</button>
  </>)
}

export default CustomCompleteModal