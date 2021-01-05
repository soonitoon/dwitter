import { DBService } from "mybase";
import React, { useEffect, useState } from "react";
import Dwitte from "components/Dwitte";

const Home = ({ userObj }) => {
  const [dwitte, setDwitte] = useState("");
  const [dwittes, setDwittes] = useState([]);

  useEffect(() => {
    DBService.collection("dwitte").onSnapshot((snapshot) => {
      const dwitteArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDwittes(dwitteArray);
    });
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    await DBService.collection("dwitte").add({
      text: dwitte,
      createdAt: Date.now(),
      createrId: userObj.uid,
    });
    setDwitte("");
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setDwitte(value);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={dwitte}
          onChange={onChange}
          type="text"
          placeholder="What's your mind?"
          maxLength={120}
        />
        <input type="submit" value="dwitte" />
      </form>
      <div>
        {dwittes.map((dw) => (
          <Dwitte
            key={dw.id}
            dwitteObj={dw}
            isOwner={dw.createrId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
