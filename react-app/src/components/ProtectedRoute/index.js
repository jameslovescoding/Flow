import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children, path }) => {
  const sessionUser = useSelector(state => state.session.user);
  if (!sessionUser) {
    return (<>
      <Redirect to="/login" />
    </>)
  } else {
    return (<>
      <Route path={path}>
        {children}
      </Route>
    </>)
  }
}

export default ProtectedRoute