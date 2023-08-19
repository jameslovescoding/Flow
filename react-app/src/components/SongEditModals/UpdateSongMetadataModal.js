import React, { useEffect, useState } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { updateSongMetadata } from "../../store/song";

const UpdateSongMetadataModal = ({ metadata, song }) => {
  const dispatch = useDispatch();
  const { closeModal, setModalContent } = useModal();
  const [title, setTitle] = useState(metadata.title);
  const [artist, setArtist] = useState(metadata.artist);
  const [album, setAlbum] = useState(metadata.album);
  const [description, setDescription] = useState(metadata.description ? metadata.description : "");
  const [genre, setGenre] = useState(metadata.genre ? metadata.genre : "");
  const [release_date, setReleaseDate] = useState(metadata.release_date);
  // disable the submit button
  const [submitDisable, setSubmitDisable] = useState(true);
  // show errors
  const [errors, setErrors] = useState({});


  const handleSubmit = async (e) => {
    e.preventDefault();

    const newMetadata = {
      "title": title,
      "artist": artist,
      "album": album,
      "description": description.length ? description : null,
      "genre": genre.length ? genre : null,
      "release_date": release_date.length ? release_date : "",
    };

    console.log("newMetadata", newMetadata);
    const data = await dispatch(updateSongMetadata(newMetadata, song.id))
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

  // check form to enable the submit button
  useEffect(() => {
    // If any of these field is empty, disable the submit button
    setSubmitDisable(!title.length || !artist.length || !album.length)
  }, [title, artist, album])

  return (<div className="auth-modal-container">
    <h1>Update Metadata</h1>
    <form
      className="update-song-meta-modal-form"
      onSubmit={handleSubmit}>
      {errors.title && <p>Error: {errors.title}</p>}
      <div className="update-song-meta-modal-compact-grid">
        <label>
          Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={"Please enter the title of the song"}
        />
      </div>
      {errors.artist && <p>Error: {errors.artist}</p>}
      <div className="update-song-meta-modal-compact-grid">
        <label>
          Artist
        </label>
        <input
          type="text"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
          placeholder={"Please enter artist name"}
        />
      </div>
      {errors.album && <p>Error: {errors.album}</p>}
      <div className="update-song-meta-modal-compact-grid">
        <label>
          Album
        </label>
        <input
          type="text"
          value={album}
          onChange={(e) => setAlbum(e.target.value)}
          placeholder={"Please enter album name"}
        />
      </div>
      {errors.description && <p>Error: {errors.description}</p>}
      <div className="update-song-meta-modal-compact-grid">
        <label>
          Description
        </label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder={"Please add a description for this song"}
        />
      </div>
      {errors.genre && <p>Error: {errors.genre}</p>}
      <div className="update-song-meta-modal-compact-grid">
        <label>
          Genre
        </label>
        <input
          type="text"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          placeholder={"Please specify genre of this song"}
        />
      </div>
      {errors.release_date && <p>Error: {errors.release_date}</p>}
      <div className="update-song-meta-modal-compact-grid">
        <label>
          Release Date
        </label>
        <input
          type="date"
          value={release_date}
          onChange={(e) => setReleaseDate(e.target.value)}
        />
      </div>
      <p>Hints: A song must have title, artirst and album info. Delete a data by setting it to empty</p>
      <button
        className="update-song-meta-modal-form-button hover-shadow"
        disabled={submitDisable} type="submit">Update</button>
    </form>
    <button
      className="update-song-meta-modal-form-button upload-modal-form-cancel-button hover-shadow"
      onClick={handleCancel}>Cancel</button>
  </div>)
}

export default UpdateSongMetadataModal