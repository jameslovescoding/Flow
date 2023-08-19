import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { replaceSongAudioFile } from "../../store/song";
import CustomCompleteModal from "../CustomCompleteModal";
import CustomErrorModal from "../CustomErrorModal";
import { useModal } from "../../context/Modal";
import FileUploader from "../FileUploader";


const ReplaceAudioFileModal = ({ song }) => {
  const dispatch = useDispatch();
  const [audio, setAudio] = useState(null);
  const [submitDisable, setSubmitDisable] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const { closeModal, setModalContent, setOnModalClose } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("song_file", audio);
    setIsUploading(true);
    const data = await dispatch(replaceSongAudioFile(formData, song.id));
    if (data) {
      setIsUploading(false)

      const allErrors = Object.values(data).join(". ");

      setModalContent(<CustomErrorModal
        modalTitle={"Errors"}
        errorMessage={allErrors}
        newModalContent={<ReplaceAudioFileModal song={song} />}
      />)
    } else {
      setModalContent(<CustomCompleteModal
        modalTitle={"Upload Successful"}
        modalText={"You have successfully replaced audio file!"}
        actionText={"return to current song's page"}
        seconds={4}
      />)
    }
  }

  const handleCancel = () => {
    closeModal()
  }

  useEffect(() => {
    setSubmitDisable(!audio);
  }, [audio])

  const disableButton = audio ? false : true;

  const cancelButtonText = isUploading ? "Uploading..." : "Cancel";

  return (<>
    <h1>Replace Audio File For "{song.title}"</h1>
    <form
      onSubmit={handleSubmit}
      encType="multipart/form-data"
    >

      <FileUploader
        buttonText={(<>
          <i className="fa-solid fa-file-audio fa-3x"></i><span>Upload Audio</span>
        </>)}
        file={audio}
        setFile={setAudio}
        acceptFileTypes={"audio/*"}
      />
      <p>We support the following audio formats: .mp3, .wav, .aac, .wma, .flac</p>
      <button
        className="upload-modal-form-button hover-shadow"
        disabled={submitDisable}
        type="submit">Upload</button>
    </form>
    <button
      className="upload-modal-form-button upload-modal-form-cancel-button hover-shadow"
      onClick={handleCancel}
      disabled={isUploading}>{cancelButtonText}</button>
  </>)
}

export default ReplaceAudioFileModal