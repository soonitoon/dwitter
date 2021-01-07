import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import AuthForm from "routes/AuthForm";
import Home from "routes/Home";
import Navigation from "components/Navigation";
import Profile from "routes/Profile";

const AppRouter = ({ isLoggedIn, userObj, refreshUserObj }) => {
  return (
    <Router>
      {isLoggedIn && <Navigation userObj={userObj} />}
      <Switch>
        {isLoggedIn ? (
          <>
            <Route exact path="/">
              <Home userObj={userObj} />
            </Route>
            <Route exact path="/profile">
              <Profile userObj={userObj} refreshUserObj={refreshUserObj} />
            </Route>
          </>
        ) : (
          <Route exact path="/">
            <AuthForm />
          </Route>
        )}
      </Switch>
    </Router>
  );
};

export default AppRouter;
