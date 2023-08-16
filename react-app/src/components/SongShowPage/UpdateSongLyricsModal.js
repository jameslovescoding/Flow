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

  return (<>
    <h1>Update Metadata</h1>
    <p>You can update title, artirst, album of your song. You can also add extra Information to the metadata such as description, genre, release date.</p>
    <form onSubmit={handleSubmit}>
      <div>
        {errors.lyrics && <p>Error: {errors.lyrics}</p>}
        <label>
          Title
          <textarea
            onChange={(e) => setLyrics(e.target.value)}
            placeholder={"Please enter the lyrics"}
            maxlength={2048}
          >
            {lyrics}
          </textarea>
          <p>{counter} / 2048</p>
        </label>
      </div>
      <div>
        <p>Hints:</p>
        <p>Maximum length of lyrics is 2048</p>
        <p>Delete lyrics by setting it to empty</p>
      </div>
      <button type="submit">Update</button>
    </form>
    <button onClick={handleCancel}>Cancel</button>
  </>)
}

export default UpdateSongLyricsModal