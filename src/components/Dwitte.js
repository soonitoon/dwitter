import { DBService, storageService } from "mybase";
import React, { useState } from "react";
import { BsFillTrashFill, BsPencilSquare } from "react-icons/bs";
import { ImCancelCircle, ImCheckmark } from "react-icons/im";

const Dwitte = ({ dwitteObj, isOwner }) => {
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
            <h4 className="username">{dwitteObj.creatorName}</h4>
            <input
              type="text"
              placeholder="Edit your dwitte"
              value={newDwitte}
              required
              onChange={onChange}
              className="new-dwitte-input"
            />
            <button type="submit" className="submit-new-dwitte">
              <ImCheckmark />
            </button>
          </form>
          <button onClick={toggleEditing} className="cancel-editing">
            <ImCancelCircle />
          </button>
        </>
      ) : (
        <>
          <h4 className="username">{dwitteObj.creatorName}</h4>
          <h4 className="dwitte-text">{dwitteObj.text}</h4>
          {dwitteObj.attachmentURL && (
            <img
              src={dwitteObj.attachmentURL}
              width="110px"
              height="110px"
              className="dwitte-image"
              alt="img"
            />
          )}
          {isOwner && (
            <>
              <button onClick={onDeleteClick} className="delete-dwitte">
                <BsFillTrashFill />
              </button>
              <button onClick={toggleEditing} className="edit-dwitte">
                <BsPencilSquare />
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Dwitte;
