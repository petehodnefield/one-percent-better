import React, { useState, useEffect, useContext } from "react";
import { LoginContext } from "../_app";
import { useQuery, useMutation } from "@apollo/client";
import { ADD_AREA } from "../../utils/mutations";
import { ME } from "../../utils/queries";
import Loading from "../../components/Loading/Loading";
import Home from "..";
import Login from "../login";
import Banner from "../../components/Banner/Banner";
const Welcome = () => {
  const [area, setArea] = useState("");
  const [loggedIn, setLoggedIn] = useContext(LoginContext);
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");

  const { loading: meLoading, data: meData, error: meError } = useQuery(ME);
  const [addArea, { loading, data, error }] = useMutation(ADD_AREA);
  useEffect(() => {
    if (meData === undefined || meData.me === null) {
      return;
    } else {
      setUserId(meData.me._id);
      setUsername(meData.me.username);
    }
  }, [meData]);
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      await addArea({
        variables: { area: area, userId: userId },
      });
      window.location.assign("/");
    } catch (e) {
      console.log(e);
    }
  };
  if (meLoading) return <Loading />;

  return (
    <div className="home">
      {loggedIn ? (
        <div className="welcome">
          <h2 className="welcome__title welcome__title--xl welcome__title--bold welcome__centered">
            Welcome, <span className="welcome__emphasis">{username}!</span>
          </h2>
          <h3 className="welcome__title--medium welcome__title--sm">About</h3>
          {/* Line */}
          <div className="welcome__line welcome__line--sm"></div>
          <div>
            <p className="welcome__text">
              The purpose of 1% Better is to focus on marginal improvements and
              to foster a growth mindset.
            </p>
            <p className="welcome__text">
              You will create <span className="welcome__emphasis">Areas</span>,
              which are topics or skills that you want to improve.
            </p>
            <p className="welcome__text">
              Every 24 hours, you are allowed to add an{" "}
              <span className="welcome__emphasis">Improvement</span> in every
              area you have. These Improvements get added to a graph that show
              the exponential benefits of getting 1% better every day over a
              long period of time.
            </p>
          </div>
          <p className="welcome__text welcome__centered">
            You currently do not have any{" "}
            <span className="welcome__emphasis">Areas</span>. <br /> Please
            create one now.
          </p>
          {/* Line */}
          <div className="welcome__line welcome__line--lg "></div>
          <div>
            <h3 className="welcome__title--bold welcome__title--md welcome__centered welcome__form-title">
              What skill(s) do you want to improve?
            </h3>
            <form
              onSubmit={(e) => handleFormSubmit(e)}
              id="welcomeForm"
              className="form welcome__form"
            >
              <label hidden>Area</label>
              <input
                type="text"
                name="area"
                id="area"
                required
                className="form__input form__input--lg rounded welcome__form-input"
                placeholder="Ex: Music Production"
                onChange={(e) => setArea(e.target.value)}
              />
              <button
                type="submit"
                className="btn btn--lg btn--primary rounded"
              >
                Get started
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div>
          <Banner />
          <Login />
        </div>
      )}
    </div>
  );
};

export default Welcome;
