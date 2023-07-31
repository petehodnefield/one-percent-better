import React, { useEffect, useState, useContext } from "react";
import { SINGLE_AREA } from "../utils/queries";
import { useQuery } from "@apollo/client";
import { initializeApollo } from "../../lib/apollo";
import HomeContent from "../components/Home/HomeContent";
import { todaysDate } from "../utils/date";
import ParamsHomeContent from "../components/Home/ParamsHomeContent";
import Banner from "../components/Banner/Banner";
import Auth from "../utils/Auth";
import { LoginContext } from "./_app";
import { logout } from "../utils/logout";
const AreaDetails = ({ queryID }) => {
  const [newImprovement, setNewImprovement] = useState({});
  const [loggedIn, setLoggedIn] = useContext(LoginContext);
  const [noImprovements, setNoImprovements] = useState(false);
  const areaID = queryID.params[0];

  // Handler that adds a new improvement
  async function addNewImprovement() {
    // Set today as completed (so you can't add more than one point)
    setCompletedImprovement(true);
    try {
      await addImprovement({
        variables: {
          date: todaysDate,
          skillPercentage: newImprovement.skillPercentage,
          description: newImprovement.description,
          areaId: areaId,
        },
      });
    } catch (e) {
      console.log(e);
    }
  }

  // Function that runs when 'Add Improvement' button is clicked
  const handleFormSubmit = (e) => {
    e.preventDefault();
    addNewImprovement();
    window.location.reload();
  };

  return (
    <div className="home">
      <Banner />
      <ParamsHomeContent
        noImprovements={noImprovements}
        handleFormSubmit={handleFormSubmit}
        areaID={areaID}
        newImprovement={newImprovement}
        setNewImprovement={setNewImprovement}
      />
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
};

export default AreaDetails;

export const getServerSideProps = async ({ query }) => {
  const queryID = query;
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: SINGLE_AREA,
    variables: { areaId: queryID.params[0] },
  });

  return {
    props: { initializeApolloState: apolloClient.cache.extract(), queryID },
  };
};
