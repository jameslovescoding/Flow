import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { uploadProfilePic } from "../../store/session";

const UploadProfilePicModal = ({ modalTitle }) => {
  const history = useHistory(); // so that you can redirect after the image upload is successful
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const { closeModal, setModalContent } = useModal();
  const sessionUser = useSelector(state => state.session.user);
  const [errors, setErrors] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("profile_pic_file", image);

    // aws uploads can be a bit slow—displaying
    // some sort of loading message is a good idea
    setImageLoading(true);
    const errors = await dispatch(uploadProfilePic(formData, sessionUser.id));
    if (errors) {
      setImageLoading(false)
      setErrors(errors);
    } else {
      closeModal();
    }
  }

  return (<>
    <h1>{modalTitle}</h1>
    <form
      onSubmit={handleSubmit}
      encType="multipart/form-data"
    >
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
      />
      <button type="submit">Submit</button>
      {(imageLoading) && <p>Loading...</p>}
      {errors && <p>{errors}</p>}
    </form>
  </>)
}

export default UploadProfilePicModal