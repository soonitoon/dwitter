import { AuthService, firebaseInstance } from "mybase";
import React, { useState } from "react";
import AuthForm from "components/AuthForm";

const Auth = () => {
  const [newAccount, setNewAccount] = useState(true);
  const toggleAccount = () => {
    setNewAccount((prev) => !prev);
  };

  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    if (name === "google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === "github") {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    await AuthService.signInWithPopup(provider);
  };

  return (
    <div>
      <AuthForm newAccount={newAccount} />
      <span onClick={toggleAccount}>
        {newAccount ? "Log In" : "create account"}
      </span>
      <div>
        <button onClick={onSocialClick} name="google">
          Continue with Goolge
        </button>
        <button onClick={onSocialClick} name="github">
          Continue with Github
        </button>
      </div>
    </div>
  );
};

export default Auth;
