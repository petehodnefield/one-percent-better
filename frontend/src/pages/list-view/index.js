"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { IMPROVEMENTS, ME } from "../../utils/queries";
// Styles import
import mountainsImage from "../../../public/assets/images/mountains.png";
import ImprovementDetails from "../../components/ImprovementDetails/ImprovementDetails";

import Link from "next/link";

const ListView = ({ setView }) => {
  // Fetch our API for all improvements
  const [improvements, setImprovements] = useState();

  const { loading, data, error } = useQuery(ME);
  console.log(data);
  useEffect(() => {
    if (data === undefined || data.me === null) {
      return;
    } else {
      setImprovements(data.me.improvements);
    }
  }, [data]);

  if (loading) return <div>Loading...</div>;

  return (
    <main className="home">
      {/* Background image */}

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
        <Link href="/" className="btn--view list-view">
          Graph view
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
    </main>
  );
};

export default ListView;
