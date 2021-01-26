import { DBService } from "mybase";
import React, { useEffect, useState } from "react";
import Dwitte from "components/Dwitte";
import DwitteFactory from "components/DwitteFactory";
import "components/CSS/style_Main.css";

const Home = ({ userObj }) => {
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

  return (
    <>
      <div className="centerContainer">
        <DwitteFactory userObj={userObj} />
        <div className="dwitteContainer">
          {dwittes.map((dw) => (
            <Dwitte
              key={dw.id}
              dwitteObj={dw}
              userName={userObj.displayName}
              isOwner={dw.creatorId === userObj.uid}
            />
          ))}
        </div>
      </div>
      <div className="dummy"></div>
    </>
  );
};

export default Home;
