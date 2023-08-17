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

  return (<>
    <h1>Update Account Information</h1>
    <p>You can update your first name, last name and bio here!</p>
    <form onSubmit={handleSubmit}>
      <div>
        {errors.first_name && <p>Error: {errors.first_name}</p>}
        <label>
          First Name
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder={"Please enter your first name"}
          />
        </label>
      </div>
      <div>
        {errors.last_name && <p>Error: {errors.last_name}</p>}
        <label>
          Last Name
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder={"Please enter your bio"}
          />
        </label>
      </div>
      <div>
        {errors.bio && <p>Error: {errors.bio}</p>}
        <label>
          Bio
          <input
            type="text"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder={"Please enter your last name"}
          />
        </label>
      </div>
      <button type="submit">Update</button>
    </form>
    <button onClick={handleCancel}>Cancel</button>
  </>)
}

export default UpdateAccountInfoModal