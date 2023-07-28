import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { ADD_AREA, ADD_IMPROVEMENT } from "../../utils/mutations";
import { ME, SINGLE_AREA } from "../../utils/queries";
import NoImprovements from "../NoImprovements/NoImprovements";
import Link from "next/link";
import { todaysDate } from "../../utils/date";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import ParamsGraphView from "./ParamsGraphView";
import ParamsListView from "./ParamsListView";
const ParamsHomeContent = ({
  noImprovements,
  areaID,
  newImprovement,
  setNewImprovement,
}) => {
  const [selectedArea, setSelectedArea] = useState("");
  const [allImprovements, setAllImprovements] = useState("");
  const [view, setView] = useState("graph");
  const [areaDropdownOpen, setAreaDropdownOpen] = useState(false);
  const [completedImprovement, setCompletedImprovement] = useState();
  const [addNewAreaOpen, setAddNewAreaOpen] = useState(false);
  const [newArea, setNewArea] = useState("");
  const [userID, setUserID] = useState("");

  const { loading, data: meData, error } = useQuery(ME);
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
    } else {
      setAllImprovements([]);
      setSelectedArea(areaData.area.area);
      const areaSpecificImprovements = areaData.area.improvements;
      const improvements = areaSpecificImprovements.map((data, index, arr) => {
        if (arr.lenght - 1 === index) {
          setCompletedImprovement(true);
        }
        let newSkillPercentage;
        if (allImprovements.length === 0) {
          newSkillPercentage = 1;
          setNewImprovement({
            ...newImprovement,
            skillPercentage: newSkillPercentage,
            date: todaysDate,
          });
        } else {
          newSkillPercentage = data.skillPercentage * 1.01;
          setNewImprovement({
            ...newImprovement,
            skillPercentage: newSkillPercentage,
            date: todaysDate,
          });
        }
        setAllImprovements((oldImprovements) => [
          ...oldImprovements,
          {
            date: data.date,
            description: data.description,
            improvement: data.skillPercentage,
          },
        ]);
      });
    }
  }, [areaData]);

  // Handler that adds a new improvement
  async function addNewImprovement() {
    // Set today as completed (so you can't add more than one point)
    setCompletedImprovement(true);
    try {
      await addImprovement({
        variables: {
          date: todaysDate,
          skillPercentage: newImprovement.skillPercentage,
          description: newImprovement.description,
          areaID: areaID,
        },
      });
    } catch (e) {
      console.log(e);
    }
  }

  // Function that runs when 'Add Improvement' button is clicked
  const handleFormSubmit = async (e) => {
    e.preventDefault();
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

  return (
    <div className="home-content rounded-lg">
      {view === "graph" ? (
        <ParamsGraphView
          setAreaDropdownOpen={setAreaDropdownOpen}
          noImprovements={noImprovements}
          selectedArea={selectedArea}
          areaDropdownOpen={areaDropdownOpen}
          allImprovements={allImprovements}
          handleFormSubmit={handleFormSubmit}
          completedImprovement={completedImprovement}
          meData={meData}
          addNewAreaOpen={addNewAreaOpen}
          setView={setView}
          setAddNewAreaOpen={setAddNewAreaOpen}
          setNewArea={setNewArea}
          handleNewArea={handleNewArea}
          setNewImprovement={setNewImprovement}
          newImprovement={newImprovement}
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
