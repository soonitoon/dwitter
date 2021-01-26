import { DBService, storageService } from "mybase";
import React, { useState } from "react";
import { BsFillTrashFill, BsPencilSquare } from "react-icons/bs";
import { ImCancelCircle, ImCheckmark } from "react-icons/im";

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
        <div className="editContainer">
          <form onSubmit={onSubmit}>
            <div className="context">
              <h4 className="userName">{dwitteObj.creatorName}</h4>
              <input
                type="text"
                placeholder="Edit your dwitte"
                value={newDwitte}
                required
                onChange={onChange}
                className="editInput"
              />
              <button type="submit" className="submitEditBtn">
                <ImCheckmark />
              </button>
            </div>
          </form>
          <button onClick={toggleEditing} className="cancelEditBtn">
            <ImCancelCircle />
          </button>
        </div>
      ) : (
        <>
          <div className="context">
            <h4 className="userName">{dwitteObj.creatorName}</h4>
            <h4 className="dwitteText">{dwitteObj.text}</h4>
          </div>
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
