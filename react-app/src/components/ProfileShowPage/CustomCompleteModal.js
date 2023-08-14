import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { removeProfilePic } from "../../store/session";

const CustomCompleteModal = ({ modalTitle, completeText, returnText, seconds }) => {
  const { closeModal } = useModal();
  const [secondsLeft, setSecondsLeft] = useState(seconds);

  const handleDismiss = () => {
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
      closeModal();
    }
  }, [secondsLeft])


  return (<>
    <h1>{modalTitle}</h1>
    <p>{completeText}</p>
    <p>Returning to {returnText} in {secondsLeft}s</p>
    <button onClick={handleDismiss}>Dismiss</button>
  </>)
}

export default CustomCompleteModal