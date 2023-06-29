import React from "react";

const ImprovementDetails = ({ improvement }) => {
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
  return (
    <div className="list__details-wrapper">
      {/* Date */}
      <div className="list__date-wrapper list__column--1">
        <p className="list__date">{improvement.date}</p>
        <div className="list__action-wrapper">
          <p className="list__action">Edit</p>
          <p
            className="list__action list__action--red"
            onClick={() => deleteImprovement(improvement._id)}
          >
            Delete
          </p>
        </div>
      </div>

      {/* Description */}
      <p className="list__description list__column--2">
        {improvement.description}
      </p>

      {/* Skill Level */}
      <p className="list__skill list__column--3">
        {improvement.skillPercentage.toString().slice(0, 5)}
      </p>
    </div>
  );
};

export default ImprovementDetails;
