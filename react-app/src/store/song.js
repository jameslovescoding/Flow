// const

const SET_SINGLE_SONG = "song/SET_SINGLE_SONG";
const REMOVE_SINGLE_SONG = "song/REMOVE_SINGLE_SONG";
const SET_SONG_LIST = "song/SET_SONG_LIST";
const REMOVE_SONG_LIST = "song/REMOVE_SONG_LIST";

const setSingleSong = (song) => ({
  type: SET_SINGLE_SONG,
  payload: song,
})

const removeSingleSong = () => ({
  type: REMOVE_SINGLE_SONG,
})

const setSongList = (songs) => ({
  type: SET_SONG_LIST,
  payload: songs,
})

const removeSongList = () => ({
  type: REMOVE_SONG_LIST,
})

// time converter, from "Fri, 11 Aug 2023 00:00:00 GMT" to "2023-08-11"

const timeConverter = (dateString) => {
  if (!dateString) {
    return null
  }
  const inputDate = new Date(dateString);
  const month = (inputDate.getUTCMonth() + 1).toString().padStart(2, '0');
  const day = inputDate.getUTCDate().toString().padStart(2, '0');
  const year = inputDate.getUTCFullYear();
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate
}

export const uploadNewSong = (formData) => async (dispatch) => {
  const response = await fetch("/api/songs/new", {
    method: "POST",
    body: formData
  })
  if (response.ok) {
    const newSong = await response.json();
    newSong.release_date = timeConverter(newSong.release_date);
    dispatch(setSingleSong(newSong));
    return newSong;
  } else {
    const data = await response.json();
    return data;
  }
}

export const getSongById = (songId) => async (dispatch) => {
  const response = await fetch(`/api/songs/${songId}`)
  if (response.ok) {
    const newSong = await response.json();
    newSong.release_date = timeConverter(newSong.release_date);
    dispatch(setSingleSong(newSong));
    return null;
  } else {
    const data = await response.json();
    return data.errors;
  }
}


// thunk for upload thumbnail picture of a song

export const uploadNewThumbnail = (formData, songId) => async (dispatch) => {
  const response = await fetch(`/api/songs/${songId}/thumbnail`, {
    method: 'PUT',
    body: formData
  })
  if (response.ok) {
    const updatedSong = await response.json();
    updatedSong.release_date = timeConverter(updatedSong.release_date);
    dispatch(setSingleSong(updatedSong));
    return null;
  } else {
    const data = await response.json();
    return data.errors
  }
}


// thunk for remove a thumbnail of a song

export const removeCurrentThumbnail = (songId) => async (dispatch) => {
  const response = await fetch(`/api/songs/${songId}/thumbnail`, {
    method: 'DELETE',
  })
  if (response.ok) {
    const updatedSong = await response.json();
    updatedSong.release_date = timeConverter(updatedSong.release_date);
    dispatch(setSingleSong(updatedSong));
    return null;
  } else {
    const data = await response.json();
    return data.errors
  }
}

// thunk for update metadata of a song

export const updateSongMetadata = (metadata, songId) => async (dispatch) => {
  console.log("thunk update meta", metadata)
  const response = await fetch(`/api/songs/${songId}/meta`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(metadata)
  })
  if (response.ok) {
    const updatedSong = await response.json();
    updatedSong.release_date = timeConverter(updatedSong.release_date);
    dispatch(setSingleSong(updatedSong))
    return null
  } else {
    const data = await response.json();
    return data.errors
  }
}

// thunk for update lyrics of a song

export const updateSongLyrics = (lyrics, songId) => async (dispatch) => {
  const response = await fetch(`/api/songs/${songId}/lyrics`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(lyrics)
  })
  if (response.ok) {
    const updatedSong = await response.json();
    updatedSong.release_date = timeConverter(updatedSong.release_date);
    dispatch(setSingleSong(updatedSong))
    return null
  } else {
    const data = await response.json();
    return data.errors
  }
}

// thunk for replace song audio file

export const replaceSongAudioFile = (formData, songId) => async (dispatch) => {
  const response = await fetch(`/api/songs/${songId}/song`, {
    method: "PUT",
    body: formData
  })
  if (response.ok) {
    const updatedSong = await response.json();
    updatedSong.release_date = timeConverter(updatedSong.release_date);
    dispatch(setSingleSong(updatedSong))
    return null
  } else {
    const data = await response.json();
    return data.errors
  }
}

// thunk for delete a song

export const deleteSong = (songId) => async (dispatch) => {
  const response = await fetch(`/api/songs/${songId}`, {
    method: "DELETE",
  })
  if (response.ok) {
    //dispatch(removeSingleSong())
    return null
  } else {
    const data = await response.json();
    return data.errors
  }
}

// thunk for get list fo songs

export const getSongsForHomePage = () => async (dispatch) => {
  const response = await fetch('/api/songs/');
  if (response.ok) {
    const songs = await response.json();
    dispatch(setSongList(songs));
    return null;
  } else {
    const data = await response.json();
    return data.errors;
  }
}

export const getSongsForCollectionPage = () => async (dispatch) => {
  const response = await fetch('/api/songs/my');
  if (response.ok) {
    const songs = await response.json();
    dispatch(setSongList(songs));
    return null;
  } else {
    const data = await response.json();
    return data.errors;
  }
}

// single song is for single song create, view and update page

const initialState = {
  singleSong: null,
  songList: null,
}

const songReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SINGLE_SONG: {
      const newState = { ...state };
      newState.singleSong = action.payload;
      return newState;
    }
    case REMOVE_SINGLE_SONG: {
      const newState = { ...state };
      newState.singleSong = null;
      return newState;
    }
    case SET_SONG_LIST: {
      const newState = { ...state };
      newState.songList = action.payload;
      return newState
    }
    case REMOVE_SONG_LIST: {
      const newState = { ...state };
      newState.songList = null;
      return newState;
    }
    default:
      return state;
  }
}

export default songReducer