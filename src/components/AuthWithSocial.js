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
    } catch (error) {
      const errorCode = error.code;
      let errorMessage;
      if (errorCode === "auth/account-exists-with-different-credential") {
        errorMessage = "이미 사용중인 이메일 주소에요.";
      } else if (errorCode === "auth/cancelled-popup-request") {
        errorMessage = "팝업 권한이 거부당했어요 :(";
      } else if (errorCode === "auth/popup-blocked") {
        errorMessage = "팝업을 허용해주세요.";
      } else if (errorCode === "auth/popup-closed-by-user") {
        errorMessage = "팝업이 예상치 못하게 종료됐어요.";
      } else {
        errorMessage = "알 수 없는 오류가 발생했어요.";
      }
      SetsocialLoginError(errorMessage);
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
