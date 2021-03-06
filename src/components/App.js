import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import Loading from "components/Loading";
import { AuthService } from "mybase";
import "components/CSS/reset.css";
import "components/CSS/style_Loading.css";
import "components/CSS/style_AuthForm.css";
import "components/CSS/style_Main.css";
import "components/CSS/style_Profile.css";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(AuthService.currentUser);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    AuthService.onAuthStateChanged((User) => {
      if (User) {
        setUserObj({
          displayName: User.displayName,
          uid: User.uid,
          updateProfile: (newProfile) => {
            User.updateProfile(newProfile);
          },
        });
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  const refreshUserObj = (newDisplayName) => {
    setUserObj({
      displayName: newDisplayName,
      uid: userObj.uid,
      updateProfile: (newProfile) => {
        userObj.updateProfile(newProfile);
      },
    });
  };

  return (
    <>
      {init ? (
        <AppRouter
          refreshUserObj={refreshUserObj}
          isLoggedIn={isLoggedIn}
          userObj={userObj}
        />
      ) : (
        <Loading />
      )}
    </>
  );
}

export default App;
