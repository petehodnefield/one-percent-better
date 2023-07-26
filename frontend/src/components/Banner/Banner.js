import React from "react";
import Link from "next/link";
const Banner = () => {
  return (
    <div className="home__title-wrapper">
      <div className="home__title-content">
        <h1>
          <Link className="home__title" href={"/"}>
            1% Better
          </Link>
        </h1>
      </div>
    </div>
  );
};

export default Banner;
