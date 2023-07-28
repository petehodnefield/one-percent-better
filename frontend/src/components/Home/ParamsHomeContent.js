import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { ADD_AREA, ADD_IMPROVEMENT } from "../../utils/mutations";
import { ME, SINGLE_AREA } from "../../utils/queries";
import NoImprovements from "../NoImprovements/NoImprovements";
import Link from "next/link";
import { todaysDate } from "../../utils/date";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
const ParamsHomeContent = ({
  noImprovements,
  areaID,
  newImprovement,
  setNewImprovement,
}) => {
  const [selectedArea, setSelectedArea] = useState("");
  const [allImprovements, setAllImprovements] = useState("");

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
      console.log("areaData", areaSpecificImprovements);
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
            improvement: data.skillPercentage,
          },
        ]);
        console.log(data);
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
    console.log(
      `DATA: ${todaysDate} ${newImprovement.description} ${newImprovement.skillPercentage} ${areaID}`
    );
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
      {noImprovements ? <NoImprovements /> : ""}
      {/* Link to stats view */}
      <Link href="/list-view" className="btn--view list-view">
        List view
      </Link>
      <div className="home-content-padding">
        <div className="home-content__text-wrapper">
          <h2 className="home-content__title">My focus:</h2>
          <p className="home-content__goal">
            Increase my{" "}
            <span
              onClick={() => setAreaDropdownOpen(!areaDropdownOpen)}
              className="bold text--primary home-content__area-selected"
            >
              {selectedArea}
            </span>{" "}
            skills by 1%
          </p>{" "}
          {areaDropdownOpen ? (
            <div className="home-content__areas-wrapper">
              {meData.me.areas.map((area) => (
                <Link
                  href={`/${area._id}`}
                  onClick={() => {
                    setSelectedArea(area.area);
                    setAreaDropdownOpen(!areaDropdownOpen);
                  }}
                  className="home-content__area"
                  key={area.area}
                >
                  {area.area}
                </Link>
              ))}
              {addNewAreaOpen ? (
                <form
                  onSubmit={(e) => handleNewArea(e)}
                  className="home-content__area-form"
                  action=""
                >
                  <input
                    className="form__input home-content__area-input"
                    type="text"
                    onChange={(e) => setNewArea(e.target.value)}
                  />
                  <button type="submit" className="home-content__area-button">
                    Submit
                  </button>
                </form>
              ) : (
                <div
                  onClick={() => {
                    setAddNewAreaOpen(!addNewAreaOpen);
                  }}
                  className="home-content__area"
                >
                  Add an area{" "}
                </div>
              )}
            </div>
          ) : (
            ""
          )}
        </div>

        {noImprovements ? (
          ""
        ) : (
          <div className="home-data rounded">
            {allImprovements ? (
              <Line
                datasetIdKey="id"
                data={{
                  labels: [],
                  datasets: [
                    {
                      id: 1,
                      label: "Web development skills",
                      data: allImprovements,
                      parsing: {
                        xAxisKey: "date",
                        yAxisKey: "improvement",
                      },
                    },
                  ],
                }}
              />
            ) : (
              ""
            )}
          </div>
        )}
        {/* Graph with data */}
      </div>
      <Link href="/list-view" className=" list-view--mobile">
        List view
      </Link>
      {/* Form where you input what you worked on that day */}
      <form
        onSubmit={handleFormSubmit}
        id="improvementFormParam"
        className="form"
      >
        <div className="improvement-form__content">
          <div className="improvement-form__text-wrapper improvement-form__text-wrapper--left">
            <label
              htmlFor="improvement"
              className="improvement-form__title--sm"
            >
              What I learned/practiced
            </label>
            <textarea
              name="improvement"
              id="improvement"
              onChange={(e) =>
                setNewImprovement({
                  ...newImprovement,
                  description: e.target.value,
                })
              }
              className="form__textarea form__textarea--light rounded"
              maxLength={50}
            ></textarea>
          </div>
          <div className="improvement-form__text-wrapper improvement-form__text-wrapper--centered">
            <h3 className="improvement-form__title--lg">Today's date</h3>
            <p className="improvement-form__date">{todaysDate}</p>
            <button
              type="submit"
              className={`btn btn--lg btn--dark rounded-md ${
                completedImprovement ? "btn--disabled" : ""
              }`}
            >
              Add improvement
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ParamsHomeContent;
