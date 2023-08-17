import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

function LandingPage() {
  const sessionUser = useSelector(state => state.session.user);

  if (sessionUser) {
    return (<>
      < Redirect to="/my-home" />
    </>)
  }
  return (<>
    <h1>Landing Page</h1>
  </>)
}

export default LandingPage