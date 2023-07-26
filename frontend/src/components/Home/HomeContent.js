import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { IMPROVEMENTS, ME } from "../../utils/queries";
import { ADD_IMPROVEMENT } from "../../utils/mutations";
import Link from "next/link";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
const HomeContent = () => {
  // Date formats
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const month = monthNames[new Date().getMonth()];
  const day = new Date().getDate();
  const year = new Date().getFullYear();
  const todaysDate = `${month} ${day}, ${year}`;

  // State handling our previous improvements data
  const [improvements, setImprovements] = useState([]);
  // State handling our form data
  const [newImprovement, setNewImprovement] = useState({});

  const [completedImprovement, setCompletedImprovement] = useState();

  const [view, setView] = useState("graph");
  const [userID, setUserId] = useState("");

  const { loading, data, error } = useQuery(IMPROVEMENTS);

  const { loading: meLoading, data: meData, error: meError } = useQuery(ME);
  const [
    addImprovement,
    {
      loading: newImprovementLoading,
      data: newImprovementData,
      error: newImprovementError,
    },
  ] = useMutation(ADD_IMPROVEMENT, {
    variables: {
      date: todaysDate,
      skillPercentage: newImprovement.skillPercentage,
      description: newImprovement.description,
      userId: userID,
    },
  });

  useEffect(() => {
    if (
      meData === undefined ||
      meData.me === null ||
      meData.me.improvements === null ||
      meData.me.improvements === undefined
    ) {
      return;
    } else {
      setUserId(meData.me._id);
      const improvements = meData.me.improvements.map((data, index, arr) => {
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
        setImprovements((oldImprovements) => [
          ...oldImprovements,
          {
            date: data.date,
            improvement: data.skillPercentage,
          },
        ]);
      });
    }
  }, [meData]);
  async function addNewImprovement() {
    setCompletedImprovement(true);
    try {
      await addImprovement();
    } catch (e) {
      console.log(e);
    }
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    addNewImprovement();
    window.location.reload();
  };
  // If there's a date matching the current date, make the button disabled

  if (improvements.length < 0 || loading) return <div>Loading...</div>;
  return (
    <div className="home-content rounded-lg">
      {/* Link to stats view */}
      <Link href="/list-view" className="btn--view list-view">
        List view
      </Link>
      <div className="home-content-padding">
        {/* Text wrapper */}
        <div className="home-content__text-wrapper">
          <h2 className="home-content__title">My focus:</h2>
          <p className="home-content__goal">
            Increase my{" "}
            <span className="bold text--primary">web developer</span> skills by
            1% every day.
          </p>{" "}
        </div>
        {/* Graph with data */}
        <div className="home-data rounded">
          {improvements ? (
            <Line
              datasetIdKey="id"
              data={{
                labels: [],
                datasets: [
                  {
                    id: 1,
                    label: "Web development skills",
                    data: improvements,
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
      </div>
      <Link href="/list-view" className=" list-view--mobile">
        List view
      </Link>
      {/* Form where you input what you worked on that day */}
      <form onSubmit={handleFormSubmit} id="improvementForm" className="form">
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

export default HomeContent;
