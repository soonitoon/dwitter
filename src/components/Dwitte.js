import { DBService } from "mybase";
import React, { useState } from "react";

const Dwitte = ({ dwitteObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newDwitte, setNewDwitte] = useState(dwitteObj.text);

  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure?");
    if (ok) {
      await DBService.doc(`dwitte/${dwitteObj.id}`).delete();
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
    <div>
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
          <h4>{dwitteObj.text}</h4>
          {dwitteObj.attachmentURL && (
            <img src={dwitteObj.attachmentURL} width="50px" height="50px" />
          )}
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete</button>
              <button onClick={toggleEditing}>Edit</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Dwitte;
