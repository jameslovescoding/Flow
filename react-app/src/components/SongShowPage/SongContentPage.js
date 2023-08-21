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
import EditModeButton from "../EditModeButton";
import "./SongContentPage.css";
import MyAudioPlayer from "./AudioPlayer";

const SongContentPage = ({ song, user }) => {
  const [editMode, setEditMode] = useState(false);
  const [play, setPlay] = useState(false);

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

  const togglePlayPause = () => {
    setPlay(!play);
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
  const thumbnailEditModalTitle = isUsingDefaultThumbnail ? "Upload Thumbnail Picture" : "Replace Thumbnail Picture";

  return (<div className="page-container-wide">
    <div className="song-content-banner-container">
      <div className="song-content-banner">
        {/* title */}
        <div className="song-content-banner-title">
          <h1>{song.title}</h1>
        </div>
        {
          enableEditMode && <div className="song-content-banner-edit-button">
            <EditModeButton
              buttonText={"Edit Mode"}
              onButtonClick={handleToggleEditMode}
              buttonState={editMode ? "on" : "off"}
            />
          </div>
        }

        {/* thumbnail */}
        <div className="song-content-banner-thumbnail">
          <div className="song-thumbnail-container-large ">
            <img className="song-thumbnail-img" src={thumbnail} alt={"song thumbnail"} />
          </div>
          <div className="song-content-banner-thumbnail-edit-section">
            {editMode && (<>
              <OpenModalButton
                modalComponent={<UpdateSongThumbnailModal song={song} modalTitle={thumbnailEditModalTitle} />}
                onModalClose={closeEditMode}
                buttonText={(<>
                  <i className="fa-solid fa-camera"></i><span> Upload</span>
                </>)}
                addedClassName="hover-shadow"
              />
              <OpenModalButton
                modalComponent={<RemoveSongThumbnailModal song={song} />}
                buttonText={(<>
                  <i className="fa-solid fa-trash"></i><span> Remove</span>
                </>)}
                onModalClose={closeEditMode}
                buttonDisable={isUsingDefaultThumbnail}
                addedClassName="hover-shadow"
              />
            </>)}
          </div>
        </div>
        {/*meta*/}
        <div className="song-content-banner-meta">
          <h2>Metadata</h2>
          <p>Title: {song.title}</p>
          <p>Artist: {song.artist}</p>
          <p>Album: {song.album}</p>
          <p>Genre: {song.genre ? song.genre : "??"}</p>
          <p>Release Date: {song.release_date ? dateConverter(song.release_date) : "??"}</p>
          <p>Description: {song.description ? song.description : "??"}</p>
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
              buttonText={(<>
                <i class="fa-solid fa-pen"></i><span> Edit Metadata</span>
              </>)}
              onModalClose={closeEditMode}
              addedClassName="hover-shadow song-content-banner-edit-meta-button"
            />
          </>)}
        </div>
        {/* control-panels */}
        <div className="control-panels">
          <MyAudioPlayer url={song.s3_key} />
        </div>
        {/* other */}
        <div className="song-content-banner-other">
          <div className="song-content-banner-lyrics">
            <h2>Lyrics</h2>
            <div>
              <p>{song.lyrics ? song.lyrics : "(empty)"}</p>
            </div>
            <div>
              {editMode && (<>
                <OpenModalButton
                  modalComponent={< UpdateSongLyricsModal currentLyrics={song.lyrics} song={song} />}
                  buttonText={(<>
                    <i class="fa-solid fa-pen"></i><span> Update Lyrics</span>
                  </>)}
                  onModalClose={closeEditMode}
                  addedClassName="hover-shadow song-content-banner-edit-lyrics-button"
                />
              </>)}
            </div>
          </div>
          {editMode && (<>
            <div className="song-content-edit-audio">
              <h2>Audio File</h2>
              {editMode && (<>
                <OpenModalButton
                  modalComponent={<ReplaceAudioFileModal song={song} />}
                  buttonText={<>
                    <i className="fa-solid fa-upload"></i><span> Re-upload</span>
                  </>}
                  onModalClose={closeEditMode}
                  addedClassName="hover-shadow"
                />
              </>)}
              <p>Uploaded on: {song.created_at}</p>
              <p>Download Link: <a href={song.s3_key}>{song.title}</a></p>
            </div>
            <div className="song-content-edit-delete">
              <h2>Dangerous Zone</h2>
              <OpenModalButton
                modalComponent={< DeleteSongConfirmModal song={song} />}
                buttonText={<>
                  <i className="fa-solid fa-trash"></i><span> Delete Song</span>
                </>}
                onModalClose={closeEditMode}
                addedClassName="hover-shadow"
              />
              <p>This operation is irreversible and will delete all comments and likes associated with it as well.</p>
            </div>
          </>)}

        </div>
        {/* comments */}
        <div className="song-content-banner-comments">
          <PostCommentForm song={song} user={user} />
          <ShowCommentSection song={song} user={user} />
        </div>
      </div>


    </div>


  </div>)
}

export default SongContentPage;

/**
  <div>
      {editMode && (<>
        <OpenModalButton
          modalComponent={<UpdateSongThumbnailModal song={song} modalTitle={thumbnailEditModalTitle} />}
          onModalClose={closeEditMode}
          buttonText={(<>
            <i className="fa-solid fa-camera"></i><span> Upload</span>
          </>)}
          addedClassName="hover-shadow"
        />
        <OpenModalButton
          modalComponent={<RemoveSongThumbnailModal song={song} />}
          buttonText={(<>
            <i className="fa-solid fa-trash"></i><span> Remove</span>
          </>)}
          onModalClose={closeEditMode}
          buttonDisable={isUsingDefaultThumbnail}
          addedClassName="hover-shadow"
        />
      </>)}
    </div>
 */