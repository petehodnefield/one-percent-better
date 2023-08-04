import React, { useState, useEffect, useContext } from "react";
import { LoginContext } from "../_app";
import { useMutation, useQuery } from "@apollo/client";
import { USERNAME } from "../../utils/queries";
import { ADD_USER } from "../../utils/mutations";
import Auth from "../../utils/Auth";
import Link from "next/link";
import Banner from "../../components/Banner/Banner";
import Home from "..";
const SignUp = () => {
  const [userInfo, setUserInfo] = useState({});
  const [usernameAvailable, setUsernameAvailable] = useState(true);
  const [loggedIn, setLoggedIn] = useContext(LoginContext);
  const [addUser, { loading, data, error }] = useMutation(ADD_USER);
  console.log("usernameAvailable", usernameAvailable);
  const {
    loading: usernameLoading,
    data: usernameData,
    error: usernameError,
  } = useQuery(USERNAME, {
    variables: { username: userInfo.username },
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!usernameAvailable) {
      return;
    } else {
      try {
        const { data } = await addUser({
          variables: {
            username: userInfo.username,
            password: userInfo.password,
          },
        });
        Auth.loginFirstTime(data.addUser.token);
      } catch (e) {
        console.log(e);
      }
    }
  };

  useEffect(() => {
    if (!usernameData || !usernameData.username) {
      setUsernameAvailable(true);
    } else {
      setUsernameAvailable(false);
    }
  }, [usernameData]);
  return (
    <div>
      {loggedIn ? (
        <Home />
      ) : (
        <div className="home">
          <Banner />
          <form
            onSubmit={handleFormSubmit}
            id="signupForm"
            className="form form--column form--login-signup"
          >
            {" "}
            <h2 className="form__title">Signup</h2>
            <div
              className={`form__input-label-wrapper form__input-label-wrapper--mgsm`}
            >
              <label htmlFor="username" className="form__label">
                Username
              </label>
              <input
                required
                className={`form-input form__input--lg rounded ${
                  !usernameAvailable ? "form__input--error" : ""
                }`}
                type="text"
                name="username"
                id="username"
                onChange={(e) =>
                  setUserInfo({ ...userInfo, username: e.target.value })
                }
              />
            </div>{" "}
            {!usernameAvailable ? (
              <p className="error-message">Username already taken!</p>
            ) : (
              ""
            )}
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
            <button
              type="submit"
              className="btn btn--lg btn--full-width  btn--primary rounded "
            >
              Create Account
            </button>
            <p className="form__redirect">
              Already have an account?{" "}
              <Link className="bold" href={"/"}>
                Login
              </Link>
            </p>
          </form>
        </div>
      )}
    </div>
  );
};

export default SignUp;
