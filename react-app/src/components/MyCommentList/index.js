import React from "react";
import MyCommentTile from "./MyCommentTile";
import "./MyCommentList.css";

const MyCommentList = ({ commentList }) => {

  if (!commentList.length) {
    return (<>
      <p>0 comment</p>
      <p>You have not left any comments yet.</p>
    </>)
  }

  const orderedComments = [...commentList];
  orderedComments.sort((a, b) => {
    return b.id - a.id;
  })

  return (<>
    <div>
      <p>{commentList.length} comment{commentList.length > 1 && "s"}</p>
      {orderedComments.map(comment => {
        return (<>
          <MyCommentTile comment={comment} />
        </>)
      })}
    </div>
  </>)
}

export default MyCommentList;