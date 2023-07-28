import React from "react";
import Link from "next/link";
import ImprovementDetails from "../ImprovementDetails/ImprovementDetails";
const ParamsListView = ({ improvements, setView, selectedArea }) => {
  return (
    <div className="">
      <p onClick={() => setView("graph")} className="btn--view list-view">
        Graph view
      </p>
      {/* Text wrapper */}
      <div className="home-content__text-wrapper">
        <h2 className="home-content__title">My focus:</h2>
        <p className="home-content__goal">
          Increase my <span className="bold text--primary">{selectedArea}</span>{" "}
          skills by 1%
        </p>{" "}
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
