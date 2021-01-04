import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { AuthService } from "mybase";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(AuthService.currentUser);
  useEffect(() => {
    AuthService.onAuthStateChanged((User) => {
      if (User) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  });
  return <>{init ? <AppRouter isLoggedIn={isLoggedIn} /> : "init..."}</>;
}

export default App;
