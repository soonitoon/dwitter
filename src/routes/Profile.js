import { AuthService, DBService } from "mybase";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Dwitte from "components/Dwitte";

const Profile = ({ userObj, refreshUserObj }) => {
  const [dwitteArray, setDwitteArray] = useState([]);
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const history = useHistory();

  const onLogoutClick = () => {
    AuthService.signOut();
    history.push("/");
  };

  const getMyDwittes = () => {
    const unsubscribe = DBService.collection("dwitte")
      .where("creatorId", "==", userObj.uid)
      .orderBy("createdAt")
      .onSnapshot((snapshot) => {
        const dwitteArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDwitteArray(dwitteArray);
      });
    return unsubscribe;
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
    const unsubscribe = getMyDwittes();
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <form onSubmit={onSubmit} className="edit-profile-form">
        <input
          type="text"
          value={newDisplayName}
          placeholder="Display name"
          onChange={onChange}
          className="new-username-input"
        />
        <button type="submit" className="submit-username">
          수정
        </button>
        <button onClick={onLogoutClick} className="logout">
          logout
        </button>
      </form>
      <div className="dwitte-container">
        {dwitteArray &&
          dwitteArray.map((dw) => (
            <Dwitte
              key={dw.id}
              dwitteObj={dw}
              isUserLike={dw.likeUsers.includes(userObj.uid)}
              isOwner={dw.creatorId === userObj.uid}
              currentUser={userObj}
            />
          ))}
      </div>
    </>
  );
};

export default Profile;
