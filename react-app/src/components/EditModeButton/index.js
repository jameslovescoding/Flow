import React, { useState } from "react";
import "./EditModeButton.css";

const EditModeButton = ({
  buttonText,
  onButtonClick,
  buttonDisable = false,
  buttonState,
}) => {

  const onClick = () => {
    if (onButtonClick) onButtonClick();
  };

  return (<>
    <div className="edit-mode-button-assembly">
      <p>{buttonText} ({buttonState})</p>
      <button className="edit-mode-button-capsule" value={buttonState} disabled={buttonDisable} onClick={onClick}>
        <div className="edit-mode-button-circle" value={buttonState}>
        </div>
      </button>
    </div>
  </>)
}

export default EditModeButton;