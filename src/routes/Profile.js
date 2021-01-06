import { AuthService, DBService } from "mybase";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const Profile = ({ userObj }) => {
  const history = useHistory();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const onLogoutClick = () => {
    AuthService.signOut();
    history.push("/");
  };

  const getMyDwittes = async () => {
    const dwittes = await DBService.collection("dwitte")
      .where("creatorId", "==", userObj.uid)
      .orderBy("createdAt")
      .get();
    console.log(dwittes.docs.map((doc) => doc.data()));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
    }
  };

  const onChange = (event) => {};

  useEffect(() => {
    getMyDwittes();
  }, []);

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={newDisplayName}
          placeholder="Display name"
          onChange={onChange}
        />
        <input type="submit" value="Update Profile" />
      </form>
      <button onClick={onLogoutClick}>log out</button>
    </>
  );
};

export default Profile;
