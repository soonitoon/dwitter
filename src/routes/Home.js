import { DBService, storageService } from "mybase";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Dwitte from "components/Dwitte";

const Home = ({ userObj }) => {
  const [dwitte, setDwitte] = useState("");
  const [dwittes, setDwittes] = useState([]);
  const [attachment, setAttachment] = useState("");

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
    const fileRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
    const response = await fileRef.putString(attachment, "data_url");
    console.log(response);
    // await DBService.collection("dwitte").add({
    //   text: dwitte,
    //   createdAt: Date.now(),
    //   createrId: userObj.uid,
    // });
    // setDwitte("");
  };

  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setDwitte(value);
  };

  const onClearAttachmentClick = () => {
    setAttachment(null);
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
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="dwitte" />
        {attachment && (
          <div>
            <img src={attachment} width="50px" height="50px" />
            <button onClick={onClearAttachmentClick}>Clear</button>
          </div>
        )}
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
