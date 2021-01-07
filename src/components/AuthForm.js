import React, { useState } from "react";
import { AuthService } from "mybase";

const AuthForm = ({ newAccount }) => {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
    <>
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
      </form>
      <span>{error}</span>
    </>
  );
};

export default AuthForm;
