// const

const SET_ALL_COMMENTS = "comment/SET_ALL_COMMENTS";
const ADD_NEW_COMMENT = "comment/ADD_NEW_COMMENT";
const REMOVE_ALL_COMMENTS = "comment/REMOVE_ALL_COMMENTS";
const REMOVE_COMMENT_FROM_LIST = "comment/REMOVE_COMMENT_FROM_LIST";
const UPDATE_COMMENT_IN_LIST = "comment/UPDATE_COMMENT_IN_LIST";

// action

const setAllComments = (comments) => ({
  type: SET_ALL_COMMENTS,
  payload: comments,
})

const addNewComment = (comment) => ({
  type: ADD_NEW_COMMENT,
  payload: comment,
})

const removeAllComments = () => ({
  type: REMOVE_ALL_COMMENTS,
})

const removeCommentFromList = (commentId) => ({
  type: REMOVE_COMMENT_FROM_LIST,
  id: commentId,
})

const updateCommentInList = (comment) => ({
  type: UPDATE_COMMENT_IN_LIST,
  payload: comment
})

// thunk

export const getAllComments = (songId) => async (dispatch) => {
  const response = await fetch(`/api/songs/${songId}/comments`)
  if (response.ok) {
    const comments = await response.json();
    dispatch(setAllComments(comments.all_comments));
    return null;
  } else {
    const data = await response.json();
    return data.errors;
  }
}

export const createCommentForSong = (comment, songId) => async (dispatch) => {
  const response = await fetch(`/api/songs/${songId}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(comment)
  })
  if (response.ok) {
    const newComment = await response.json();
    dispatch(addNewComment(newComment));
    return null;
  } else {
    const data = await response.json();
    return data.errors;
  }
}

export const editComment = (comment, commentId) => async (dispatch) => {
  const response = await fetch(`/api/comments/${commentId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(comment)
  })
  if (response.ok) {
    const updatedComment = await response.json();
    dispatch(updateCommentInList(updatedComment));
    return null;
  } else {

    const data = await response.json();
    console.log(data)
    return data.errors;
  }
}

export const deleteComment = (commentId) => async (dispatch) => {
  const response = await fetch(`/api/comments/${commentId}`, {
    method: "DELETE",
  })
  if (response.ok) {
    dispatch(removeCommentFromList(commentId));
    return null;
  } else {
    const data = await response.json();
    return data.errors;
  }
}

// initial state

const initialState = {
  allComments: null, // for comments in the show single song page
}

// reducer

const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ALL_COMMENTS: {
      const newState = { ...state };
      newState.allComments = action.payload;
      return newState;
    }
    case ADD_NEW_COMMENT: {
      console.log(state)
      const newState = { ...state };
      newState.allComments = [...newState.allComments, action.payload];
      console.log(newState)
      return newState;
    }
    case REMOVE_ALL_COMMENTS: {
      const newState = { ...state };
      newState.allComments = null;
      return newState;
    }
    case REMOVE_COMMENT_FROM_LIST: {
      const newState = { ...state };
      if (Array.isArray(newState.allComments)) {
        newState.allComments = newState.allComments.filter((comment) => comment.id != action.id);
      }
      return newState;
    }
    case UPDATE_COMMENT_IN_LIST: {
      const newState = { ...state };
      if (Array.isArray(newState.allComments)) {
        let index = newState.allComments.findIndex((comment) => {
          return comment.id === action.payload.id;
        })
        console.log("thunk index", index);
        if (index !== undefined) {
          newState.allComments = [...newState.allComments]
          newState.allComments[index] = action.payload;
        }
      }
      return newState;
    }
    default:
      return state;
  }
}

export default commentReducer;