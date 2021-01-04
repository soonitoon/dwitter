import { AuthService } from "mybase";
import React from "react";
import { useHistory } from "react-router-dom";

const Profile = () => {
  const history = useHistory();
  const onLogoutClick = () => {
    AuthService.signOut();
    history.push("/");
  };

  return (
    <>
      <button onClick={onLogoutClick}>log out</button>
    </>
  );
};

export default Profile;
