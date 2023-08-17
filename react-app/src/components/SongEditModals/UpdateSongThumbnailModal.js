import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { uploadNewThumbnail } from "../../store/song";
import CustomCompleteModal from "../CustomCompleteModal";
import CustomErrorModal from "../CustomErrorModal";

const UpdateSongThumbnailModal = ({ song, modalTitle }) => {
  const history = useHistory(); // so that you can redirect after the image upload is successful
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { closeModal, setModalContent } = useModal();
  const sessionUser = useSelector(state => state.session.user);
  const [errors, setErrors] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("thumbnail_file", image);

    // aws uploads can be a bit slow—displaying
    // some sort of loading message is a good idea
    setIsLoading(true);
    const resErrors = await dispatch(uploadNewThumbnail(formData, song.id));
    if (resErrors) {
      setIsLoading(false)

      const allErrors = Object.values(resErrors).join(". ");

      setModalContent(<CustomErrorModal
        modalTitle={"Errors"}
        errorMessage={allErrors}
        newModalContent={<UpdateSongThumbnailModal song={song} modalTitle={modalTitle} />}
      />)
    } else {
      setModalContent(<CustomCompleteModal
        modalTitle={"Upload Successful"}
        modalText={"The thumbnail picture has been successfully uploaded!"}
        actionText={"Return to current song page"}
        seconds={4}
      />)
    }
  }

  const handleCancel = () => {
    closeModal()
  }

  return (<>
    <h1>{modalTitle}</h1>
    <form
      onSubmit={handleSubmit}
      encType="multipart/form-data"
    >
      <div>
        <label>
          Image File
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
        </label>
      </div>
      <p>Please provide image files with the following extensions: .pdf, .png, .jpg, .jpeg, gif</p>
      <button type="submit">Submit</button>
      {(isLoading) && <p>Loading...</p>}
    </form>
    <button onClick={handleCancel}>Cancel</button>
  </>)
}

export default UpdateSongThumbnailModal