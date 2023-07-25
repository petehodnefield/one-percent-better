"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { IMPROVEMENTS } from "../utils/queries";
import { ADD_IMPROVEMENT } from "../utils/mutations";
// Styles import
import mountainsImage from "../../public/assets/images/mountains.png";

// Chart import
import Link from "next/link";
import GraphView from "../components/GraphView/GraphView";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import ListView from "./list-view/index";

export default function Home() {
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
  console.log("improvements", improvements);
  // State handling our form data
  const [newImprovement, setNewImprovement] = useState({});

  const [completedImprovement, setCompletedImprovement] = useState();

  const [view, setView] = useState("graph");

  const { loading, data, error } = useQuery(IMPROVEMENTS);
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
      userId: "64be987687d5e0f90bcff11a",
    },
  });

  useEffect(() => {
    if (data === undefined || data.improvements === null) {
      return;
    }
    const improvements = data.improvements.map((data, index, arr) => {
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
      setImprovements((oldImprovments) => [
        ...oldImprovments,
        {
          date: data.date,
          improvement: data.skillPercentage,
        },
      ]);
    });
  }, [data]);
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
    console.log("Hello world");
    addNewImprovement();
    window.location.reload();
  };
  // If there's a date matching the current date, make the button disabled

  if (improvements.length < 0 || loading) return <div>Loading...</div>;

  console.log("data", data);

  return (
    <main className="home">
      {/* Background image */}
      <Image
        className="cover bg-img"
        src={mountainsImage}
        alt="A background image of colorful mountains representing growth"
      />

      {/* Title */}
      <div className="home__title-wrapper">
        <div className="home__title-content">
          <h1>
            <Link className="home__title" href={"/"}>
              1% Better
            </Link>
          </h1>
        </div>
      </div>

      <div className="home-content rounded-lg">
        {/* Link to stats view */}
        <Link href="/list-view" className="btn--view">
          List view
        </Link>
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
    </main>
  );
}
