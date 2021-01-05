import { DBService } from "mybase";
import React from "react";

const Dwitte = ({ dwitteObj, isOwner }) => {
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure?");
    if (ok) {
      await DBService.doc(`dwitte/${dwitteObj.id}`).delete();
    }
  };

  return (
    <div>
      <h4>{dwitteObj.text}</h4>
      {isOwner && (
        <>
          <button onClick={onDeleteClick}>Delete</button>
          <button>Edit</button>
        </>
      )}
    </div>
  );
};

export default Dwitte;
