// frontend/src/components/Navigation/OpenModalMenuItem.js
import React from 'react';
import { useModal } from '../../context/Modal';

function ProfilePageOpenModalButton({
  modalComponent, // component to render inside the modal
  buttonText, // text of the menu item that opens the modal
  onButtonClick, // optional: callback function that will be called once the menu item that opens the modal is clicked
  onModalClose, // optional: callback function that will be called once the modal is closed
  buttonDisable = false
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (onModalClose) {
      setOnModalClose(() => onModalClose);
    }
    setModalContent(modalComponent);
    if (onButtonClick) {
      onButtonClick();
    }
  };

  return (
    <button disabled={buttonDisable} onClick={onClick}>{buttonText}</button>
  );
}

export default ProfilePageOpenModalButton;