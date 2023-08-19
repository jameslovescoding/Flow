import React, { useEffect, useState } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { updateAccountInfo } from "../../store/session";

const UpdateAccountInfoModal = ({ user }) => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState(user.first_name ? user.first_name : "");
  const [lastName, setLastName] = useState(user.last_name ? user.last_name : "");
  const [bio, setBio] = useState(user.bio ? user.bio : "");
  //const [submitDisable, setSubmitDisable] = useState(true);
  const [errors, setErrors] = useState({});
  const { closeModal, setModalContent } = useModal();
  const [counter, setCounter] = useState(user.bio ? user.bio.length : 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newInfo = {
      "first_name": firstName.length ? firstName : null,
      "last_name": lastName.length ? lastName : null,
      "bio": bio.length ? bio : null
    }
    const data = await dispatch(updateAccountInfo(newInfo, user.id))
    if (data) {
      console.log(data)
      setErrors(data);
    } else {
      closeModal();
    }
    console.log(newInfo)
  }

  const handleCancel = () => {
    closeModal()
  }

  // useEffect(() => {
  //   setSubmitDisable(!firstName.length && !lastName.length && !bio.length)
  // }, [firstName, lastName, bio])

  useEffect(() => {
    setCounter(bio.length);
  }, [bio])

  return (<div className="auth-modal-container">
    <h1>Update Information</h1>
    <form className="auth-modal-form" onSubmit={handleSubmit}>

      {errors.first_name && <p>Error: {errors.first_name}</p>}
      <div className="auth-modal-compact-grid">
        <label>
          First Name
        </label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder={"Please enter your first name"}
        />
      </div>

      {errors.last_name && <p>Error: {errors.last_name}</p>}
      <div className="auth-modal-compact-grid">
        <label>
          Last Name
        </label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder={"Please enter your last name"}
        />
      </div>

      {errors.bio && <p>Error: {errors.bio}</p>}
      <div className="auth-modal-compact-grid">
        <label>
          Bio
        </label>
        <div className="text-area-with-counter">
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Please enter your bio"
            maxlength={255}
            rows="8"
          />
          <p>{counter} / 255</p>
        </div>

      </div>

      <p>Hints: delete data of a field by leaving it empty.</p>
      <button className="auth-modal-form-button hover-shadow" type="submit">Update</button>
    </form>
    <button className="auth-modal-form-button upload-modal-form-cancel-button hover-shadow" onClick={handleCancel}>Cancel</button>
  </div>)
}

export default UpdateAccountInfoModal