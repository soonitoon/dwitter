import React, { useState } from "react";
import { AuthService } from "mybase";
import "components/CSS/style_AuthForm.css";
import AuthWithSocial from "components/AuthWithSocial";
import { BsPeople, BsSearch } from "react-icons/bs";
import { IoChatbubbleOutline } from "react-icons/io5";

const AuthForm = () => {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
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
      setError(error.message);
    }
  };

  return (
    <div className="AuthContainer">
      <div className="leftSide">
        <div className="textBox">
          <div className="eachText">
            <BsSearch className="icon" />
            <h3>관심사를 팔로우하세요.</h3>
          </div>
          <div className="eachText">
            <BsPeople className="icon" />
            <h3>
              사람들이 무엇에 대해 이야기하고 있는지
              <br />
              알아보세요.
            </h3>
          </div>
          <div className="eachText">
            <IoChatbubbleOutline className="icon" />
            <h3>대화에 참여하세요.</h3>
          </div>
        </div>
      </div>
      <div className="rightSide">
        <form onSubmit={onSubmit}>
          <input
            name="email"
            type="text"
            placeholder="Email"
            required
            value={email}
            onChange={onChange}
          ></input>
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={onChange}
          ></input>
          <input
            type="submit"
            value={newAccount ? "Create Account" : "Log in"}
          ></input>
          <button onClick={toggleAccount}>
            {newAccount ? "로그인" : "계정 생성"}
          </button>
        </form>
        <AuthWithSocial />
        <span>{error}</span>
      </div>
      <footer className="AuthFooter">im footer</footer>
    </div>
  );
};

export default AuthForm;
