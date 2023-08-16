import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import SongPageOpenModalButton from "./SongPageOpenModalButton";
import UpdateSongThumbnailModal from "./UpdateSongThumbnailModal";
import RemoveSongThumbnailModal from "./RemoveSongThumbnailModal";
import UpdateSongMetadataModal from "./UpdateSongMetadataModal";
import UpdateSongLyricsModal from "./UpdateSongLyricsModal";
import ReplaceAudioFileModal from "./ReplaceAudioFileModal";

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

  return (<>
    <h1>{song.title}</h1>
    {enableEditMode && <button onClick={handleToggleEditMode}>{editButtonTitle}</button>}
    <div>
      <h2>Thumbnail</h2>
      {editMode && (<>
        <SongPageOpenModalButton
          modalComponent={<UpdateSongThumbnailModal song={song} modalTitle={thumbnailEditModalTitle} />}
          buttonText={thumbnailEditModalTitle}
          onModalClose={closeEditMode}
        />
        <SongPageOpenModalButton
          modalComponent={<RemoveSongThumbnailModal song={song} />}
          buttonText="Remove Current Thumbnail"
          onModalClose={closeEditMode}
          buttonDisable={isUsingDefaultThumbnail}
        />
      </>)}
      <div>
        <img src={thumbnail} alt={"song thumbnail"} />
        {isUsingDefaultThumbnail && <p>(This is our default thumbnail placeholder. Upload your own thumbnail for your song in edit mode.)</p>}
      </div>
    </div>
    <div>
      <h2>Metadata</h2>
      <div>
        {editMode && (<>
          <SongPageOpenModalButton
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
          <SongPageOpenModalButton
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
        <SongPageOpenModalButton
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
    <div>
      <h2>Comments</h2>
    </div>
    {editMode && (<>
      <div>
        <h2>Dangerous Zone</h2>
        <SongPageOpenModalButton
          modalComponent={<h1>Confirm Delete</h1>}
          buttonText={"Permanently Delete This Song"}
          onModalClose={closeEditMode}
        />
      </div>
    </>)}
  </>)
}

export default SongContentPage;