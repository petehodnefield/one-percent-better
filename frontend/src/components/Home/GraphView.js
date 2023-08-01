import React from "react";
import Link from "next/link";
import NoImprovements from "../NoImprovements/NoImprovements";
import AreaDropdown from "../AreaDropdown/AreaDropdown";
import { todaysDate } from "../../utils/date";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
const GraphView = ({
  newImprovement,
  setNewImprovement,
  allImprovements,
  noImprovements,
  setAreaDropdownOpen,
  areaDropdownOpen,
  meData,
  selectedArea,
  handleFormSubmit,
  setNewArea,
  setAddNewAreaOpen,
  addNewAreaOpen,
  handleNewArea,
  completedImprovement,
  handleAreaDeletion,
  setView,
}) => {
  return (
    <div className="home-content rounded-lg">
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
            <AreaDropdown
              meData={meData}
              areaDropdownOpen={areaDropdownOpen}
              handleAreaDeletion={handleAreaDeletion}
              setNewArea={setNewArea}
              setAddNewAreaOpen={setAddNewAreaOpen}
              addNewAreaOpen={addNewAreaOpen}
              setAreaDropdownOpen={setAreaDropdownOpen}
              handleNewArea={handleNewArea}
            />
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
