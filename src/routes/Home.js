import { DBService } from "mybase";
import React, { useEffect, useState } from "react";
import Dwitte from "components/Dwitte";
import DwitteFactory from "components/DwitteFactory";

const Home = ({ userObj }) => {
  const [dwittes, setDwittes] = useState([]);

  const getDwittes = () => {
    const unsubscribe = DBService.collection("dwitte")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        const dwitteArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDwittes(dwitteArray);
      });
    return unsubscribe;
  };

  useEffect(() => {
    const unsubscribe = getDwittes();
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="dwitte-container">
      <DwitteFactory userObj={userObj} />
      {dwittes.map((dw) => (
        <Dwitte
          key={dw.id}
          dwitteObj={dw}
          isOwner={dw.creatorId === userObj.uid}
          currentUser={userObj}
        />
      ))}
    </div>
  );
};

export default Home;
