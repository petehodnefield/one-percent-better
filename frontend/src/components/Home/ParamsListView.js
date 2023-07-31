import React from "react";
import Link from "next/link";
import ImprovementDetails from "../ImprovementDetails/ImprovementDetails";
const ParamsListView = ({
  improvements,
  setView,
  selectedArea,
  areaDropdownOpen,
  setAreaDropdownOpen,
  meData,
  addNewAreaOpen,
}) => {
  return (
    <div className="home-content rounded-lg">
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
      {/* Container with improvement data */}
      <div className="  home-data--list rounded">
        <div className="list__title-wrapper">
          <h3 className="list__title list__column--1">Date</h3>
          <h3 className="list__title list__column--2">Description</h3>
          <h3 className="list__title list__column--3">Skill Level</h3>
        </div>
        {/* This is where we'll map through all of our improvements */}
        {improvements
          ? improvements
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
  );
};

export default ParamsListView;
