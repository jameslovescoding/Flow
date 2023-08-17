import React, { useEffect, useState } from "react";
import CommentTile from "./CommentTile";

const CommentList = ({ commentList }) => {

  return (<>
    {commentList.map(comment => {
      return (<>
        <CommentTile comment={comment} />
      </>)
    })}
  </>)
}

export default CommentList;