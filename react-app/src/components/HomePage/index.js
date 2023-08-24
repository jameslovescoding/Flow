import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSongsForHomePage } from "../../store/song";
import SongTile from "../SongTile";

function HomePage() {
  const dispatch = useDispatch();
  const [pageStatus, setPageStatus] = useState("loading");
  const allSongs = useSelector(state => state.song.songList);

  useEffect(() => {
    (async () => {
      const errors = await dispatch(getSongsForHomePage())
      if (errors) {
        setPageStatus("error");
      } else {
        setPageStatus("done");
      }
    })()
  }, [dispatch])



  return (<>
    <h1>Find songs you like</h1>
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

export default HomePage