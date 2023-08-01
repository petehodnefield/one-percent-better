import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { ADD_AREA, ADD_IMPROVEMENT, DELETE_AREA } from "../../utils/mutations";
import { ME, SINGLE_AREA } from "../../utils/queries";
import NoImprovements from "../NoImprovements/NoImprovements";
import Link from "next/link";
import { todaysDate } from "../../utils/date";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import ParamsGraphView from "./ParamsGraphView";
import ParamsListView from "./ParamsListView";
import GraphView from "./GraphView";
const ParamsHomeContent = ({ noImprovements, areaID }) => {
  const [selectedArea, setSelectedArea] = useState("");
  const [allImprovements, setAllImprovements] = useState("");
  const [view, setView] = useState("graph");
  const [areaDropdownOpen, setAreaDropdownOpen] = useState(false);
  const [completedImprovement, setCompletedImprovement] = useState();
  const [addNewAreaOpen, setAddNewAreaOpen] = useState(false);
  const [newArea, setNewArea] = useState("");
  const [userID, setUserID] = useState("");
  const [newImprovement, setNewImprovement] = useState("");
  // console.log("newImprovement", newImprovement);

  const { loading, data: meData, error } = useQuery(ME);
  const [deleteArea] = useMutation(DELETE_AREA);
  const {
    loading: areaLoading,
    data: areaData,
    error: areaError,
  } = useQuery(SINGLE_AREA, {
    variables: { areaId: areaID },
  });
  const [addArea] = useMutation(ADD_AREA);
  const [
    addImprovement,
    {
      loading: newImprovementLoading,
      data: newImprovementData,
      error: newImprovementError,
    },
  ] = useMutation(ADD_IMPROVEMENT);

  // ME Query
  useEffect(() => {
    // Checks to see if meData exists yet. If not, return
    if (
      meData === undefined ||
      meData.me === null ||
      meData.me.areas === null ||
      meData.me.areas === undefined
    ) {
      return;
    } else {
      setUserID(meData.me._id);
    }
  }, [meData]);

  // Query our selected Area
  useEffect(() => {
    if (
      areaData === undefined ||
      areaData.area === null ||
      areaData.area.area === null ||
      areaData.area.area === undefined
    ) {
      return;
    }
    // If there's no improvements yet,
    else if (areaData.area.improvements.length === 0) {
      console.log("There are no improvements!");
      setAllImprovements([]);
      setSelectedArea(areaData.area.area);
      setNewImprovement({
        ...newImprovement,
        skillPercentage: 1,
        date: todaysDate,
      });
      setCompletedImprovement(false);
    } else {
      setAllImprovements([]);
      setSelectedArea(areaData.area.area);
      const areaSpecificImprovements = areaData.area.improvements;
      const improvements = areaSpecificImprovements.map((data, index, arr) => {
        if (arr.length - 1 === index) {
          if (data.date === todaysDate) {
            console.log("dates match!");
            setCompletedImprovement(true);
          } else {
            console.log("Dates Dont match!");
            setCompletedImprovement(false);
          }
        }
        setAllImprovements((oldImprovements) => [
          ...oldImprovements,
          {
            date: data.date,
            description: data.description,
            improvement: data.skillPercentage,
            improvementId: data._id,
          },
        ]);
        const newSkillPercentage = data.skillPercentage * 1.01;
        setNewImprovement({
          ...newImprovement,
          skillPercentage: newSkillPercentage,
          date: todaysDate,
        });
      });
    }
  }, [areaData]);

  // Function that runs when 'Add Improvement' button is clicked
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(newImprovement, areaID);
    try {
      await addImprovement({
        variables: {
          date: todaysDate,
          skillPercentage: newImprovement.skillPercentage,
          description: newImprovement.description,
          areaId: areaID,
        },
      });
    } catch (e) {
      console.log(e);
    }
    window.location.reload();
  };

  // Function that runs when a new area gets added
  const handleNewArea = async (e) => {
    try {
      await addArea({ variables: { area: newArea, userId: userID } });
    } catch (e) {
      console.log(e);
    }
  };

  async function handleAreaDeletion(id) {
    try {
      await deleteArea({
        variables: {
          deleteAreaId: id,
        },
      });
    } catch (e) {
      console.log(e);
    }
    window.location.replace("/");
  }

  return (
    <div>
      {view === "graph" ? (
        <GraphView
          newImprovement={newImprovement}
          setNewImprovement={setNewImprovement}
          allImprovements={allImprovements}
          noImprovements={noImprovements}
          setAreaDropdownOpen={setAreaDropdownOpen}
          areaDropdownOpen={areaDropdownOpen}
          handleAreaDeletion={handleAreaDeletion}
          meData={meData}
          selectedArea={selectedArea}
          handleFormSubmit={handleFormSubmit}
          setNewArea={setNewArea}
          setAddNewAreaOpen={setAddNewAreaOpen}
          addNewAreaOpen={addNewAreaOpen}
          handleNewArea={handleNewArea}
          completedImprovement={completedImprovement}
          setView={setView}
        />
      ) : (
        <ParamsListView
          setView={setView}
          selectedArea={selectedArea}
          improvements={allImprovements}
          areaDropdownOpen={areaDropdownOpen}
          setAreaDropdownOpen={setAreaDropdownOpen}
          meData={meData}
          addNewAreaOpen={addNewAreaOpen}
        />
      )}
    </div>
  );
};

export default ParamsHomeContent;
