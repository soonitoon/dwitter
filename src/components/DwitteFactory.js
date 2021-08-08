import React, { useState } from "react";
import { storageService, DBService } from "mybase";
import { v4 as uuidv4 } from "uuid";
import { MdAddAPhoto } from "react-icons/md";

const DwitteFactory = ({ userObj }) => {
  const [dwitte, setDwitte] = useState("");
  const [attachment, setAttachment] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

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
    if (dwitte !== "") {
      event.preventDefault();
      let attachmentURL = "";
      if (attachment !== "") {
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
        creatorName: userObj.displayName,
        attachmentURL,
        likeCount: 0,
        likeUsers: [],
      };
      await DBService.collection("dwitte").add(dwitteObj);
      setDwitte("");
      setAttachment("");
      setErrorMsg("");
    } else {
      setErrorMsg("no dwitte!");
    }
  };

  const onClearAttachmentClick = () => {
    setAttachment("");
  };

  return (
    <form onSubmit={onSubmit} className="dwitte-form">
      <input
        value={dwitte}
        onChange={onChange}
        type="text"
        placeholder="What's your mind?"
        maxLength={120}
        className="dwitte-input"
      />
      <input type="submit" value="dwitte" className="submit-dwitte" />
      <label htmlFor="fileInput" className="file-upload-btn">
        <MdAddAPhoto />
      </label>
      <p className="dwitte-error-msg">{errorMsg}</p>
      <input
        type="file"
        accept="image/*"
        onChange={onFileChange}
        id="fileInput"
        className="file-input"
      />
      {attachment && (
        <>
          <img
            src={attachment}
            width="50px"
            height="50px"
            className="attach-img"
            alt="img"
          />
          <button onClick={onClearAttachmentClick} className="delete-img">
            X
          </button>
        </>
      )}
    </form>
  );
};

export default DwitteFactory;
