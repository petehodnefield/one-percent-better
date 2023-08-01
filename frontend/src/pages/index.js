"use client";
import { useState, useEffect, useContext } from "react";
import { useQuery, useMutation } from "@apollo/client";

import { LoginContext } from "./_app";
import Auth from "../utils/Auth";
// Chart import
import Link from "next/link";

import ListView from "./list-view/index";
import HomeContent from "../components/Home/HomeContent";
import LoginForm from "../components/Login/LoginForm";
import Banner from "../components/Banner/Banner";
import Login from "./login";
import { logout } from "../utils/logout";

export default function Home() {
  // Login Context
  const [loggedIn, setLoggedIn] = useContext(LoginContext);

  return (
    <div className="home">
      <Banner />
      {loggedIn ? <HomeContent /> : <Login />}

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
