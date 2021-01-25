import React, { useState } from "react";
import { storageService, DBService } from "mybase";
import { v4 as uuidv4 } from "uuid";

const DwitteFactory = ({ userObj }) => {
  const [dwitte, setDwitte] = useState("");
  const [attachment, setAttachment] = useState("");
  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.readAsDataURL(theFile);
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setDwitte(value);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    let attachmentURL = "";
    if (attachment != "") {
      const attachmentRef = storageService
        .ref()
        .child(`${userObj.uid}/${uuidv4()}`);
      const response = await attachmentRef.putString(attachment, "data_url");
      attachmentURL = await response.ref.getDownloadURL();
    }
    const dwitteObj = {
      text: dwitte,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentURL,
    };

    await DBService.collection("dwitte").add(dwitteObj);
    setDwitte("");
    setAttachment("");
  };

  const onClearAttachmentClick = () => {
    setAttachment(null);
  };
  return (
    <form onSubmit={onSubmit} className="dwitteForm">
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
  );
};

export default DwitteFactory;
