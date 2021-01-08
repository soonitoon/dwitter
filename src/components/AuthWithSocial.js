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
    <div className="socialContainer">
      <h1 className="socialTitle">기존 계정으로 가입하세요.</h1>
      <button onClick={onSocialClick} name="google" className="googleButton">
        Goolge로 가입하기
      </button>
      <button onClick={onSocialClick} name="github" className="githubButton">
        Github으로 가입하기
      </button>
    </div>
  );
};

export default AuthWithSocial;
