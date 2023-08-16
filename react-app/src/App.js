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
import ProtectedRoute from "./components/ProtectedRoute";

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
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup" >
            <SignupFormPage />
          </Route>
          <ProtectedRoute path="/my-home" >
            <HomePage />
          </ProtectedRoute>
          <ProtectedRoute path="/song/:songId/edit" >
            <SongEditPage />
          </ProtectedRoute>
          <ProtectedRoute path="/song/:songId" >
            <SongShowPage />
          </ProtectedRoute>
          <ProtectedRoute path="/profile">
            <ProfileShowPage />
          </ProtectedRoute>
          <ProtectedRoute path="/collection" >
            <CollectionPage />
          </ProtectedRoute>
          <ProtectedRoute path="/activity" >
            <ActivityPage />
          </ProtectedRoute>

        </Switch>
      )}
    </>
  );
}

export default App;
