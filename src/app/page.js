"use client";
import Image from "next/image";
// Styles import
import styles from "./styles/Home.module.css";
import mountainsImage from "../../public/assets/images/mountains.png";

// Chart import
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";

export default function Home() {
  const dateToday = new Date().getFullYear();
  return (
    <main className="home">
      {/* Background image */}
      <Image className="cover bg-img" src={mountainsImage} />

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
              labels: ["Jun", "Jul", "Aug"],
              datasets: [
                {
                  id: 1,
                  label: "hi",
                  data: [5, 6, 7],
                },
                {
                  id: 2,
                  label: "hi",
                  data: [3, 2, 1],
                },
              ],
            }}
          />
        </div>

        {/* Form where you input what you worked on that day */}
        <form id="improvementForm" className="form">
          <div className="improvement-form__content">
            <div className="improvement-form__text-wrapper improvement-form__text-wrapper--left">
              <h3 className="improvement-form__title--sm">
                What I learned/practiced
              </h3>
              <textarea className="form__textarea form__textarea--light rounded"></textarea>
            </div>
            <div className="improvement-form__text-wrapper improvement-form__text-wrapper--centered">
              <h3 className="improvement-form__title--lg">Today's date</h3>
              <p className="improvement-form__date">June 2, {dateToday}</p>
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
