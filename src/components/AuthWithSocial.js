import { AuthService, firebaseInstance } from "mybase";
import React, { useState } from "react";

const AuthWithSocial = () => {
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
      <button onClick={onSocialClick} name="google">
        Continue with Goolge
      </button>
      <button onClick={onSocialClick} name="github">
        Continue with Github
      </button>
    </div>
  );
};

export default AuthWithSocial;
