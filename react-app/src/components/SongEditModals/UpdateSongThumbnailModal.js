import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { uploadNewThumbnail } from "../../store/song";
import CustomCompleteModal from "../CustomCompleteModal";
import CustomErrorModal from "../CustomErrorModal";
import FileUploader from "../FileUploader";

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

  const disableButton = image ? false : true;

  const cancelButtonText = isLoading ? "Uploading..." : "Cancel";

  return (<div className="upload-modal-container">
    <h1>{modalTitle}</h1>
    <form
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      className="upload-modal-form"
    >
      <FileUploader
        buttonText={(<>
          <i className="fa-solid fa-file-image fa-3x"></i><span>Upload Image</span>
        </>)}
        file={image}
        setFile={setImage}
        acceptFileTypes={"image/*"}
      />
      <p>Please provide image files with the following extensions: .pdf, .png, .jpg, .jpeg, gif</p>
      <button
        className="upload-modal-form-button hover-shadow"
        type="submit"
        disabled={disableButton}
      >
        Submit
      </button>
    </form>
    <button
      className="upload-modal-form-button upload-modal-form-cancel-button hover-shadow"
      onClick={handleCancel}
      disabled={isLoading}
    >
      {cancelButtonText}
    </button>
  </div>)
}

export default UpdateSongThumbnailModal