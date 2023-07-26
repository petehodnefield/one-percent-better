import React, { useState } from "react";
import Link from "next/link";
import Auth from "../../utils/Auth";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../../utils/mutations";
import Loading from "../Loading/Loading";
import Error from "../Error/Error";
const LoginForm = () => {
  const [userInfo, setUserInfo] = useState({});
  const [login, { loading, data, error }] = useMutation(LOGIN);
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login({
        variables: { username: userInfo.username, password: userInfo.password },
      });
      Auth.login(data.login.token);
    } catch (e) {
      console.log(e);
    }
  };

  if (loading) return <Loading />;
  if (error) return <Error />;
  return (
    <form
      onSubmit={handleFormSubmit}
      id="loginForm"
      className="form form--column"
    >
      {" "}
      <h2 className="form__title">Login</h2>
      <div className="form__input-label-wrapper form__input-label-wrapper--mgsm">
        <label htmlFor="username" className="form__label">
          Username
        </label>
        <input
          className="form-input form__input--sm rounded"
          type="text"
          name="username"
          id="username"
          onChange={(e) =>
            setUserInfo({ ...userInfo, username: e.target.value })
          }
        />
      </div>
      <div className="form__input-label-wrapper form__input-label-wrapper--mglg">
        <label htmlFor="password" className="form__label">
          Password
        </label>
        <input
          className="form-input form__input--sm rounded"
          type="password"
          name="password"
          id="password"
          onChange={(e) =>
            setUserInfo({ ...userInfo, password: e.target.value })
          }
        />
      </div>
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
  );
};

export default LoginForm;