"use client";
import Image from "next/image";
import { useState } from "react";
// Styles import
import styles from "./styles/Home.module.css";
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
  const month = monthNames[new Date().getMonth()];
  const day = new Date().getDate();
  const year = new Date().getFullYear();
  const todaysDate = `${month} ${day}, ${year}`;

  // State handling our form improvement data
  const [newImprovement, setNewImprovement] = useState({
    date: todaysDate,
    number: "",
    description: "",
  });

  const dummyNumber = 1.0101;
  const dummyDate = "June 24, 2023";

  const handleFormSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("date", dummyDate);
    localStorage.setItem("number", dummyNumber);
    console.log(`local storage ${localStorage}`);
  };

  const dates = [localStorage.getItem("date")];
  const improvements = [localStorage.getItem("number")];
  const descriptions = [];

  const improvementData = dates.map((date, index) => {
    let dateObject = {};
    dateObject.date = date;
    dateObject.improvement = improvements[index];
    dateObject.description = descriptions[index];
    return dateObject;
  });

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
          <Line
            datasetIdKey="id"
            data={{
              labels: [],
              datasets: [
                {
                  id: 1,
                  label: "Web development skills",
                  data: improvementData,
                  parsing: {
                    xAxisKey: "date",
                    yAxisKey: "improvement",
                  },
                },
              ],
            }}
          />
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
