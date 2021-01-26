import { DBService, storageService } from "mybase";
import React, { useState } from "react";
import { BsFillTrashFill, BsPencilSquare } from "react-icons/bs";

const Dwitte = ({ dwitteObj, isOwner, userName }) => {
  const [editing, setEditing] = useState(false);
  const [newDwitte, setNewDwitte] = useState(dwitteObj.text);

  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure?");
    if (ok) {
      await DBService.doc(`dwitte/${dwitteObj.id}`).delete();
      await storageService.refFromURL(dwitteObj.attachmentURL).delete();
    }
  };

  const toggleEditing = () => {
    setEditing((prev) => !prev);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    await DBService.doc(`dwitte/${dwitteObj.id}`).update({
      text: newDwitte,
    });
    setEditing(false);
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDwitte(value);
  };

  return (
    <div className="dwitte">
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Edit your dwitte"
              value={newDwitte}
              required
              onChange={onChange}
            />
            <input type="submit" value="Update" />
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{userName}</h4>
          <h4 className="dwitteText">{dwitteObj.text}</h4>
          {dwitteObj.attachmentURL && (
            <img
              src={dwitteObj.attachmentURL}
              width="70px"
              height="70px"
              className="attachmentImg"
            />
          )}
          {isOwner && (
            <div className="dwitteBtnContainer">
              <button onClick={onDeleteClick} className="dwitteBtn">
                <BsFillTrashFill />
              </button>
              <button onClick={toggleEditing} className="dwitteBtn">
                <BsPencilSquare />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Dwitte;
