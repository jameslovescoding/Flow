import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";

const SongTile = ({ song }) => {
  const history = useHistory()

  const handleGoToSongContent = () => {
    history.push(`/song/${song.id}`)
  }

  let thumbnail;
  let isUsingDefaultThumbnail = false;
  if (song.thumbnail_url) {
    thumbnail = song.thumbnail_url;
  } else {
    thumbnail = "https://s3.us-east-2.amazonaws.com/app-academy.capstone-project.sound-cloud-clone.flow/default-image-song-thumbnail.jpg";
    isUsingDefaultThumbnail = true;
  }

  return (<>
    <div onClick={handleGoToSongContent}>
      <div>
        <img src={thumbnail} alt={"song thumbnail"} />
      </div>
      <div>
        <p><i className="fa-solid fa-music"></i> {song.title}</p>
        <p><i className="fa-solid fa-user"></i> {song.artist}</p>
        <p><i className="fa-solid fa-record-vinyl"></i> {song.album}</p>
      </div>
    </div>
  </>)
}

export default SongTile;