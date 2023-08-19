import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { getSongById } from "../../store/song";
import { useParams } from "react-router-dom";
import SongContentPage from "./SongContentPage";

function SongShowPage() {
  const { songId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const currentSong = useSelector(state => state.song.singleSong);
  const currentUser = useSelector(state => state.session.user);
  // page has three status: loading, error, done
  const [pageStatus, setPageStatus] = useState("loading");

  useEffect(async () => {
    // check the param if it is integer
    if (!parseInt(songId)) {
      setPageStatus("error");
      history.push("/my-home")
      return
    }
    // load the song by songId from the server
    const resErrors = await dispatch(getSongById(songId));
    if (resErrors) {
      setPageStatus("error");
    } else {
      setPageStatus("done");
    }
  }, [songId])

  return (<>
    {pageStatus === "error" && <p>An error occurred</p>}
    {pageStatus === "done" && <SongContentPage song={currentSong} user={currentUser} />}
  </>)
}

export default SongShowPage