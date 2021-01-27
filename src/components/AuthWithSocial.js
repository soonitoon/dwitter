import { AuthService, firebaseInstance } from "mybase";
import React, { useState } from "react";

const AuthWithSocial = () => {
  const [socialLoginError, SetsocialLoginError] = useState("");
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
    try {
      await AuthService.signInWithPopup(provider);
    } catch (err) {
      SetsocialLoginError(err.message);
    }
  };
  return (
    <>
      <button onClick={onSocialClick} name="google" className="google-login">
        Goolge로 가입하기
      </button>
      <br />
      <button onClick={onSocialClick} name="github" className="github-login">
        Github으로 가입하기
      </button>
      <p className="login-error">{socialLoginError}</p>
    </>
  );
};

export default AuthWithSocial;
