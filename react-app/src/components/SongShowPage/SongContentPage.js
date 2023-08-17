import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import {
  UpdateSongLyricsModal,
  UpdateSongMetadataModal,
  UpdateSongThumbnailModal,
  ReplaceAudioFileModal,
  RemoveSongThumbnailModal,
  DeleteSongConfirmModal,
} from "../SongEditModals";
import OpenModalButton from "../OpenModalButton";
import PostCommentForm from "./PostCommentForm";
import ShowCommentSection from "./ShowCommentSection";

const SongContentPage = ({ song, user }) => {
  const [editMode, setEditMode] = useState(false);

  const handleToggleEditMode = () => {
    setEditMode(!editMode);
  }

  const closeEditMode = () => {
    setEditMode(false)
  }

  const dateConverter = (yyyymmdd) => {
    const [year, month, day] = yyyymmdd.split("-")
    return [month, day, year].join("-")
  }

  let thumbnail;
  let isUsingDefaultThumbnail = false;
  if (song.thumbnail_url) {
    thumbnail = song.thumbnail_url;
  } else {
    thumbnail = "https://s3.us-east-2.amazonaws.com/app-academy.capstone-project.sound-cloud-clone.flow/default-image-song-thumbnail.jpg";
    isUsingDefaultThumbnail = true;
  }
  const editButtonTitle = editMode ? "Done Editing" : "Enter Edit Mode";
  const enableEditMode = user.id === song.uploaded_by_user_id;
  const thumbnailEditModalTitle = isUsingDefaultThumbnail ? "Upload Thumbnail For This Song" : "Replace Thumbnail Fo This Song";

  return (<div className="page-container-wide">
    <h1>{song.title}</h1>
    {enableEditMode && <button onClick={handleToggleEditMode}>{editButtonTitle}</button>}
    <div>
      <h2>Thumbnail</h2>
      {editMode && (<>
        <OpenModalButton
          modalComponent={<UpdateSongThumbnailModal song={song} modalTitle={thumbnailEditModalTitle} />}
          buttonText={thumbnailEditModalTitle}
          onModalClose={closeEditMode}
        />
        <OpenModalButton
          modalComponent={<RemoveSongThumbnailModal song={song} />}
          buttonText="Remove Current Thumbnail"
          onModalClose={closeEditMode}
          buttonDisable={isUsingDefaultThumbnail}
        />
      </>)}
      <div className="song-thumbnail-container-large">
        <img className="song-thumbnail-img" src={thumbnail} alt={"song thumbnail"} />
      </div>
      {isUsingDefaultThumbnail && <p>(This is our default thumbnail placeholder. Upload your own thumbnail for your song in edit mode.)</p>}
    </div>
    <div>
      <h2>Metadata</h2>
      <div>
        {editMode && (<>
          <OpenModalButton
            modalComponent={<>
              <UpdateSongMetadataModal
                metadata={{
                  "title": song.title,
                  "artist": song.artist,
                  "album": song.album,
                  "description": song.description,
                  "genre": song.genre,
                  "release_date": song.release_date,
                }}
                song={song}
              />
            </>}
            buttonText={"Update Metadata"}
            onModalClose={closeEditMode}
          />
        </>)}
      </div>
      <div>
        <p>Title: {song.title}</p>
        <p>Artist: {song.artist}</p>
        <p>Album: {song.album}</p>
        <p>Description: {song.description ? song.description : "??"}</p>
        <p>Genre: {song.genre ? song.genre : "??"}</p>
        <p>Release Date: {song.release_date ? dateConverter(song.release_date) : "??"}</p>
      </div>
    </div>
    <div>
      <h2>Lyrics</h2>
      <div>
        {editMode && (<>
          <OpenModalButton
            modalComponent={< UpdateSongLyricsModal currentLyrics={song.lyrics} song={song} />}
            buttonText={"Update Lyrics"}
            onModalClose={closeEditMode}
          />
        </>)}
      </div>
      <div>
        <p>{song.lyrics ? song.lyrics : "(empty)"}</p>
      </div>
    </div>
    <div>
      <h2>Audio</h2>
      {editMode && (<>
        <OpenModalButton
          modalComponent={<ReplaceAudioFileModal song={song} />}
          buttonText={"Replace Audio File"}
          onModalClose={closeEditMode}
        />
      </>)}
      <p>Duration</p>
      <p>File Size</p>
      <p>Uploaded on: {song.created_at}</p>
      <p>Uploaded by user with id {song.uploaded_by_user_id}</p>
      <p>Download Link: {song.s3_key}</p>
    </div>
    {editMode && (<>
      <div>
        <h2>Dangerous Zone</h2>
        <p>This section is for deleting the song. This operation is irreversible and will delete all comments and likes associated with it as well.</p>
        <OpenModalButton
          modalComponent={< DeleteSongConfirmModal song={song} />}
          buttonText={"Permanently Delete This Song"}
          onModalClose={closeEditMode}
        />
      </div>
    </>)}
    <div>
      <PostCommentForm song={song} user={user} />
      <ShowCommentSection song={song} user={user} />
    </div>
  </div>)
}

export default SongContentPage;