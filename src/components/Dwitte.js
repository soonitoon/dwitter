import React from "react";

const Dwitte = ({ dwitteObj, isOwner }) => (
  <div>
    <h4>{dwitteObj.text}</h4>
    {isOwner && (
      <>
        <button>Delete</button>
        <button>Edit</button>
      </>
    )}
  </div>
);

export default Dwitte;
