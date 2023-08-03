import React, { useState, useContext } from "react";
import { LoginContext } from "../_app";
import Link from "next/link";
import Auth from "../../utils/Auth";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../../utils/mutations";
import Loading from "../../components/Loading/Loading";
import Banner from "../../components/Banner/Banner";
import Home from "..";
const Login = () => {
  const [userInfo, setUserInfo] = useState({});
  const [login, { loading, data, error }] = useMutation(LOGIN);
  const [errorMessage, setErrorMessage] = useState("");
  const [loggedIn, setLoggedIn] = useContext(LoginContext);
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login({
        variables: { username: userInfo.username, password: userInfo.password },
      });
      Auth.login(data.login.token);
    } catch (e) {
      setErrorMessage(
        "Username and/or password is incorrect. Please try again."
      );
      console.log(e);
    }
  };

  if (loading) return <Loading />;
  return loggedIn ? (
    <Home />
  ) : (
    <div>
      <form
        onSubmit={(e) => handleFormSubmit(e)}
        id="loginForm"
        className="form form--column"
      >
        <h2 className="form__title">Login</h2>
        <div className="form__input-label-wrapper form__input-label-wrapper--mgsm">
          <label htmlFor="username" className="form__label">
            Username
          </label>
          <input
            required
            className="form-input form__input--lg rounded"
            type="text"
            name="username"
            id="username"
            onChange={(e) =>
              setUserInfo({ ...userInfo, username: e.target.value })
            }
          />
        </div>
        <div className="form__input-label-wrapper form__input-label-wrapper--mgxl">
          <label htmlFor="password" className="form__label">
            Password
          </label>
          <input
            required
            className="form-input form__input--lg rounded"
            type="password"
            name="password"
            id="password"
            onChange={(e) =>
              setUserInfo({ ...userInfo, password: e.target.value })
            }
          />
        </div>
        {errorMessage ? <p className="error-message">{errorMessage}</p> : ""}
        <Link
          href={"/signup"}
          className="btn btn--full-width btn--link btn--lg btn--outline rounded"
        >
          Signup
        </Link>
        <button
          type="submit"
          className="btn btn--full-width  btn--lg btn--primary rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
