import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";

const SongListPage = ({ songs }) => {
  return (<>
    <ul>
      {songs["all_songs"].map((song => {
        return (<>
          <li>{song.title}</li>
        </>)
      }))}
    </ul>
  </>)
}

export default SongListPage;