import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { AuthService } from "mybase";
import { IoLogoTwitter } from "react-icons/io5";
import "components/CSS/reset.css";
import "components/CSS/style_Profile.css";
import "components/CSS/style_Main.css";
import "components/CSS/style_AuthForm.css";

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
        <IoLogoTwitter className="init" />
      )}
    </>
  );
}

export default App;
