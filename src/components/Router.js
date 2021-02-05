import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import AuthForm from "routes/AuthForm";
import Home from "routes/Home";
import Navigation from "components/Navigation";
import Profile from "routes/Profile";

const AppRouter = ({ isLoggedIn, userObj, refreshUserObj }) => {
  return (
    <Router>
      {isLoggedIn ? (
        <>
          <Navigation userObj={userObj} />
          <Route exact path="/">
            <Home userObj={userObj} />
          </Route>
          <Route path="/profile">
            <Profile userObj={userObj} refreshUserObj={refreshUserObj} />
          </Route>
        </>
      ) : (
        <Route path="/">
          <AuthForm />
        </Route>
      )}
    </Router>
  );
};

export default AppRouter;
