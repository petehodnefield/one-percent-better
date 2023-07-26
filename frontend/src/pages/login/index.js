import React, { useState } from "react";
import Auth from "../../utils/Auth";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../../utils/mutations";
import Loading from "../../components/Loading/Loading";
import Error from "../../components/Error/Error";
const Login = () => {
  const [userInfo, setUserInfo] = useState({});
  console.log("userinfo", userInfo);
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
    <div className="home">
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
        <button type="submit" className="btn btn--lg btn--primary rounded">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
