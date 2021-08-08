import { DBService, storageService, firebaseInstance } from "mybase";
import React, { useState } from "react";
import { BsFillTrashFill, BsPencilSquare } from "react-icons/bs";
import { ImCancelCircle, ImCheckmark } from "react-icons/im";
import { HiThumbUp, HiOutlineThumbUp } from "react-icons/hi";

const Dwitte = ({ dwitteObj, isOwner, currentUser, isUserLike }) => {
  const [editing, setEditing] = useState(false);
  const [newDwitte, setNewDwitte] = useState(dwitteObj.text);
  const [isLike, setIsLike] = useState(isUserLike);

  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure?");
    if (ok) {
      await DBService.doc(`dwitte/${dwitteObj.id}`).delete();
      if (dwitteObj.attachmentURL) {
        await storageService.refFromURL(dwitteObj.attachmentURL).delete();
      }
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

  const onLikeClick = () => {
    const documentRef = DBService.collection("dwitte").doc(dwitteObj.id);
    if (isLike === false) {
      documentRef.update({
        likeUsers: firebaseInstance.firestore.FieldValue.arrayUnion(
          currentUser.uid
        ),
        likeCount: firebaseInstance.firestore.FieldValue.increment(1),
      });
      setIsLike(true);
    } else {
      documentRef.update({
        likeUsers: firebaseInstance.firestore.FieldValue.arrayRemove(
          currentUser.uid
        ),
        likeCount: firebaseInstance.firestore.FieldValue.increment(-1),
      });
      setIsLike(false);
    }
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
          <div className="like-container">
            <button onClick={onLikeClick} className="like-button">
              {isLike ? <HiThumbUp /> : <HiOutlineThumbUp />}
            </button>
            <p className="like-count">{dwitteObj.likeCount}</p>
          </div>
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
