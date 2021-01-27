import React, { useEffect, useState } from "react";
import { AuthService } from "mybase";
import AuthWithSocial from "components/AuthWithSocial";
import { BsPeople, BsSearch } from "react-icons/bs";
import { IoChatbubbleOutline, IoLogoTwitter } from "react-icons/io5";

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

  const onGetBlue = (event) => {
    event.target.parentNode.classList.add("getBlue");
  };
  const onRemoveBlue = (event) => {
    event.target.parentNode.classList.remove("getBlue");
  };

  return (
    <>
      <div className="AuthContainer">
        <div className="leftSide">
          <IoLogoTwitter className="backgroundIcon" />
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
          <form onSubmit={onSubmit} className="emailLoginForm">
            <div className="emailContainer">
              <div className="emailInputContainer">
                <p className="emailInputPlaceholder">사용자 이메일</p>
                <input
                  name="email"
                  type="text"
                  required
                  value={email}
                  onChange={onChange}
                  onFocus={onGetBlue}
                  onBlur={onRemoveBlue}
                  className="emailInput"
                ></input>
              </div>
              <span className="errrorMessage">{error}</span>
            </div>
            <div className="passwordContainer">
              <div className="passwordInputContainer">
                <p className="passwordInputPlaceholder">비밀번호</p>
                <input
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={onChange}
                  onFocus={onGetBlue}
                  onBlur={onRemoveBlue}
                  className="passwordInput"
                ></input>
              </div>
              <button onClick={toggleAccount} className="toggle">
                {newAccount ? "계정이 있나요?" : "계정 만들기"}
              </button>
            </div>
            <input
              type="submit"
              className="submitAccount"
              value={newAccount ? "만들기" : "로그인"}
            ></input>
          </form>
          <div className="rightDown">
            <IoLogoTwitter className="dwitteIcon" />
            <h1 className="title">
              지금 전 세계에서 무슨 일이
              <br /> 일어나고 있는지 알아보세요.
            </h1>
            <AuthWithSocial />
          </div>
        </div>
        <footer className="AuthFooter">
          <div className="aContainer">
            <a>맞아요</a>
            <a>이건</a>
            <a>footer</a>
            <a>입니다</a>
            <a>아무도</a>
            <a>보지않죠</a>
            <a>그저</a>
            <a>자리를</a>
            <a>묵묵히</a>
            <a>지킵니다</a>
          </div>
        </footer>
      </div>
    </>
  );
};

export default AuthForm;
