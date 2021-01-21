import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { AuthService } from "mybase";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(AuthService.currentUser);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    AuthService.onAuthStateChanged((User) => {
      if (User) {
        setIsLoggedIn(true);
        if (User.displayName === "") {
          setUserObj({
            displayName: User.displayName,
            uid: User.uid,
            updateProfile: (newProfile) => {
              User.updateProfile(newProfile);
            },
          });
        } else {
          setUserObj({
            displayName: "username",
            uid: User.uid,
            updateProfile: (newProfile) => {
              User.updateProfile(newProfile);
            },
          });
        }
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
        "init..."
      )}
    </>
  );
}

export default App;
