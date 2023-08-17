import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { getSongsForHomePage } from "../../store/song";
import SongListPage from "./SongListPage";
import SongTile from "./SongTile";

function HomePage() {
  const dispatch = useDispatch();
  const [pageStatus, setPageStatus] = useState("loading");
  const allSongs = useSelector(state => state.song.songList);

  useEffect(async () => {
    const errors = await dispatch(getSongsForHomePage())
    if (errors) {
      setPageStatus("error");
    } else {
      setPageStatus("done");
    }
  }, [])

  return (<>
    <h1>Find songs you like</h1>
    {pageStatus === "error" && <p>An error occurred</p>}
    {pageStatus === "done" && (<>
      <ul>
        {allSongs["all_songs"].map((song => {
          return (<>
            <SongTile song={song} />
          </>)
        }))}
      </ul>
    </>)}
  </>)
}

export default HomePage