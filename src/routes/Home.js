import { DBService } from "mybase";
import React, { useState } from "react";

const Home = () => {
  const [dwitte, setDwitte] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    await DBService.collection("dwitte").add({
      dwitte,
      createdAt: Date.now(),
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
    </div>
  );
};

export default Home;
