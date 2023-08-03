import React, { useState, useRef } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { DELETE_IMPROVEMENT, UPDATE_IMPROVEMENT } from "../../utils/mutations";
import { SINGLE_AREA } from "../../utils/queries";
import Loading from "../Loading/Loading";
import Error from "../Error/Error";
const ImprovementDetails = ({ improvement, areaID }) => {
  const [newDescription, setNewDescription] = useState("");
  const [inputDisabled, setInputDisabled] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef(null);
  const [deleteImprovement, { loading, data, error }] =
    useMutation(DELETE_IMPROVEMENT);

  const [
    updateImprovementMutation,
    { loading: updateLoading, data: updateData, error: updateError },
  ] = useMutation(UPDATE_IMPROVEMENT);

  const {
    loading: areaLoading,
    data: areaData,
    error: areaError,
  } = useQuery(SINGLE_AREA, { variables: { areaId: areaID } });
  async function updateEveryImprovement(data, index) {
    if (index === 0) {
      const updateImprovement = await updateImprovementMutation({
        variables: {
          updateImprovementId: data._id,
          skillPercentage: 1,
        },
      });
    } else {
      const skillPercentageMultiple = 1 * 1.01 ** index;
      const updateImprovements = await updateImprovementMutation({
        variables: {
          updateImprovementId: data._id,
          skillPercentage: skillPercentageMultiple,
        },
      });
    }
  }

  async function removeImprovement(improvement) {
    try {
      // Remove the selected improvement
      const removeImprovement = await deleteImprovement({
        variables: {
          deleteImprovementId: improvement,
          areaId: areaID,
        },
      });
      // console.log(removeImprovement);
      const getRemainingImprovements =
        await removeImprovement.data.deleteImprovement.improvements.map(
          (data, index, arr) => {
            updateEveryImprovement(data, index);
          }
        );
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  }
  async function updateImprovement(id, description) {
    try {
      await updateImprovementMutation({
        variables: {
          updateImprovementId: id,
          description: description,
        },
      });
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  }

  if (loading || updateLoading) return <Loading />;
  if (error || updateError) return <Error />;

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
                updateImprovement(
                  improvement.improvementId,
                  newDescription.description
                );
              }}
            >
              Save
            </p>
          )}

          <p
            className="list__action list__action--red"
            onClick={() => removeImprovement(improvement.improvementId)}
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
          className="list__column--2 description"
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
          maxLength={50}
        />
      )}
      {/* Skill Level */}
      <p className="list__skill list__column--3">
        {improvement.improvement.toString().slice(0, 5)}
      </p>
    </div>
  );
};

export default ImprovementDetails;
