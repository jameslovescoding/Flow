import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { getSongsForCollectionPage } from "../../store/song";
import SongTile from "../SongTile";

function CollectionPage() {
  const dispatch = useDispatch();
  const [pageStatus, setPageStatus] = useState("loading");
  const allSongs = useSelector(state => state.song.songList);

  useEffect(() => {
    (async () => {
      const errors = await dispatch(getSongsForCollectionPage())
      if (errors) {
        setPageStatus("error");
      } else {
        setPageStatus("done");
      }
    })()
  }, [dispatch])

  return (<>
    <h1>My Collection</h1>
    {pageStatus === "error" && <p>An error occurred</p>}
    {pageStatus === "done" && (<>
      <div className="song-list-container">
        {allSongs["all_songs"].map((song => {
          return (<>
            <SongTile song={song} />
          </>)
        }))}
      </div>
    </>)}
  </>)
}

export default CollectionPage