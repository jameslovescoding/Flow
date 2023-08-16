// const


const SET_SINGLE_SONG = "song/SET_SINGLE_SONG";
const REMOVE_SINGLE_SONG = "song/REMOVE_SINGLE_SONG";

const setSingleSong = (song) => ({
  type: SET_SINGLE_SONG,
  payload: song,
})

const removeSingleSong = (song) => ({
  type: REMOVE_SINGLE_SONG,
})

export const uploadNewSong = (formData) => async (dispatch) => {
  const response = await fetch("/api/songs/new", {
    method: "POST",
    body: formData
  })
  if (response.ok) {
    const newSong = await response.json();
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
    dispatch(setSingleSong(updatedSong));
    return null;
  } else {
    const data = await response.json();
    return data.errors
  }
}

// single song is for single song create, view and update page

const initialState = {
  singleSong: null,
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
    default:
      return state;
  }
}

export default songReducer