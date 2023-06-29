"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
// Styles import
import mountainsImage from "../../public/assets/images/mountains.png";

// Chart import
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";

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

  // State handling our previous improvements data
  const [improvements, setImprovements] = useState([]);
  // State handling our form data
  const [newImprovement, setNewImprovement] = useState({});

  // State handling today's date
  const [todaysDate, setTodaysDate] = useState();
  console.log("newImprovement", newImprovement);

  async function addNewImprovement(url, data) {
    console.log(JSON.stringify(data));
    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const jsonData = await response.json();
    console.log(jsonData);
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    addNewImprovement(
      `http://localhost:3001/improvement/improvement?id=${"649d8235922db9507c016648"}`,
      newImprovement
    );
  };

  const url = "https://one-percent-better-api.onrender.com/user";

  async function fetchAPI() {
    const response = await fetch("http://localhost:3001/user", {
      mode: "cors",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    });
    const jsonData = await response.json();
    // return response.json();
    const individualDataArrays = await jsonData[0].improvements.map(
      (data, index, arr) => {
        if (arr.length - 1 === index) {
          const newSkillPercentage = data.skillPercentage * 1.01;
          setNewImprovement({
            ...newImprovement,
            skillPercentage: newSkillPercentage,
          });
        }
        setImprovements((oldImprovments) => [
          ...oldImprovments,
          {
            date: data.date,
            improvement: data.skillPercentage,
          },
        ]);
      }
    );
  }

  useEffect(() => {
    fetchAPI();

    const month = monthNames[new Date().getMonth()];
    const day = new Date().getDate();
    const year = new Date().getFullYear();
    const todaysDate = `${month} ${day}, ${year}`;
    setTodaysDate(todaysDate);
    setNewImprovement({
      ...newImprovement,
      date: todaysDate,
    });
  }, []);

  if (improvements.length < 0) return <div>Loading...</div>;

  return (
    <main className="home">
      {/* Background image */}
      <Image
        className="cover bg-img"
        src={mountainsImage}
        alt="A background image of colorful mountains representing growth"
      />

      {/* Title */}
      <div className="home__title-wrapper rounded-lg">
        <h1 className="home__title">1% Better</h1>
      </div>

      <div className="home-content rounded-lg">
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
              <h3 className="improvement-form__title--sm">
                What I learned/practiced
              </h3>
              <textarea
                onChange={(e) =>
                  setNewImprovement({
                    ...newImprovement,
                    description: e.target.value,
                  })
                }
                className="form__textarea form__textarea--light rounded"
              ></textarea>
            </div>
            <div className="improvement-form__text-wrapper improvement-form__text-wrapper--centered">
              <h3 className="improvement-form__title--lg">Today's date</h3>
              <p className="improvement-form__date">{todaysDate}</p>
              <button
                type="submit"
                className="btn btn--lg btn--dark rounded-md"
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
