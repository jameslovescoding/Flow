import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./LandingPage.css";

function LandingPage() {
  const sessionUser = useSelector(state => state.session.user);

  if (sessionUser) {
    return (<>
      < Redirect to="/my-home" />
    </>)
  }
  return (<div className="landing-page-container">
    <div className="landing-page-intro">
      <h1>Flow</h1>
      <h2>SoundCloud Clone <span>Music</span> App</h2>
      <p>with React, Flask, SQLAlchemy, AWS S3</p>
    </div>
    <div className="landing-page-features">
      <h2>Upload your favorite songs</h2>
      <h2>Listen and comments</h2>
    </div>



  </div>)
}

export default LandingPage