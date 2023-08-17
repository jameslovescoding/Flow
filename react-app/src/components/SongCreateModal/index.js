import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { uploadNewSong } from "../../store/song";
import CustomCompleteModal from "../CustomCompleteModal";
import CustomErrorModal from "../CustomErrorModal";
import { useModal } from "../../context/Modal";

function SongCreateModal({ initialValues }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [audio, setAudio] = useState(null);
  const [title, setTitle] = useState(initialValues.title);
  const [artist, setArtist] = useState(initialValues.artist);
  const [album, setAlbum] = useState(initialValues.album);
  const [submitDisable, setSubmitDisable] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const { closeModal, setModalContent, setOnModalClose } = useModal();


  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("song_file", audio);
    formData.append("title", title);
    formData.append("artist", artist);
    formData.append("album", album);
    setIsUploading(true);
    const newSong = await dispatch(uploadNewSong(formData));
    if (newSong.errors) {
      setIsUploading(false)

      const allErrors = Object.values(newSong.errors).join(". ");

      setModalContent(<CustomErrorModal
        modalTitle={"Errors"}
        errorMessage={allErrors}
        newModalContent={<SongCreateModal
          initialValues={{
            title: title,
            artist: artist,
            album: album,
          }} />}
      />)
    } else {
      setModalContent(<CustomCompleteModal
        modalTitle={"Upload Successful"}
        modalText={"You song has been successfully uploaded!"}
        actionText={"Redirect to new song's page"}
        seconds={4}
        redirectCallBack={() => history.push(`/song/${newSong.id}`)}
      />)
    }
    // history.push(`/song/${redirectSongId}`);
  }

  const handleCancel = () => {
    closeModal()
  }

  useEffect(() => {
    setSubmitDisable(!audio || !title.length || !artist.length || !album.length);
  }, [audio, title, artist, album])


  return (<>
    <h1>Upload and Share</h1>
    <p>To upload a song, please provide title, artist, album and the audio file.</p>
    <form
      onSubmit={handleSubmit}
      encType="multipart/form-data"
    >
      <div>
        <label>
          Title
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={"Please enter title of the song"}
          />
        </label>
      </div>
      <div>
        <label>
          Artist
          <input
            type="text"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            placeholder={"Please enter artist of the song"}
          />
        </label>
      </div>
      <div>
        <label>
          Album
          <input
            type="text"
            value={album}
            onChange={(e) => setAlbum(e.target.value)}
            placeholder={"Please enter album of the song"}
          />
        </label>
      </div>
      <div>
        <label>
          Audio File
          <input
            type="file"
            accept="audio/*"
            onChange={(e) => setAudio(e.target.files[0])}
            required
          />
        </label>
        <p>We support the following audio formats: .mp3, .wav, .aac, .wma, .flac</p>
      </div>
      <button disabled={submitDisable} type="submit">Upload</button>
      {isUploading && <p>Loading...</p>}
    </form>
    <button onClick={handleCancel}>Cancel</button>
  </>)
}

export default SongCreateModal