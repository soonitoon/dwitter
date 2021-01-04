import { DBService } from "mybase";
import React, { useEffect, useState } from "react";

const Home = ({ userObj }) => {
  const [dwitte, setDwitte] = useState("");
  const [dwittes, setDwittes] = useState([]);

  const getDwittes = async () => {
    const DBdwitte = await DBService.collection("dwitte").get();
    DBdwitte.forEach((document) => {
      const dwitteObj = {
        ...document.data(),
        id: document.id,
      };
      setDwittes((prev) => [dwitteObj, ...prev]);
    });
  };

  useEffect(() => {
    getDwittes();
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
          <div key={dw.id}>
            <h4>{dw.dwitte}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
