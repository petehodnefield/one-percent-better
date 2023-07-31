import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { ME, AREAS } from "../../utils/queries";
import { ADD_IMPROVEMENT, ADD_AREA } from "../../utils/mutations";
import Link from "next/link";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import Loading from "../Loading/Loading";
import NoImprovements from "../NoImprovements/NoImprovements";
import { todaysDate } from "../../utils/date";
import Error from "../Error/Error";
import ImprovementDetails from "../ImprovementDetails/ImprovementDetails";
const HomeContent = ({}) => {
  // State handling our previous allImprovements data
  // const [allImprovements, setAllImprovementss] = useState([]);
  // State handling our form data
  const [newImprovement, setNewImprovement] = useState({});
  const [selectedArea, setSelectedArea] = useState("");
  const [allImprovements, setAllImprovements] = useState("");
  const [completedImprovement, setCompletedImprovement] = useState();
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
      console.log("meData", meData.me.areas);
      setAreaId(meData.me.areas[0]._id);
      setSelectedArea(meData.me.areas[0].area);

      setUserId(meData.me._id);
      setNewImprovement({
        ...newImprovement,
        skillPercentage: 1,
        date: todaysDate,
      });
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
              // setCompletedImprovement(true);
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
    // Set today as completed (so you can't add more than one point)
    setCompletedImprovement(true);
    try {
      await addImprovement({
        variables: {
          date: todaysDate,
          skillPercentage: newImprovement.skillPercentage,
          description: newImprovement.description,
          areaId: areaId,
        },
      });
    } catch (e) {
      console.log(e);
    }
  }

  // Function that runs when 'Add Improvement' button is clicked
  const handleFormSubmit = (e) => {
    e.preventDefault();
    addNewImprovement();
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
  // If anything is loading, return Loading component
  if (areaLoading || newImprovementLoading || meLoading) return <Loading />;

  if (meError || newImprovementError) return <Error />;
  return (
    <div className="home-content rounded-lg">
      {view === "graph" ? (
        <div>
          {noImprovements ? <NoImprovements /> : ""}
          {/* Link to stats view */}
          <p onClick={() => setView("list")} className="btn--view list-view">
            List view
          </p>
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
                        setAreaId(area._id);
                        setAreaDropdownOpen(!areaDropdownOpen);
                      }}
                      className="home-content__area"
                      key={area._id}
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
                      <button
                        type="submit"
                        className="home-content__area-button"
                      >
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
            id="improvementForm"
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
      ) : (
        <div>
          <div>
            <p onClick={() => setView("graph")} className="btn--view list-view">
              Graph view
            </p>
            {/* Text wrapper */}
            <div className="home-content__text-wrapper">
              <h2 className="home-content__title">My focus:</h2>
              <p className="home-content__goal">
                Increase my{" "}
                <span
                  onClick={() => setAreaDropdownOpen(!areaDropdownOpen)}
                  className="bold text--primary  home-content__area-selected"
                >
                  {selectedArea}
                </span>{" "}
                skills by 1%.
              </p>{" "}
              {areaDropdownOpen ? (
                <div className="home-content__areas-wrapper">
                  {meData.me.areas.map((area) => (
                    <Link
                      href={`/${area._id}`}
                      onClick={() => {
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
                      <button
                        type="submit"
                        className="home-content__area-button"
                      >
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
            {/* Container with improvement data */}
            <div className="  home-data--list rounded">
              <div className="list__title-wrapper">
                <h3 className="list__title list__column--1">Date</h3>
                <h3 className="list__title list__column--2">Description</h3>
                <h3 className="list__title list__column--3">Skill Level</h3>
              </div>
              {/* This is where we'll map through all of our improvements */}
              {allImprovements
                ? allImprovements
                    .toReversed()
                    .map((improvement) => (
                      <ImprovementDetails
                        key={improvement.date}
                        improvement={improvement}
                      />
                    ))
                : ""}
            </div>
            <Link href="/" className=" list-view--mobile">
              Graph view
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeContent;
