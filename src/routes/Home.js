import { DBService, storageService } from "mybase";
import React, { useEffect, useState } from "react";
import Dwitte from "components/Dwitte";
import DwitteFactory from "components/DwitteFactory";

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
    <div>
      <DwitteFactory userObj={userObj} />
      <div>
        {dwittes.map((dw) => (
          <Dwitte
            key={dw.id}
            dwitteObj={dw}
            isOwner={dw.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
