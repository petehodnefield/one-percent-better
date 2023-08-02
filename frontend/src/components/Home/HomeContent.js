import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { ME, AREAS } from "../../utils/queries";
import { ADD_IMPROVEMENT, ADD_AREA, DELETE_AREA } from "../../utils/mutations";
import Link from "next/link";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import Loading from "../Loading/Loading";
import NoImprovements from "../NoImprovements/NoImprovements";
import { todaysDate } from "../../utils/date";
import Error from "../Error/Error";
import ImprovementDetails from "../ImprovementDetails/ImprovementDetails";
import AreaDropdown from "../AreaDropdown/AreaDropdown";
import GraphView from "./GraphView";
import ListView from "./ListView";
import Welcome from "../../pages/welcome";
const HomeContent = ({}) => {
  const [noAreas, setNoAreas] = useState(false);
  const [newImprovement, setNewImprovement] = useState({});
  const [selectedArea, setSelectedArea] = useState("");
  const [allImprovements, setAllImprovements] = useState("");
  const [completedImprovement, setCompletedImprovement] = useState(false);
  const [newArea, setNewArea] = useState("");
  const [userID, setUserId] = useState("");
  const [areaId, setAreaId] = useState("");
  const [noImprovements, setNoImprovements] = useState(false);
  const [addNewAreaOpen, setAddNewAreaOpen] = useState(false);
  const [areaDropdownOpen, setAreaDropdownOpen] = useState(false);
  const [view, setView] = useState("graph");
  const [addArea] = useMutation(ADD_AREA);

  const { loading: meLoading, data: meData, error: meError } = useQuery(ME);
  // Areas Query
  const {
    loading: areaLoading,
    data: areaData,
    error: areaError,
  } = useQuery(AREAS);

  // addImprovement Mutation
  const [
    addImprovement,
    {
      loading: newImprovementLoading,
      data: newImprovementData,
      error: newImprovementError,
    },
  ] = useMutation(ADD_IMPROVEMENT);
  const [deleteArea] = useMutation(DELETE_AREA);

  useEffect(() => {
    // Checks to see if meData exists yet. If not, return
    if (
      meData === undefined ||
      meData.me === null ||
      meData.me.areas === null ||
      meData.me.areas === undefined
    ) {
      return;
    }
    // This is the code that runs if the user has only 1 area
    else if (meData.me.areas.length === 1) {
      setAreaId(meData.me.areas[0]._id);
      setSelectedArea(meData.me.areas[0].area);

      setUserId(meData.me._id);
      setNewImprovement({
        ...newImprovement,
        skillPercentage: 1,
        date: todaysDate,
      });

      const allImprovements = meData.me.areas[0].improvements.map(
        (data, index, arr) => {
          if (arr.length - 1 === index) {
            if (data.date === todaysDate) {
              setCompletedImprovement(true);
            }
            const newSkillPercentage = data.skillPercentage * 1.01;
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
              improvementId: data._id,
            },
          ]);
        }
      );
    }
    //This code run if the user already has previous allImprovements
    else {
      setSelectedArea(meData.me.areas[0].area);
      setUserId(meData.me._id);
      setAreaId(meData.me.areas[0]._id);

      const allImprovements = meData.me.areas[0].improvements.map(
        (data, index, arr) => {
          if (arr.length - 1 === index) {
            if (data.date === todaysDate) {
              setCompletedImprovement(true);
            }
            const newSkillPercentage = data.skillPercentage * 1.01;
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
              improvementId: data._id,
            },
          ]);
        }
      );
    }
  }, [meData]);

  // Handler that adds a new improvement
  async function addNewImprovement() {
    try {
      const newImprovementMutation = await addImprovement({
        variables: {
          date: todaysDate,
          skillPercentage: newImprovement.skillPercentage,
          description: newImprovement.description,
          areaId: areaId,
        },
      });
      window.location.reload();
      // setCompletedImprovement(true);
    } catch (e) {
      console.log(e);
    }
  }

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

  // Function that runs when 'Add Improvement' button is clicked
  const handleFormSubmit = (e) => {
    e.preventDefault();
    addNewImprovement();
  };

  // Function that runs when a new area gets added
  const handleNewArea = async (e) => {
    e.preventDefault();
    try {
      await addArea({ variables: { area: newArea, userId: userID } });
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  };
  // If anything is loading, return Loading component
  if (areaLoading || newImprovementLoading || meLoading) return <Loading />;

  if (meError || newImprovementError) return <Error />;

  if (noAreas) {
    return <Welcome />;
  }
  return (
    <div className=" rounded-lg">
      {view === "graph" ? (
        <GraphView
          newImprovement={newImprovement}
          setNewImprovement={setNewImprovement}
          allImprovements={allImprovements}
          noImprovements={noImprovements}
          setAreaDropdownOpen={setAreaDropdownOpen}
          areaDropdownOpen={areaDropdownOpen}
          meData={meData}
          selectedArea={selectedArea}
          handleFormSubmit={handleFormSubmit}
          setNewArea={setNewArea}
          setAddNewAreaOpen={setAddNewAreaOpen}
          addNewAreaOpen={addNewAreaOpen}
          handleNewArea={handleNewArea}
          completedImprovement={completedImprovement}
          setView={setView}
          handleAreaDeletion={handleAreaDeletion}
          areaID={areaId}
        />
      ) : (
        <ListView
          newImprovement={newImprovement}
          setNewImprovement={setNewImprovement}
          allImprovements={allImprovements}
          noImprovements={noImprovements}
          setAreaDropdownOpen={setAreaDropdownOpen}
          areaDropdownOpen={areaDropdownOpen}
          meData={meData}
          selectedArea={selectedArea}
          handleFormSubmit={handleFormSubmit}
          setNewArea={setNewArea}
          setAddNewAreaOpen={setAddNewAreaOpen}
          addNewAreaOpen={addNewAreaOpen}
          handleNewArea={handleNewArea}
          completedImprovement={completedImprovement}
          setView={setView}
          areaID={areaId}
        />
      )}
    </div>
  );
};

export default HomeContent;
