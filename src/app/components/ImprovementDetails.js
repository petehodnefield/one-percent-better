import React, { useState, useRef } from "react";

const ImprovementDetails = ({ improvement }) => {
  const [newDescription, setNewDescription] = useState({});
  const [inputDisabled, setInputDisabled] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  console.log(newDescription);

  const inputRef = useRef(null);

  const deleteImprovement = async (improvementID) => {
    const response = await fetch(
      `http://localhost:3001/improvement/improvement?id=${improvementID}`,
      {
        method: "DELETE",
        mode: "cors",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const jsonData = await response.json();
    window.location.reload();
  };

  const updateImprovementDescription = async (improvementID, data) => {
    console.log(data);
    const response = await fetch(
      `http://localhost:3001/improvement/improvement?id=${improvementID}`,
      {
        method: "PUT",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const jsonData = await response.json();
    window.location.reload();
  };
  return (
    <div className="list__details-wrapper">
      {/* Date */}
      <div className="list__date-wrapper list__column--1">
        <p className="list__date">{improvement.date}</p>
        <div className="list__action-wrapper">
          {!isEditing ? (
            <p
              className="list__action"
              onClick={() => {
                setInputDisabled(false);
                setIsEditing(true);
              }}
            >
              Edit
            </p>
          ) : (
            // Save new description
            <p
              className="list__action"
              onClick={() => {
                setInputDisabled(false);
                setIsEditing(false);
                updateImprovementDescription(improvement._id, newDescription);
              }}
            >
              Save
            </p>
          )}

          <p
            className="list__action list__action--red"
            onClick={() => deleteImprovement(improvement._id)}
          >
            Delete
          </p>
        </div>
      </div>

      {/* Description */}
      {!isEditing ? (
        <p
          onClick={() => {
            setIsEditing(true);
          }}
          className="list__column--2"
        >
          {improvement.description}{" "}
        </p>
      ) : (
        <input
          className="list__description list__column--2 input--list-view rounded"
          placeholder={improvement.description}
          onChange={(e) => setNewDescription({ description: e.target.value })}
          // disabled={inputDisabled ? true : false}
          ref={inputRef}
        />
      )}

      {/* Skill Level */}
      <p className="list__skill list__column--3">
        {improvement.skillPercentage.toString().slice(0, 5)}
      </p>
    </div>
  );
};

export default ImprovementDetails;
