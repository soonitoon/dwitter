import React, { useState } from "react";
import { AuthService } from "mybase";
import AuthWithSocial from "components/AuthWithSocial";
import { BsPeople, BsSearch } from "react-icons/bs";
import { IoLogoTwitter } from "react-icons/io5";

const AuthForm = () => {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(false);

  const toggleAccount = () => {
    setNewAccount((prev) => !prev);
  };

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      if (newAccount) {
        await AuthService.createUserWithEmailAndPassword(email, password);
      } else {
        await AuthService.signInWithEmailAndPassword(email, password);
      }
    } catch (error) {
      const errorCode = error.code;
      let errorMessage;
      if (errorCode === "auth/email-already-in-use") {
        errorMessage = "사용중인 이메일이에요.";
      } else if (errorCode === "auth/invalid-email") {
        errorMessage = "이메일 주소를 정확히 입력해주세요.";
      } else if (errorCode === "auth/operation-not-allowed") {
        errorMessage = "사용할 수 없는 이메일 혹은 비밀번호에요.";
      } else if (errorCode === "auth/weak-password") {
        errorMessage = "비밀번호가 너무 약해요.";
      } else if (errorCode === "auth/user-disabled") {
        errorMessage = "사용 중지된 계정이에요.";
      } else if (errorCode === "auth/user-not-found") {
        errorMessage = "존재하지 않는 이메일이에요.";
      } else if (errorCode === "auth/wrong-password") {
        errorMessage = "잘못된 비밀번호에요.";
      }
      setError(errorMessage);
    }
  };

  return (
    <>
      <IoLogoTwitter className="top-dwitte-icon" />
      <h1 className="main-title">
        지금 전 세계에서 무슨 일이
        <br /> 일어나고 있는지 알아보세요.
      </h1>
      <h5 className="sub-title">오늘 드위터에 가입하세요.</h5>
      <AuthWithSocial />
      <div className="color-box">
        <h5 className="color-box-text">
          <BsSearch className="color-box-icon" />
          <div>관심사를 팔로우 하세요.</div>
        </h5>
        <h5 className="color-box-text">
          <BsPeople className="color-box-icon" />
          <div>
            사람들이 무엇에 대해 이야기하고
            <br />
            있는지 알아보세요.
          </div>
        </h5>
      </div>
      <h5 className="make-account-title">혹은, 직접 로그인.</h5>
      <form onSubmit={onSubmit} className="LoginForm">
        <input
          name="email"
          type="text"
          required
          value={email}
          onChange={onChange}
          placeholder="example@email.com"
          className="email-input"
        ></input>
        <input
          name="password"
          type="password"
          required
          value={password}
          onChange={onChange}
          placeholder="password"
          className="password-input"
        ></input>
        <input
          type="submit"
          className="submit-account"
          value={newAccount ? "만들기" : "로그인"}
        ></input>
        <button onClick={toggleAccount} className="toggle-login">
          {newAccount ? "계정이 있나요?" : "계정 만들기"}
        </button>
      </form>
      <p className="login-error">{error}</p>
      <footer className="AuthFooter">
        <p>트위터 클론코딩 -드위터</p>
      </footer>
    </>
  );
};

export default AuthForm;
