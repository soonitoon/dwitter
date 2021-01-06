import { AuthService, DBService } from "mybase";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

const Profile = ({ userObj }) => {
  const history = useHistory();
  const onLogoutClick = () => {
    AuthService.signOut();
    history.push("/");
  };

  const getMyDwittes = async () => {
    const dwittes = await DBService.collection("dwittes").where();
  };

  // useEffect(() => {
  //   getMyDwittes();
  // }, []);

  return (
    <>
      <button onClick={onLogoutClick}>log out</button>
    </>
  );
};

export default Profile;
