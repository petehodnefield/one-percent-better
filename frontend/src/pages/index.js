"use client";
import { useState, useEffect, useContext } from "react";
import { useQuery, useMutation } from "@apollo/client";

import { LoginContext } from "./_app";
import Auth from "../utils/Auth";
// Chart import
import Link from "next/link";
import GraphView from "../components/GraphView/GraphView";

import ListView from "./list-view/index";
import HomeContent from "../components/Home/HomeContent";
import LoginForm from "../components/Login/LoginForm";
import Banner from "../components/Banner/Banner";

export default function Home() {
  // Login Context
  const [loggedIn, setLoggedIn] = useContext(LoginContext);
  const logout = (e) => {
    e.preventDefault();
    Auth.logout();
  };
  return (
    <div className="home">
      <Banner />
      {loggedIn ? <HomeContent /> : <LoginForm />}

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
