import React, { useEffect, useState } from "react";
import CommentTile from "./CommentTile";

const CommentList = ({ commentList }) => {

  const orderedComments = [...commentList];
  orderedComments.sort((a, b) => {
    return b.id - a.id;
  })

  return (<>
    <div>
      {orderedComments.map(comment => {
        return (<>
          <CommentTile comment={comment} />
        </>)
      })}
    </div>
  </>)
}

export default CommentList;