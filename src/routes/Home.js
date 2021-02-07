import { DBService } from "mybase";
import React, { useEffect, useState } from "react";
import Dwitte from "components/Dwitte";
import DwitteFactory from "components/DwitteFactory";

const Home = ({ userObj }) => {
  const [dwittes, setDwittes] = useState([]);

  const getDwittes = () => {
    DBService.collection("dwitte")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        const dwitteArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDwittes(dwitteArray);
      });
  };

  useEffect(getDwittes, []);

  return (
    <div className="dwitte-container">
      <DwitteFactory userObj={userObj} />
      {dwittes.map((dw) => (
        <Dwitte
          key={dw.id}
          dwitteObj={dw}
          isOwner={dw.creatorId === userObj.uid}
        />
      ))}
    </div>
  );
};

export default Home;
