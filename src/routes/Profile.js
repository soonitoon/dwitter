import { AuthService, DBService } from "mybase";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Dwitte from "components/Dwitte";

const Profile = ({ userObj, refreshUserObj }) => {
  const history = useHistory();
  const [dwitteArray, setDwitteArray] = useState([]);
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
    const dwitteArray = dwittes.docs.map((doc) => doc.data());
    setDwitteArray(dwitteArray);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({
        displayName: newDisplayName,
      });
      refreshUserObj(newDisplayName);
    }
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };

  useEffect(() => {
    getMyDwittes();
  }, []);

  return (
    <>
      <div className="profileContainer">
        <form onSubmit={onSubmit} className="editProfileForm">
          <input
            type="text"
            value={newDisplayName}
            placeholder="Display name"
            onChange={onChange}
            className="userNameInput"
          />
          <button type="submit" className="submitNewUserName">
            update
          </button>
        </form>
        <button onClick={onLogoutClick} className="logOut">
          log out
        </button>
        <div className="myDwitteContainer">
          {dwitteArray &&
            dwitteArray.map((dw) => (
              <Dwitte
                key={dw.createdAt}
                dwitteObj={dw}
                isOwner={dw.creatorId === userObj.uid}
              />
            ))}
        </div>
      </div>
      <div className="dummy"></div>
    </>
  );
};

export default Profile;
