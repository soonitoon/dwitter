import React, { useState } from "react";
import AppRouter from "components/Router";
import { AuthService } from "mybase";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(AuthService.currentUser);
  return (
    <>
      <AppRouter isLoggedIn={isLoggedIn} />
    </>
  );
}

export default App;
