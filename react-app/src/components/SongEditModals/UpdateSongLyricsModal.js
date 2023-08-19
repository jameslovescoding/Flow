import React, { useEffect, useState } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { updateSongLyrics } from "../../store/song";

const UpdateSongLyricsModal = ({ currentLyrics, song }) => {
  const dispatch = useDispatch();
  const { closeModal, setModalContent } = useModal();
  const [lyrics, setLyrics] = useState(currentLyrics ? currentLyrics : "");
  const [counter, setCounter] = useState(currentLyrics ? currentLyrics.length : 0);

  // show errors
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      "lyrics": lyrics.length ? lyrics : null,
    };

    const data = await dispatch(updateSongLyrics(formData, song.id))
    if (data) {
      console.log(data)
      setErrors(data);
    } else {
      closeModal();
    }
  }

  const handleCancel = () => {
    closeModal()
  }

  useEffect(() => {
    setCounter(lyrics.length);
  }, [lyrics])

  return (<div className="auth-modal-container">
    <h1>Update Lyrics</h1>
    <form
      className="auth-modal-form"
      onSubmit={handleSubmit}>
      {errors.lyrics && <p>Error: {errors.lyrics}</p>}
      <label>
        Lyrics
      </label>
      <div className="text-area-with-counter">
        <textarea
          onChange={(e) => setLyrics(e.target.value)}
          placeholder={"Please enter the lyrics"}
          maxlength={2048}
          rows="8"
        >
          {lyrics}
        </textarea>
        <p>{counter} / 2048</p>
      </div>

      <p>Hints: Maximum length of lyrics is 2048. Delete lyrics by setting it to empty.</p>

      <button
        className="auth-modal-form-button hover-shadow"
        type="submit">Update</button>
    </form>
    <button
      className="auth-modal-form-button upload-modal-form-cancel-button hover-shadow"
      onClick={handleCancel}>Cancel</button>
  </div>)
}

export default UpdateSongLyricsModal