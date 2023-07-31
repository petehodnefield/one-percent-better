import React from "react";
import Link from "next/link";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";

const GraphView = ({
  improvements,
  handleFormSubmit,
  todaysDate,
  completedImprovement,
  setView,
  setNewImprovement,
  newImprovement,
}) => {
  return (
    <div className="home-content rounded-lg">
      {/* Link to stats view */}
      <p onClick={() => setView("list")} className="btn--view">
        List view
      </p>
      {/* Text wrapper */}
      <div className="home-content__text-wrapper">
        <h2 className="home-content__title">My focus:</h2>
        <p className="home-content__goal">
          Increase my <span className="bold text--primary">web developer</span>{" "}
          skills by 1% every day.
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
            <input
              onChange={(e) =>
                setNewImprovement({
                  ...newImprovement,
                  description: e.target.value,
                })
              }
              className="form__textarea form__textarea--light rounded"
              maxLength={50}
              type="text"
            />
          </div>
          <div className="improvement-form__text-wrapper improvement-form__text-wrapper--centered">
            <h3 className="improvement-form__title--lg">Today&apos;s date</h3>
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

export default GraphView;
