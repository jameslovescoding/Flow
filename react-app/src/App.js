import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";

import LandingPage from "./components/LandingPage";
import HomePage from "./components/HomePage";
import SongShowPage from "./components/SongShowPage";
import SongCreatePage from "./components/SongCreatePage";
import SongEditPage from "./components/SongEditPage";
import ProfileShowPage from "./components/ProfileShowPage";
import ProfileEditPage from "./components/ProfileEditPage";
import CollectionPage from "./components/CollectionPage";
import ActivityPage from "./components/ActivityPage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/" >
            <LandingPage />
          </Route>
          <Route path="/home" >
            <HomePage />
          </Route>
          <Route path="/song/new" >
            <SongCreatePage />
          </Route>
          <Route path="/song/:songId/edit" >
            <SongEditPage />
          </Route>
          <Route path="/song/:songId" >
            <SongShowPage />
          </Route>
          <Route path="/profile/edit" >
            <ProfileEditPage />
          </Route>
          <Route path="/profile" >
            <ProfileShowPage />
          </Route>
          <Route path="/collection" >
            <CollectionPage />
          </Route>
          <Route path="/activity" >
            <ActivityPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
