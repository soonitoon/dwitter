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
        creatorName: userObj.displayName,
        attachmentURL,
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
    setAttachment(null);
  };

  return (
    <form onSubmit={onSubmit} className="dwitteForm">
      <div className="dwitteInputContainer">
        <input
          value={dwitte}
          onChange={onChange}
          type="text"
          placeholder="What's your mind?"
          maxLength={120}
          className="dwitteInput"
        />
        <p className="dwitteErrorMsg">{errorMsg}</p>
      </div>
      <label for="fileInput" className="fileUploadBtn">
        <MdAddAPhoto />
      </label>
      <input
        type="file"
        accept="image/*"
        onChange={onFileChange}
        id="fileInput"
        className="fileInput"
      />
      {attachment && (
        <div className="attachmentContainer">
          <img src={attachment} width="50px" height="50px" />
          <br />
          <button onClick={onClearAttachmentClick} className="clearAttachment">
            X
          </button>
        </div>
      )}
      <input type="submit" value="dwitte" className="submitDwitte" />
    </form>
  );
};

export default DwitteFactory;
