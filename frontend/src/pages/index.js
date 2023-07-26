"use client";
import { useState, useEffect, useContext } from "react";
import { useQuery, useMutation } from "@apollo/client";

import { LoginContext } from "./_app";
import Auth from "../utils/Auth";
// Chart import
import Link from "next/link";
import GraphView from "../components/GraphView/GraphView";

import ListView from "./list-view/index";
import Login from "./login";
import HomeContent from "../components/Home/HomeContent";

export default function Home() {
  // Login Context
  const [loggedIn, setLoggedIn] = useContext(LoginContext);
  const logout = (e) => {
    e.preventDefault();
    Auth.logout();
  };
  return (
    <div className="home">
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
      {!loggedIn ? <Login /> : <HomeContent />}

      {loggedIn ? (
        <button
          onClick={logout}
          className="btn btn--lg logout rounded btn--dark"
        >
          Logout
        </button>
      ) : (
        ""
      )}
    </div>
  );
}
