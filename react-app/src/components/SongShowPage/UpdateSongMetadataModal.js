import React, { useEffect, useState } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { updateAccountInfo } from "../../store/session";

const UpdateSongMetadataModal = ({ metadata }) => {
  const dispatch = useDispatch();
  const { closeModal, setModalContent } = useModal();
  const [title, setTitle] = useState(metadata.title);
  const [artist, setArtist] = useState(metadata.artist);
  const [album, setAlbum] = useState(metadata.album);
  const [description, setDescription] = useState(metadata.description);
  const [genre, setGenre] = useState(metadata.genre);
  const [releaseDate, setReleaseDate] = useState(metadata.releaseDate);
  // disable the submit button
  const [submitDisable, setSubmitDisable] = useState(true);
  const [errors, setErrors] = useState({});


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

  useEffect(() => {
    setSubmitDisable(!title.length || !artist.length || !album.length)
  }, [title, artist, album])

  return (<>
    <h1>Update Metadata</h1>
    <p>You can update title, artirst, album of your song. You can also add extra Information to the metadata such as description, genre, release date.</p>
    <form onSubmit={handleSubmit}>
      <div>
        {errors.first_name && <p>Error: {errors.first_name}</p>}
        <label>
          Title
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={"Please enter the title of the song"}
          />
        </label>
      </div>
      <div>
        {errors.first_name && <p>Error: {errors.first_name}</p>}
        <label>
          Artist
          <input
            type="text"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            placeholder={"Please enter artist name"}
          />
        </label>
      </div>
      <div>
        {errors.first_name && <p>Error: {errors.first_name}</p>}
        <label>
          Album
          <input
            type="text"
            value={album}
            onChange={(e) => setAlbum(e.target.value)}
            placeholder={"Please enter album name"}
          />
        </label>
      </div>
      <div>
        {errors.first_name && <p>Error: {errors.first_name}</p>}
        <label>
          Description
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={"Please add a description for this song"}
          />
        </label>
      </div>
      <div>
        {errors.first_name && <p>Error: {errors.first_name}</p>}
        <label>
          Genre
          <input
            type="text"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            placeholder={"Please specify genre of this song"}
          />
        </label>
      </div>
      <div>
        {errors.first_name && <p>Error: {errors.first_name}</p>}
        <label>
          Release Date
          <input
            type="date"
            value={releaseDate}
            onChange={(e) => setReleaseDate(e.target.value)}
            placeholder={"Please add the release date of this song"}
          />
        </label>
      </div>
      <button disabled={submitDisable} type="submit">Update</button>
    </form>
    <button onClick={handleCancel}>Cancel</button>
  </>)
}

export default UpdateSongMetadataModal