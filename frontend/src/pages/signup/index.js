import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../../utils/mutations";
import Auth from "../../utils/Auth";

const index = () => {
  const [userInfo, setUserInfo] = useState({});
  const [addUser, { loading, data, error }] = useMutation(ADD_USER);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await addUser({
        variables: { username: userInfo.username, password: userInfo.password },
      });
      Auth.login(data.addUser.token);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="home">
      <form
        onSubmit={handleFormSubmit}
        id="signupForm"
        className="form form--column"
      >
        {" "}
        <h2 className="form__title">Signup</h2>
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
          Create Account
        </button>
      </form>
    </div>
  );
};

export default index;
