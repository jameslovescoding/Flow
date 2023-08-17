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

  return (<>
    <h1>Update Metadata</h1>
    <p>You can update title, artirst, album of your song. You can also add extra Information to the metadata such as description, genre, release date.</p>
    <form onSubmit={handleSubmit}>
      <div>
        {errors.title && <p>Error: {errors.title}</p>}
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
        {errors.artist && <p>Error: {errors.artist}</p>}
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
        {errors.album && <p>Error: {errors.album}</p>}
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
        {errors.description && <p>Error: {errors.description}</p>}
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
        {errors.genre && <p>Error: {errors.genre}</p>}
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
        {errors.release_date && <p>Error: {errors.release_date}</p>}
        <label>
          Release Date
          <input
            type="date"
            value={release_date}
            onChange={(e) => setReleaseDate(e.target.value)}
          />
        </label>
      </div>
      <div>
        <p>Hints:</p>
        <p>A song must have title, artirst and album info</p>
        <p>Delete a data by setting it to empty</p>
      </div>
      <button disabled={submitDisable} type="submit">Update</button>
    </form>
    <button onClick={handleCancel}>Cancel</button>
  </>)
}

export default UpdateSongMetadataModal